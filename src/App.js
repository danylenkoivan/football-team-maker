import React, { Component } from 'react';

import GenerateTeams from './components/GenerateTeams';
import Matches from './components/Matches';
import Leaderboard from './components/Leaderboard';

import firebase from './utils/firebase';

class App extends Component {
    victoryPoints = 3;
    lossPoints = 1;

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                    <a className="navbar-brand" href="/">Football team manager</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="main-menu">
                        <ul className="navbar-nav mr-auto"></ul>
                        {this.state.user ? (
                            <div className="form-inline my-2 my-lg-0">
                                <label className="navbar-text mr-2">{this.state.user.email}</label>
                                <button className="btn btn-primary" onClick={this.logout.bind(this)}>Logout</button>
                            </div>
                        ) : (
                            <form className="form-inline my-2 my-lg-0" onSubmit={this.login.bind(this)}>
                                <input className="form-control mb-2 mb-md-0 mr-sm-2" id="email" type="email" placeholder="Email" aria-label="Email" />
                                <input className="form-control mb-2 mb-md-0 mr-sm-2" id="password" type="password" placeholder="Password" aria-label="Password" />
                                <button className="btn btn-primary my-2 my-sm-0" type="submit">Login</button>
                            </form>
                        )}
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-xl-7">
                            <div className="row">
                                <div className="col">
                                    <GenerateTeams players={this.state.players} canEdit={this.state.user !== null} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Matches canEdit={this.state.user !== null} matches={this.state.matches} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-5">
                            <Leaderboard players={this.state.players} teams={this.state.teams} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            matches: [],
            players: [],
            teams: []
        }
    }

    componentDidMount() {
        let _this = this
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });

        firebase.database().ref('matches/').orderByChild('created').on('value', (snapshot) => {
            var matches = [];

            var players = [];
            var teams = {};

            snapshot.forEach((match) => {
                let data = match.val();
                data.key = match.key

                matches.push(data);

                let teamOneKey = data.teams[0].players.sort().join(' - ').toUpperCase().trim()
                let teamTwoKey = data.teams[1].players.sort().join(' - ').toUpperCase().trim()

                if (teams[teamOneKey] === undefined) {
                    teams[teamOneKey] = {
                        goalsPlus: 0,
                        goalsMinus: 0,
                        won: 0,
                        lost: 0
                    }
                }

                if (teams[teamTwoKey] === undefined) {
                    teams[teamTwoKey] = {
                        goalsPlus: 0,
                        goalsMinus: 0,
                        won: 0,
                        lost: 0
                    }
                }

                if (data.finalized === true) {
                    teams[teamOneKey].goalsPlus += data.teams[0].score;
                    teams[teamOneKey].goalsMinus += data.teams[1].score;

                    teams[teamTwoKey].goalsPlus += data.teams[1].score;
                    teams[teamTwoKey].goalsMinus += data.teams[0].score;

                    if (data.teams[0].score > data.teams[1].score) {
                        teams[teamOneKey].won++;
                        teams[teamTwoKey].lost++;
                    } else if (data.teams[0].score < data.teams[1].score) {
                        teams[teamOneKey].lost++;
                        teams[teamTwoKey].won++;
                    }
                }

                data.teams.map((team) => {
                    team.players.map((player) => {
                        players.push(player.trim().toUpperCase())
                    })
                })
            });

            teams = Object.keys(teams).map((key) => {
                return {
                    key: key,
                    goalsPlus: teams[key].goalsPlus,
                    goalsMinus: teams[key].goalsMinus,
                    won: teams[key].won,
                    lost: teams[key].lost,
                    score: teams[key].won * this.victoryPoints + teams[key].lost * this.lossPoints
                }
            })

            teams.sort((a,b) => a.score - b.score || (a.goalsPlus - a.goalsMinus) - (b.goalsPlus - b.goalsMinus)).reverse()

            teams = teams.map((team, index) => {
                if (teams[index - 1]) {
                    team.goalsToAdvance = teams[index - 1].goals - team.goals;

                    team.winsToAdvance = Math.floor( ((teams[index - 1].score - team.score) / this.victoryPoints) + 1 )
                }

                return team
            })

            players.sort()


            _this.setState({
                matches: matches.slice().reverse(),
                players: [...new Set(players)],
                teams: teams
            })
        });
    }

    login(e) {
        e.preventDefault()
        let _this = this
        firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("password").value)
            .then(function(data) {
                _this.setState({ user: data.user });
            })
            .catch(function(error) {
                alert(error.message);
            });
    }

    logout(e) {
        e.preventDefault()
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }
}

export default App;
