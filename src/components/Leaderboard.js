import React, { Component } from 'react';

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
                                <td>To advance</td>
                                <td colSpan="2">Goals</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.teams.map((player, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{player.key}</td>
                                    <td>{player.won}</td>
                                    <td>{player.lost}</td>
                                    <td><b>{player.score}</b></td>
                                    <td className="text-success">
                                        {player.winsToAdvance && (
                                            <span><b>+{player.winsToAdvance}</b> wins</span>
                                        )}
                                    </td>
                                    <td className="text-success">{player.goalsPlus}</td>
                                    <td className="text-danger">{player.goalsMinus}</td>
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
