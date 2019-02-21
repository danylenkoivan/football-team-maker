import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './LeaderboardItem.css';

class LeaderboardItem extends Component {
    render() {
        return (
            <div className={"columns is-vcentered leaderboard-item leaderboard-item-" + this.props.index + (this.props.index === 1 ? " featured has-background-light" : "")}>
                <div className="column is-1 leaderboard-item-position has-text-centered">
                    {this.props.index === 1 && (
                        <FontAwesomeIcon icon="trophy" />
                    )}
                    {this.props.index === 2 && (
                        <FontAwesomeIcon icon="medal" />
                    )}
                    {this.props.index === 3 && (
                        <FontAwesomeIcon icon="medal" />
                    )}
                    {this.props.index > 3 && (
                        <span>{this.props.index}</span>
                    )}
                </div>
                <div className="column is-1 leaderboard-item-score">
                    <span className="tag is-dark">{this.props.team.elo}</span>
                </div>
                <div className="column is-3">
                    {this.props.team.key}
                </div>
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
                </div>
            </div>
        );
    }
}

export default LeaderboardItem;
