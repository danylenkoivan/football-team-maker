import React, { Component } from 'react';

import firebase from '../utils/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './GenerateTeams.css';

class GenerateTeams extends Component {
    render() {
        return (
            <div>
                {this.props.canEdit === true &&
                    <div className="columns">
                        <div className="column has-text-centered">
                            {this.props.players.map((player, i) =>
                                <div key={i} className={"player-item button " + (this.state.signedUpPlayers.indexOf(player) > -1 ? "is-dark" : "is-light")} data-player={player} onClick={this.togglePlayer.bind(this)}>{player}</div>
                            )}
                            {this.state.newPlayers.map((player, i) =>
                                <div key={i} className={"player-item button " + (this.state.signedUpPlayers.indexOf(player) > -1 ? "is-dark" : "is-light")} data-player={player} onClick={this.togglePlayer.bind(this)}>{player}</div>
                            )}

                            <div className="field has-addons">
                                <div className="control new-player-control">
                                    <input type="text" className="input" placeholder="New player" onChange={this.newPlayerNameChange.bind(this)} value={this.state.newPlayerName} />
                                </div>
                                <div className="control">
                                    <a className="button is-dark" onClick={this.addNewPlayer.bind(this)}><FontAwesomeIcon icon="plus" /></a>
                                </div>
                            </div>

                            <div className="button is-dark is-fullwidth" onClick={this.generateTeams.bind(this)}>
                                <span>Start match</span>
                            </div>
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

    addNewPlayer(e) {
        e.preventDefault()

        let players = this.state.newPlayers;

        players.push(this.state.newPlayerName.toUpperCase())

        this.setState({
            newPlayers: players,
            newPlayerName: "",
        })
    }

    togglePlayer(e) {
        let signedUpPlayers = this.state.signedUpPlayers

        let playerName = e.target.dataset.player

        let index = signedUpPlayers.indexOf(playerName)

        if (index > -1) {
            signedUpPlayers.splice(index, 1);
        } else {
            signedUpPlayers.push(playerName)
        }

        this.setState({signedUpPlayers: signedUpPlayers})
    }

    generateTeams(e) {
        e.preventDefault();

        if (this.props.canEdit) {
            let playersList = this.state.signedUpPlayers;

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
                    teams: teams.slice(0, 2),
                    created: new Date().getTime()
                })

                this.setState({
                    signedUpPlayers: [],
                    newPlayers: []
                })
            }
        }
    }
}

export default GenerateTeams;
