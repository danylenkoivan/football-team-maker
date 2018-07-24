import React, { Component } from 'react';

import './Teams.css';

import firebase from './utils/firebase';
import explode from './utils/explode';

class Teams extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-4 team-wrapper text-left text-md-center">
                    {this.props.teams[0].players.map((player, i) =>
                        <div key={i}><b>{player}</b></div>
                    )}
                </div>

                <div className="col-12 col-md-4">
                    <div className="row">
                        <div className="col-4 team-score">
                            <span className={"badge" + (this.props.finalized ? " badge-secondary" : " badge-danger active") + (this.props.canEdit ? " editable" : "")} onClick={(e) => this.changeScore(0, e)}>{this.props.teams[0].score}</span>
                        </div>
                        <div className="col-4 team-score text-center">
                            -
                        </div>
                        <div className="col-4 team-score">
                            <span className={"badge " + (this.props.finalized ? "badge-secondary" : "badge-primary active")} onClick={(e) => this.changeScore(1, e)}>{this.props.teams[1].score}</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 team-wrapper text-right text-md-center">
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
            // no way mobiles users can decrease atm
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