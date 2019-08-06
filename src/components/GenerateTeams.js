import React, { Component } from "react";

import firebase from "../utils/firebase";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const styles = theme => ({
  matchButton: {
    bottom: "2rem",
    position: "fixed",
    right: "2rem"
  },
  chip: {
    margin: theme.spacing.unit
  },
  inputContainer: {
    textAlign: "center"
  },
  textField: {
    flexBasis: 200
  }
});

class GenerateTeams extends Component {
  render() {
    return (
      <div>
        <Fab
          color="primary"
          onClick={this.toggleDialog}
          className={this.props.classes.matchButton}
        >
          <PlayArrowIcon />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.toggleDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New match</DialogTitle>
          <DialogContent>
            {this.props.players
              .concat(this.state.newPlayers)
              .map((player, i) => (
                <Chip
                  key={i}
                  avatar={<Avatar>{player.substring(0, 1)}</Avatar>}
                  label={player}
                  onClick={this.togglePlayer.bind(this, player)}
                  className={this.props.classes.chip}
                  color={
                    this.state.signedUpPlayers.indexOf(player) > -1
                      ? "primary"
                      : "default"
                  }
                />
              ))}
          </DialogContent>
          <DialogContent className={this.props.classes.inputContainer}>
            <FormControl>
              <InputLabel htmlFor="new-player">New Player</InputLabel>
              <Input
                id="new-player"
                value={this.state.newPlayerName}
                onChange={this.newPlayerNameChange.bind(this)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={this.addNewPlayer.bind(this)}>
                      <PersonAddIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.generateTeams.bind(this)} color="primary">
              Start match
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      newPlayerName: "",
      newPlayers: [],
      signedUpPlayers: [],
      open: false
    };
  }

  toggleDialog = () => {
    this.setState({
      open: !this.state.open
    });
  };

  newPlayerNameChange(e) {
    this.setState({ newPlayerName: e.target.value });
  }

  addNewPlayer() {
    if (this.state.newPlayerName.length > 0) {
      this.setState({
        newPlayers: [
          ...this.state.newPlayers,
          this.state.newPlayerName.toUpperCase().trim()
        ],
        newPlayerName: ""
      });
    }
  }

  togglePlayer(player) {
    let signedUpPlayers = this.state.signedUpPlayers;

    let index = signedUpPlayers.indexOf(player);

    if (index > -1) {
      signedUpPlayers.splice(index, 1);
    } else {
      signedUpPlayers.push(player);
    }

    this.setState({ signedUpPlayers: signedUpPlayers });
  }

  generateTeams() {
    let playersList = this.state.signedUpPlayers;

    if (playersList.length >= 4) {
      firebase
        .database()
        .ref("matches")
        .push({
          teams: this.getTeams(playersList),
          created: new Date().getTime()
        });

      this.setState(
        {
          signedUpPlayers: [],
          newPlayers: []
        },
        this.toggleDialog()
      );
    }
  }

  getTeams(players) {
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }

    let teams = [];

    for (let i = 0; i < players.length; i += 2) {
      teams.push({
        players: players.slice(i, i + 2),
        score: 0
      });
    }

    return teams.slice(0, 2);
  }
}

export default withStyles(styles)(GenerateTeams);
