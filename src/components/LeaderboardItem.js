import React, { Component } from 'react';

import './LeaderboardItem.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons'

library.add([faTrophy, faMedal])

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
                <div className="column is-1">
                    <span className="tag is-dark leaderboard-item-score">{this.props.team.elo}</span>
                </div>
                <div className="column is-3 leaderboard-item-key">
                    {this.props.team.key}
                </div>
                <div className="column is-7">
                    <div className="leaderboard-item-cell tile is-ancestor is-vertical has-text-success">
                        {this.props.index === 1 && (
                            <div className="tile leaderboard-item-cell-label">
                                Won
                            </div>
                        )}
                        <div className="tile leaderboard-item-won">
                            {this.props.team.won}
                        </div>
                    </div>
                    <div className="leaderboard-item-cell tile is-ancestor is-vertical has-text-centered has-text-danger">
                        {this.props.index === 1 && (
                            <div className="tile leaderboard-item-cell-label">
                                Lost
                            </div>
                        )}
                        <div className="tile leaderboard-item-lost">
                            {this.props.team.lost}
                        </div>
                    </div>
                    <div className="leaderboard-item-cell leaderboard-item-goals tile is-ancestor is-vertical has-text-centered">

                        {this.props.index === 1 && (
                            <div className="tile leaderboard-item-cell-label">
                                Goals
                            </div>
                        )}
                        <div className="tile">
                            <div className="tile leaderboard-item-goal-difference">
                                {(this.props.team.goalsPlus - this.props.team.goalsMinus).toString()}
                            </div>
                            <div className="tile is-vertical">
                                <div className="tile leaderboard-item-goal-scored has-text-success">
                                    + {this.props.team.goalsPlus}
                                </div>
                                <div className="tile leaderboard-item-goal-missed has-text-danger">
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
