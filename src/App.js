import React, { Component } from "react";
import "./App.css";

import Login from "./components/Login";
import GenerateTeams from "./components/GenerateTeams";
import Matches from "./components/Matches";
import Leaderboard from "./components/Leaderboard";
import firebase from "./utils/firebase";
import { generateTeamName } from "./utils/utils";

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import blueGrey from "@material-ui/core/colors/blueGrey";

import Elo from "elo-js";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[800],
      contrastText: green[50]
    },
    secondary: {
      main: blueGrey[600],
      contrastText: blueGrey[50]
    },
    teamColors: {
      0: red[800],
      1: blue[800]
    },
    matchResultColors: {
      victory: green[700],
      loss: red[700]
    }
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "2rem 2rem 1rem"
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  leaderboardContainer: {
    borderLeft: "1px solid #ddd"
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense" className={this.props.classes.toolbar}>
            <Typography variant="h6" color="inherit">
              Football team manager
            </Typography>
            <Login />
          </Toolbar>
        </AppBar>
        <section className={this.props.classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <Matches
                canEdit={this.state.user !== null}
                matches={this.state.matches}
                teams={this.state.teams}
              />
            </Grid>
            <Grid
              item
              xs={4}
              className={this.props.classes.leaderboardContainer}
            >
              <Leaderboard
                players={this.state.players}
                matches={this.state.matches}
                teams={this.state.teams}
              />
            </Grid>
          </Grid>
          <GenerateTeams
            players={this.state.players}
            canEdit={this.state.user !== null}
          />
        </section>
      </MuiThemeProvider>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      matchesSnapshot: [],
      matches: [],
      players: [],
      teams: []
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });

    this.listenForMatchUpdates();
  }

  listenForMatchUpdates = () => {
    firebase
      .database()
      .ref("matches/")
      .orderByChild("created")
      .on("value", snapshot => {
        this.setState(
          {
            ...this.state,
            matchesSnapshot: snapshot.val()
          },
          () => {
            this.generateData();
          }
        );
      });
  };

  generateData = () => {
    if (!this.state.matchesSnapshot) {
      return;
    }

    const matches = Object.keys(this.state.matchesSnapshot).map(key => ({
      ...this.state.matchesSnapshot[key],
      key
    }));

    const players = matches
      .flatMap(match =>
        match.teams.flatMap(team =>
          team.players.flatMap(player => player.trim().toUpperCase())
        )
      )
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .sort();

    players.sort();

    const teams = this.calculateTeams(matches);

    this.setState({
      ...this.state,
      matches,
      players,
      teams
    });
  };

  calculateTeams = matches => {
    const elo = new Elo();

    var teams = {};
    matches.forEach(match => {
      let teamOneKey = generateTeamName(match.teams[0].players);

      let teamTwoKey = generateTeamName(match.teams[1].players);

      teams[teamOneKey] = teams[teamOneKey] || {
        goalsPlus: 0,
        goalsMinus: 0,
        won: 0,
        lost: 0,
        elo: 1200
      };

      teams[teamTwoKey] = teams[teamTwoKey] || {
        goalsPlus: 0,
        goalsMinus: 0,
        won: 0,
        lost: 0,
        elo: 1200
      };

      match.teams[0].elo = teams[teamOneKey].elo;
      match.teams[1].elo = teams[teamTwoKey].elo;

      if (match.finalized === true) {
        teams[teamOneKey].goalsPlus += match.teams[0].score;
        teams[teamOneKey].goalsMinus += match.teams[1].score;

        teams[teamTwoKey].goalsPlus += match.teams[1].score;
        teams[teamTwoKey].goalsMinus += match.teams[0].score;

        const winnerKey =
          match.teams[0].score > match.teams[1].score ? teamOneKey : teamTwoKey;
        const loserKey =
          match.teams[0].score > match.teams[1].score ? teamTwoKey : teamOneKey;

        teams[winnerKey].won++;
        teams[loserKey].lost++;

        teams[winnerKey].elo = elo.ifWins(
          teams[winnerKey].elo,
          teams[loserKey].elo
        );

        teams[loserKey].elo = elo.ifLoses(
          teams[loserKey].elo,
          teams[winnerKey].elo
        );

        match.teams[0].eloChange = teams[teamOneKey].elo - match.teams[0].elo;
        match.teams[1].eloChange = teams[teamTwoKey].elo - match.teams[1].elo;
      } else {
        match.teams[0].eloIfWins = elo.ifWins(
          match.teams[0].elo,
          match.teams[1].elo
        );
        match.teams[0].eloIfLoses = elo.ifLoses(
          match.teams[0].elo,
          match.teams[1].elo
        );

        match.teams[1].eloIfWins = elo.ifWins(
          match.teams[1].elo,
          match.teams[0].elo
        );
        match.teams[1].eloIfLoses = elo.ifLoses(
          match.teams[1].elo,
          match.teams[0].elo
        );
      }
    });

    teams = Object.keys(teams).map(key => {
      return {
        key: key,
        goalsPlus: teams[key].goalsPlus,
        goalsMinus: teams[key].goalsMinus,
        won: teams[key].won,
        lost: teams[key].lost,
        elo: teams[key].elo
      };
    });

    teams
      .sort((a, b) => {
        if (a.elo === b.elo) return 0;
        if (a.elo < b.elo) {
          return -1;
        }

        return 1;
      })
      .reverse();

    return teams;
  };
}

export default withStyles(styles)(App);
