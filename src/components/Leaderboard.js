import React, { Component } from 'react';

import firebase from '../utils/firebase';

class Leaderboard extends Component {

    victoryPoints = 3;
    lossPoints = 1;

    render() {
        return (
            <div className="row">
                <div className="col">
                    <h3 className="text-center">Teams Leaderboard</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Won</td>
                                <td>Lost</td>
                                <td>Score</td>
                                <td>Goals</td>
                                <td>To advance</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.teams.map((player, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{player.key}</td>
                                    <td>{player.won}</td>
                                    <td>{player.lost}</td>
                                    <td>{player.score}</td>
                                    <td>{player.goals}</td>
                                    <td className="text-success">
                                        {player.winsToAdvance && (
                                            <span><b>+{player.winsToAdvance}</b> wins</span>
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
}

export default Leaderboard;
