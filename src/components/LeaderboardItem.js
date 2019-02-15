import React, { Component } from 'react';

import './LeaderboardItem.css';

class LeaderboardItem extends Component {
    render() {
        return (
            <div className={"columns is-vcentered leaderboard-item" + (this.props.index === 1 ? " box featured has-background-light" : "")}>
                <div className="column is-1 leaderboard-item-position">{this.props.index}</div>
                <div className="column is-4">{this.props.team.key}</div>
                <div className="column is-7">
                    <div className="leaderboard-item-cell leaderboard-item-cell-won tile is-ancestor is-vertical">
                        {this.props.index === 1 && (
                            <div className="tile leaderboard-item-cell-label">
                                Won
                            </div>
                        )}
                        <div className="tile">
                            {this.props.team.won}
                        </div>
                    </div>
                    <div className="leaderboard-item-cell leaderboard-item-cell-lost tile is-ancestor is-vertical has-text-centered">
                        {this.props.index === 1 && (
                            <div className="tile leaderboard-item-cell-label">
                                Lost
                            </div>
                        )}
                        <div className="tile">
                            {this.props.team.lost}
                        </div>
                    </div>
                    <div className="leaderboard-item-cell leaderboard-item-cell-goals tile is-ancestor is-vertical has-text-centered">

                        {this.props.index === 1 && (
                            <div className="tile leaderboard-item-cell-label">
                                Goals
                            </div>
                        )}
                        <div className="tile">
                            <div className="tile">
                                {this.props.team.goalsPlus - this.props.team.goalsMinus}
                            </div>
                            <div className="tile is-vertical">
                                <div className="tile leaderboard-item-cell-goal-stats-scored">
                                    + {this.props.team.goalsPlus}
                                </div>
                                <div className="tile leaderboard-item-cell-goal-stats-missed">
                                    - {this.props.team.goalsMinus}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="leaderboard-item-cell leaderboard-item-cell-points tile is-ancestor is-vertical has-text-centered">
                        {this.props.index === 1 && (
                            <div className="tile leaderboard-item-cell-label">
                                Score
                            </div>
                        )}
                        <div className="tile">
                            {this.props.team.elo}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeaderboardItem;
