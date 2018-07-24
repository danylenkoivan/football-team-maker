import React, { Component } from 'react';

import firebase from './utils/firebase';

class Leaderboard extends Component {

    render() {
        return (
            <div className="row">
                <div className="col">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Won</td>
                                <td>Lost</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.players.map((player, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{player.key}</td>
                                    <td>{player.won}</td>
                                    <td>{player.lost}</td>
                                    <td>{player.victory_percent} %</td>
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

                data.victory_percent = (data.won / (data.won + data.lost)).toFixed(2) * 100

                players.push(data);
            });

            _this.setState({ players: players.sort((a, b) => a.key.localeCompare(b.key)) })
        });
    }
}

export default Leaderboard;
