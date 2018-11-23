import React, { Component } from 'react';

import firebase from '../utils/firebase';

class GenerateTeams extends Component {
    render() {
        return (
            <div>
                {this.props.canEdit === true &&
                    <div>
                        <h3 className="text-center">Generate teams</h3>
                        <ul className="list-inline">
                            {this.props.players.map((player, i) =>
                                <li className="list-inline-item" key={i}>
                                    <button className={"mb-2 btn " + (this.state.signedUpPlayers.indexOf(player) > -1 ? "btn-primary" : "btn-light")} data-player={player} onClick={this.togglePlayer.bind(this)}>{player}</button>
                                </li>
                            )}
                            {this.state.newPlayers.map((player, i) =>
                                <li className="list-inline-item" key={i}>
                                    <button className={"mb-2 btn " + (this.state.signedUpPlayers.indexOf(player) > -1 ? "btn-primary" : "btn-light")} data-player={player} onClick={this.togglePlayer.bind(this)}>{player}</button>
                                </li>
                            )}
                            <li className="list-inline-item">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="New player" onChange={this.newPlayerNameChange.bind(this)} value={this.state.newPlayerName} />
                                    <div className="input-group-append">
                                        <input type="button" className="btn btn-success" value="Add" onClick={this.addNewPlayer.bind(this)} />
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button type="button" className="btn btn-success" onClick={this.generateTeams.bind(this)}>Generate teams</button>
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
