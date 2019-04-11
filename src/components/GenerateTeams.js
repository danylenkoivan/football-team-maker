import React, { Component } from 'react';

import firebase from '../utils/firebase';
import './GenerateTeams.css';

class GenerateTeams extends Component {
    render() {
        return (
            <div>
                {this.props.canEdit === true &&
                    <div className="columns">
                        <div className="column has-text-centered">
                            {this.props.players.concat(this.state.newPlayers).map((player, i) =>
                                <div key={i} className={"player-item button " + (this.state.signedUpPlayers.indexOf(player) > -1 ? "is-dark" : "is-light")} onClick={this.togglePlayer.bind(this, player)}>{player}</div>
                            )}

                            <div className="field has-addons">
                                <div className="control new-player-control">
                                    <input type="text" className="input" placeholder="New player" onChange={this.newPlayerNameChange.bind(this)} value={this.state.newPlayerName} />
                                </div>
                                <div className="control">
                                    <button className="button is-dark" id="add-new-player-button" onClick={this.addNewPlayer.bind(this)}>Add</button>
                                </div>
                            </div>

                            <div className="button is-dark is-fullwidth" id="generate-teams-button" onClick={this.generateTeams.bind(this)}>Start match</div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            newPlayerName: "",
            newPlayers: [],
            signedUpPlayers: []
        }
    }

    newPlayerNameChange(e) {
        this.setState({newPlayerName: e.target.value});
    }

    addNewPlayer() {
        let players = this.state.newPlayers;

        players.push(this.state.newPlayerName.toUpperCase())

        this.setState({
            newPlayers: players,
            newPlayerName: "",
        })
    }

    togglePlayer(player) {
        let signedUpPlayers = this.state.signedUpPlayers

        let index = signedUpPlayers.indexOf(player)

        if (index > -1) {
            signedUpPlayers.splice(index, 1);
        } else {
            signedUpPlayers.push(player)
        }

        this.setState({signedUpPlayers: signedUpPlayers})
    }

    generateTeams() {
        let playersList = this.state.signedUpPlayers;

        playersList = playersList.map(function (el) {
            return el.trim();
        });

        if (playersList.length >= 4) {

            firebase.database().ref("matches").push({
                teams: this.getTeams(playersList),
                created: new Date().getTime()
            })

            this.setState({
                signedUpPlayers: [],
                newPlayers: []
            })
        }
    }

    getTeams(players) {
        for (let i = players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [players[i], players[j]] = [players[j], players[i]];
        }

        let teams = []

        for (let i = 0; i < players.length; i += 2) {
            teams.push({
                players: players.slice(i, i + 2),
                score: 0
            });
        }

        return teams.slice(0, 2);
    }
}

export default GenerateTeams;
