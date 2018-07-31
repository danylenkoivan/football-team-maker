import React, { Component } from 'react';

import './Matches.css';

import Teams from './Teams';

import firebase from './utils/firebase';

import moment from 'moment';

class Matches extends Component {

    players = {};

    render() {
        return (
            <div className="row">
                <div className="col">
                    {this.props.canEdit === true &&
                        <div className="row">
                            <div className="col">
                                <form className="form mt-4 mb-4" onSubmit={this.generateTeams.bind(this)}>
                                    <div className="row">
                                        <div className="col">
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="new-players" onChange={this.handleChange.bind(this)} placeholder="Player 1, Player 2, Player 3, Player 4" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-success">Generate teams</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    <div className="row">
                        <div className="col col-lg-10 offset-lg-1 text-center">
                            {this.state.matches.length === 0 ? (
                                <div>
                                    <p>Couldn't find any...</p>
                                    <img className="img-fluid" src="https://media.giphy.com/media/5j4wozAB0iC4w/giphy.gif" alt="" />
                                </div>
                            ) : (
                                this.state.matches.map((match, i) =>
                                    <div className="row" key={i}>
                                        <div className="col-12">
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <h5 className="d-inline mr-2">
                                                        {moment(match.created).format('D MMMM YYYY, HH:mm')}
                                                    </h5>

                                                    { match.finalized !== true ? (
                                                        <span>
                                                            {this.props.canEdit === true &&
                                                                (<a className="text-primary lock-score" onClick={(e) => this.finalizeScore(match.key)}>Finish</a>)
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span>(Finished)</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Teams teams={match.teams} matchId={match.key} finalized={match.finalized} canEdit={this.props.canEdit} />
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            newPlayers: "",
            matches: []
        }
    }

    componentDidMount() {
        let _this = this;

        firebase.database().ref('matches/').orderByChild('created').on('value', (snapshot) => {
            var matches = [];

            snapshot.forEach((match) => {
                let data = match.val();
                data.key = match.key

                matches.push(data);
            });

            _this.setState({ matches: matches.slice().reverse() })
        });
    }

    handleChange(e) {
        this.setState({ newPlayers: e.target.value });
    }

    generateTeams(e) {
        e.preventDefault();

        if (this.props.canEdit) {
            let playersList = this.state.newPlayers.split(',')

            playersList = playersList.map(function (el) {
                return el.trim();
            });

            if (playersList.length >= 4) {
                for (let i = playersList.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [playersList[i], playersList[j]] = [playersList[j], playersList[i]];
                }

                let teams = []

                for (let i = 0; i < playersList.length; i += 2) {
                    teams.push({
                        players: playersList.slice(i, i + 2),
                        score: 0
                    });
                }

                firebase.database().ref("matches").push({
                    teams: teams,
                    created: new Date().getTime()
                })

                this.setState({newPlayers: ''})
                document.getElementById("new-players").value = '';
            }
        }
    }

    finalizeScore(matchId) {
        var _this = this
        if (window.confirm("Are you sure you want to lock this match's score?")) {
            firebase.database().ref('matches/' + matchId).update({finalized: true})

            let match = this.state.matches.find( matc => matc.key === matchId )

            firebase.database().ref('players/').once('value', (snapshot) => {
                snapshot.forEach((player) => {
                    this.players[player.key] = player.val();
                });
            });

            var participatingPlayers = [];

            match.teams[0].players.forEach(function (player) {
                if (match.teams[0].score > match.teams[1].score) {
                    participatingPlayers.push({
                        'player': player,
                        'result': 'won'
                    });
                } else {
                    participatingPlayers.push({
                        'player': player,
                        'result': 'lost'
                    });
                }
            })

            match.teams[1].players.forEach(function (player) {
                if (match.teams[1].score > match.teams[0].score) {
                    participatingPlayers.push({
                        'player': player,
                        'result': 'won'
                    });
                } else {
                    participatingPlayers.push({
                        'player': player,
                        'result': 'lost'
                    });
                }
            })

            participatingPlayers.forEach(function (data) {
                if (data.result === 'won') {
                    _this.playerWon(data.player);
                } else if (data.result === 'lost') {
                    _this.playerLost(data.player);
                }
            })

            if (
                (match.teams[0].score === 10 && match.teams[1].score === 0) ||
                (match.teams[0].score === 0 && match.teams[1].score === 10)
            ) {
                this.showFlawless();
            }
        }
    }

    playerWon(playerName) {
        playerName = playerName.toUpperCase()
        if (this.players[playerName] !== undefined) {
            firebase.database().ref('players/' + playerName).update({won: this.players[playerName].won + 1, lost: this.players[playerName].lost})
        } else {
            firebase.database().ref('players/' + playerName).set({won: 1, lost: 0})
        }
    }

    playerLost(playerName) {
        playerName = playerName.toUpperCase()
        if (this.players[playerName] !== undefined) {
            firebase.database().ref('players/' + playerName).update({won: this.players[playerName].won, lost: this.players[playerName].lost + 1})
        } else {
            firebase.database().ref('players/' + playerName).set({won: 0, lost: 1})
        }
    }

    showFlawless() {
        document.getElementById("flawless-container").style.display = "block";
        document.getElementById("flawless-victory").style.display = "inline";

        setTimeout(() => {
            document.getElementById("flawless-victory").style.display = "none";
            document.getElementById("flawless-crawl").style.display = "inline";
        }, 2000)

        setTimeout(() => {
            document.getElementById("flawless-container").style.display = "none";
            document.getElementById("flawless-crawl").style.display = "none";
        }, 5000)
    }

}

export default Matches;
