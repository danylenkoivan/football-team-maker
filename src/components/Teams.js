import React, { Component } from 'react';

import firebase from '../utils/firebase';
import explode from '../utils/explode';

import './Teams.css';

class Teams extends Component {
    render() {
        return (
            <div className="tile is-parent">
                <div className="tile is-child team-wrapper">
                    {this.props.teams[0].players.map((player, i) =>
                        <div key={i}><b>{player}</b></div>
                    )}
                </div>
                <div className="tile is-child">
                    <div className="tile">
                        <div className="tile is-child team-score">
                            <span className={"tag is-size-4 " + (this.props.finalized ? "is-dark" : "is-danger active") + (this.props.canEdit ? " editable" : "")} onClick={(e) => this.changeScore(0, e)}>{this.props.teams[0].score}</span>
                        </div>
                        <div className="tile is-child team-score">
                            -
                        </div>
                        <div className="tile is-child team-score">
                            <span className={"tag is-size-4 " + (this.props.finalized ? "is-dark" : "is-white active") + (this.props.canEdit ? " editable" : "")} onClick={(e) => this.changeScore(1, e)}>{this.props.teams[1].score}</span>
                        </div>
                    </div>
                </div>
                <div className="tile is-child team-wrapper">
                    {this.props.teams[1].players.map((player, i) =>
                        <div key={i}><b>{player}</b></div>
                    )}
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