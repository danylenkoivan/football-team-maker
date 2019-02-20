import React, { Component } from "react";
import "bulma/css/bulma.min.css";
import "./App.css";


import Login from "./components/Login";
import GenerateTeams from "./components/GenerateTeams";
import Matches from "./components/Matches";
import Leaderboard from "./components/Leaderboard";
import firebase from "./utils/firebase";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrophy, faMedal, faPlus, faPowerOff, faRedo, faExpand } from '@fortawesome/free-solid-svg-icons'

library.add([faTrophy, faMedal, faPlus, faPowerOff, faRedo, faExpand])

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
                                            <Leaderboard players={this.state.players} matches={this.state.matches} />
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

        this.setState({
            ...this.state,
            matches,
            players
        });
    };
}

export default App;
