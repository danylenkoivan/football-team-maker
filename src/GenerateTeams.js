import React, { Component } from 'react';

import firebase from './utils/firebase';

class GenerateTeams extends Component {
    render() {
        return (
            <div>
                {this.props.canEdit === true &&
                    <div>
                        <h3 className="text-center">Generate teams</h3>
                        <ul className="list-inline">
                            {this.state.players.map((player, i) =>
                                <li className="list-inline-item" key={i}>
                                    <button className={"mb-2 btn " + (this.state.signedUpPlayers.indexOf(player.key) > -1 ? "btn-primary" : "btn-light")} data-player={player.key} onClick={this.togglePlayer.bind(this)}>{player.key}</button>
                                </li>
                            )}
                            <li className="list-inline-item">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="New player" onChange={this.newPLayerNameChange.bind(this)} value={this.state.newPLayerName} />
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
            newPlayerName: "1",
            players: [],
            signedUpPlayers: []
        }
    }

    componentDidMount() {
        let _this = this;

        firebase.database().ref('players/').on('value', (snapshot) => {
            var players = [];

            snapshot.forEach((player) => {
                let data = player.val();
                data.key = player.key

                data.victory_score = Math.round(((data.won * (data.won / (data.won + data.lost))) * 100), 0)

                players.push(data);
            });

            _this.setState({ players: players })
        });
    }

    newPLayerNameChange(e) {
        this.setState({newPLayerName: e.target.value});
    }

    addNewPlayer(e) {
        e.preventDefault()

        firebase.database().ref('players/' + this.state.newPLayerName).set({won: 1, lost: 0})

        this.setState({newPLayerName: ""})
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
                    teams: teams,
                    created: new Date().getTime()
                })

                this.setState({signedUpPlayers: []})
            }
        }
    }
}

export default GenerateTeams;
