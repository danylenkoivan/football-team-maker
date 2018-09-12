import React, { Component } from 'react';

import firebase from './utils/firebase';

class Leaderboard extends Component {

    victoryPoints = 3;
    lossPoints = 1;

    render() {
        return (
            <div className="row">
                <div className="col">
                    <h3 className="text-center">Players</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Won</td>
                                <td>Lost</td>
                                <td>Total</td>
                                <td>Score</td>
                                <td>To advance</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.players.map((player, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{player.key}</td>
                                    <td>{player.won}</td>
                                    <td>{player.lost}</td>
                                    <td>{player.total}</td>
                                    <td>{player.score}</td>
                                    <td className="text-success">
                                        {player.victoriesToAdvance && (
                                            <span><b>+{player.victoriesToAdvance}</b> victories</span>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            players: []
        }
    }

    componentDidMount() {
        let _this = this;

        firebase.database().ref('players/').on('value', (snapshot) => {
            var players = [];

            snapshot.forEach((player) => {
                let data = player.val();
                data.key = player.key

                data.total = (data.won + data.lost)

                // Super Advanced Football Formula
                // data.score = Math.round(((data.won * (data.won / (data.won + data.lost))) * 100), 0)

                // 3 points for victory, 1 point for loss
                data.score = data.won * this.victoryPoints + data.lost * this.lossPoints

                players.push(data);
            });

            players.sort((a, b) => a.score < b.score)

            players = players.map((player, index) => {
                if (players[index - 1]) {
                    player.victoriesToAdvance = Math.floor( ((players[index - 1].score - player.score) / this.victoryPoints) + 1 )
                }
                return player
            })


            _this.setState({ players: players })
        });
    }
}

export default Leaderboard;
