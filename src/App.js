import React, { Component } from "react"
import "./App.css"


import Login from "./components/Login"
import GenerateTeams from "./components/GenerateTeams"
import Matches from "./components/Matches"
import Leaderboard from "./components/Leaderboard"
import firebase from "./utils/firebase"

import Elo from "elo-js"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrophy, faMedal, faPlus, faPowerOff, faRedo, faExpand, faCircle } from '@fortawesome/free-solid-svg-icons'

library.add([faTrophy, faMedal, faPlus, faPowerOff, faRedo, faExpand, faCircle])

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar is-dark is-fixed-top">
                    <div className="navbar-brand">
                        <a className="navbar-item is-size-4" href="/">
                            Football team manager
                        </a>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-start">

                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <Login />
                            </div>
                        </div>
                    </div>
                </nav>

                <section className="container main-content">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <div className="columns">
                                <div className="column is-12">
                                    <div className="columns">
                                        <div className="column"><h3 className="is-size-3 has-text-weight-bold">Match center</h3></div>
                                    </div>
                                    <div className="columns">
                                        <div className="column is-3">
                                            <GenerateTeams players={this.state.players} canEdit={this.state.user !== null} />
                                        </div>
                                        <div className="column is-9">
                                            <Matches canEdit={this.state.user !== null} matches={this.state.matches} teams={this.state.teams} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column is-12">
                                    <div className="columns">
                                        <div className="column"><h3 className="is-size-3 has-text-weight-bold">Leaderboard</h3></div>
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <Leaderboard players={this.state.players} matches={this.state.matches} teams={this.state.teams} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            matchesSnapshot: [],
            matches: [],
            players: [],
            teams: [],
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
                this.setState({
                    ...this.state,
                    matchesSnapshot: snapshot.val()
                }, () => {
                    this.generateData()
                });
            });
    };

    generateData = () => {
        if (!this.state.matchesSnapshot) {
            return
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
            let teamOneKey = match.teams[0].players
                .sort()
                .join(" - ")
                .toUpperCase()
                .trim();

            let teamTwoKey = match.teams[1].players
                .sort()
                .join(" - ")
                .toUpperCase()
                .trim();

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

            match.teams[0].elo = teams[teamOneKey].elo
            match.teams[1].elo = teams[teamTwoKey].elo

            if (match.finalized === true) {
                teams[teamOneKey].goalsPlus += match.teams[0].score;
                teams[teamOneKey].goalsMinus += match.teams[1].score;

                teams[teamTwoKey].goalsPlus += match.teams[1].score;
                teams[teamTwoKey].goalsMinus += match.teams[0].score;

                const winnerKey =
                    match.teams[0].score > match.teams[1].score
                        ? teamOneKey
                        : teamTwoKey;
                const loserKey =
                    match.teams[0].score > match.teams[1].score
                        ? teamTwoKey
                        : teamOneKey;

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

                match.teams[0].eloChange = teams[teamOneKey].elo - match.teams[0].elo
                match.teams[1].eloChange = teams[teamTwoKey].elo - match.teams[1].elo
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

export default App;
