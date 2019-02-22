import React, { Component } from 'react';

import firebase from '../utils/firebase';
import explode from '../utils/explode';

import './Teams.css';

class Teams extends Component {
    render() {
        return (
            <div className="tile">
                <div className="tile is-parent is-vertical team-wrapper">
                    <div className="tile is-child">
                        {this.props.teams[0].players.map((player, i) =>
                            <div key={i}><b>{player}</b></div>
                        )}

                        <div class="has-addons">
                            <div class="tag is-dark">{this.props.teams[0].elo}</div>
                            {this.props.finalized && (
                                <div className={"tag" + (this.props.teams[0].eloChange > 0 ? " has-text-success" : " has-text-danger")}>
                                    {this.props.teams[0].eloChange > 0 && (
                                        <span>+</span>
                                    )}
                                    {this.props.teams[0].eloChange}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <div className="tile is-child team-score">
                        <span className={"team-score-item tag is-size-4 " + (this.props.finalized ? "is-dark" : "is-danger active") + (this.props.canEdit ? " editable" : "")} onClick={(e) => this.changeScore(0, e)}>{this.props.teams[0].score}</span>
                    </div>
                    <div className="tile is-child team-score">
                        <span className="team-score-item is-size-4">-</span>
                    </div>
                    <div className="tile is-child team-score">
                        <span className={"team-score-item tag is-size-4 " + (this.props.finalized ? "is-dark" : "is-white active") + (this.props.canEdit ? " editable" : "")} onClick={(e) => this.changeScore(1, e)}>{this.props.teams[1].score}</span>
                    </div>
                </div>
                <div className="tile is-parent is-vertical team-wrapper">
                    <div className="tile is-child">
                        {this.props.teams[1].players.map((player, i) =>
                            <div key={i}><b>{player}</b></div>
                        )}

                        <div class="has-addons">
                            <div class="tag is-dark">{this.props.teams[1].elo}</div>
                            {this.props.finalized && (
                                <div className={"tag" + (this.props.teams[1].eloChange > 0 ? " has-text-success" : " has-text-danger")}>
                                    {this.props.teams[1].eloChange > 0 && (
                                        <span>+</span>
                                    )}
                                    {this.props.teams[1].eloChange}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    changeScore (teamId, e) {
        if (this.props.canEdit) {
            // if clicked with ctrl then it's a decrease action.
            // no way mobile users can decrease atm
            let action = (e.ctrlKey === true) ? "decrease" : "increase";

            if (this.props.finalized !== true) {
                let score = this.props.teams[teamId].score

                if (action === "increase" && score < 10) {
                    score++;
                    explode(e.pageX, e.pageY);
                } else if (action === "decrease" && score > 0) {
                    score--;
                } else {
                    return;
                }

                firebase.database().ref("matches/" + this.props.matchId + "/teams/" + teamId).update({score: score})
            }
        }
    }
}

export default Teams;