import React, { Component } from 'react';

import Teams from './Teams';

import firebase from '../utils/firebase';
import moment from 'moment';

class Match extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h5 className="d-inline mr-2">
                                {moment(this.props.match.created).format('D MMMM YYYY, HH:mm')}
                            </h5>

                            {this.props.match.finalized !== true ? (
                                <span>
                                    {this.props.canEdit === true && (
                                        <span className="text-primary lock-score" onClick={this.finalizeScore.bind(this)}>Lock the score</span>
                                    )}
                                </span>
                            ) : (
                                <span className="text-primary lock-score" onClick={this.rematch.bind(this)}>Rematch</span>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Teams teams={this.props.match.teams} matchId={this.props.match.key} finalized={this.props.match.finalized} canEdit={this.props.canEdit} />
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        );
    }

    rematch() {
        if (window.confirm("Are you sure you want to rematch?")) {
            console.log(this.props.match);

            firebase.database().ref("matches").push({
                teams: {
                    0: {
                        players: this.props.match.teams[1].players,
                        score: 0
                    },
                    1: {
                        players: this.props.match.teams[0].players,
                        score: 0
                    }
                },
                created: new Date().getTime()
            })
        }
    }

    finalizeScore() {
        if (window.confirm("Are you sure you want to lock this match's score?")) {
            firebase.database().ref('matches/' + this.props.match.key).update({finalized: true})

            if (
                (this.props.match.teams[0].score > 0 && this.props.match.teams[1].score === 0) ||
                (this.props.match.teams[0].score === 0 && this.props.match.teams[1].score > 0)
            ) {
                this.showFlawless();
            }
        }
    }

    showFlawless() {
        document.getElementById("flawless-container").style.display = "block";
        document.getElementById("flawless-victory").style.display = "inline";

        setTimeout(() => {
            document.getElementById("flawless-victory").style.display = "none";
            document.getElementById("flawless-crawl").style.display = "inline";
        }, 2000)

        setTimeout(() => {
            document.getElementById("flawless-container").style.display = "none";
            document.getElementById("flawless-crawl").style.display = "none";
        }, 5000)
    }

}

export default Match;
