import React, { Component } from "react";

import GenerateTeams from "./components/GenerateTeams";
import Matches from "./components/Matches";
import LeaderboardClassic from "./components/LeaderboardClassic";
import LeaderboardElo from "./components/LeaderboardElo";
import firebase from "./utils/firebase";

class App extends Component {
    victoryPoints = 3;
    lossPoints = 1;

    constructor(props) {
        super(props);

        this.state = {
            matchesSnapshot: []
        };

        this.state = {
            user: null,
            matches: [],
            players: [],
            scoreBoardAlgo: "classic"
        };
    }

    componentDidMount() {
        let _this = this;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
            }
        });

        this.listenForMatchUpdates();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.invalidationKey !== this.state.invalidationKey) {
            this.generateData();
        }
    }

    listenForMatchUpdates = () => {
        firebase
            .database()
            .ref("matches/")
            .orderByChild("created")
            .on("value", snapshot => {
                this.setState({
                    ...this.state,
                    matchesSnapshot: snapshot.val(),
                    invalidationKey: new Date().getTime()
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

    handleScoreBoardAlgoChange = event => {
        this.setState({
            ...this.state,
            scoreBoardAlgo: event.target.value
        });
    };

    login(e) {
        e.preventDefault();
        let _this = this;
        firebase
            .auth()
            .signInWithEmailAndPassword(
                document.getElementById("email").value,
                document.getElementById("password").value
            )
            .then(function(data) {
                _this.setState({ user: data.user });
            })
            .catch(function(error) {
                alert(error.message);
            });
    }

    logout(e) {
        e.preventDefault();
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                    <a className="navbar-brand" href="/">
                        Football team manager
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#main-menu"
                        aria-controls="main-menu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="main-menu">
                        <ul className="navbar-nav mr-auto" />
                        {this.state.user ? (
                            <div className="form-inline my-2 my-lg-0">
                                <label className="navbar-text mr-2">
                                    {this.state.user.email}
                                </label>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.logout.bind(this)}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <form
                                className="form-inline my-2 my-lg-0"
                                onSubmit={this.login.bind(this)}
                            >
                                <input
                                    className="form-control mb-2 mb-md-0 mr-sm-2"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    aria-label="Email"
                                />
                                <input
                                    className="form-control mb-2 mb-md-0 mr-sm-2"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                />
                                <button
                                    className="btn btn-primary my-2 my-sm-0"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </form>
                        )}
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-xl-7">
                            <div className="row">
                                <div className="col">
                                    <GenerateTeams
                                        players={this.state.players}
                                        canEdit={this.state.user !== null}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Matches
                                        canEdit={this.state.user !== null}
                                        matches={this.state.matches}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-5">
                            <select className="form-control mb-4" onChange={this.handleScoreBoardAlgoChange}>
                                <option value="classic">Classic</option>
                                <option value="elo">ELO</option>
                            </select>
                            {this.state.scoreBoardAlgo === "classic" && (
                                <LeaderboardClassic
                                    players={this.state.players}
                                    matches={this.state.matches}
                                />
                            )}
                            {this.state.scoreBoardAlgo === "elo" && (
                                <LeaderboardElo
                                    players={this.state.players}
                                    matches={this.state.matches}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
