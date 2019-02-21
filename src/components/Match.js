import React, { Component } from 'react';

import Teams from './Teams';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from '../utils/firebase';
import moment from 'moment';

class Match extends Component {

    render() {
        return (
            <div className={"tile is-vertical match-item message" + (this.props.match.finalized === true ? " is-white" : "")}>
                <div className="tile is-parent">
                    <div className="tile is-child has-text-left">
                        <div className="button is-static">
                            {moment(this.props.match.created).format('D MMMM YYYY, HH:mm')}
                        </div>
                    </div>

                    <div className="tile is-child has-text-right">

                        {this.props.match.finalized === true && this.props.canEdit === true && (
                            <div className="button is-info" onClick={this.rematch.bind(this)} title="Rematch">
                                <FontAwesomeIcon icon="redo" />
                            </div>
                        )}

                        {this.props.match.finalized !== true && this.props.canEdit === true && (
                            <div className="buttons is-pulled-right">
                                <div className="button is-info" disabled onClick={this.toggleFullScreen.bind(this)} title="Full screen">
                                    <FontAwesomeIcon icon="expand" />
                                </div>
                                <div className="button is-info" onClick={this.finalizeScore.bind(this)} title="Finish">
                                    <FontAwesomeIcon icon="power-off" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Teams teams={this.props.match.teams} matchId={this.props.match.key} finalized={this.props.match.finalized} canEdit={this.props.canEdit} />


                {this.props.match.finalized === true && (
                    <hr />
                )}
            </div>
        );
    }

    constructor(props) {
        super(props)

        this.state = {
            fullScreenMode: false
        }
    }

    toggleFullScreen() {
        this.setState({
            state: !this.state
        })
    }

    rematch() {
        if (window.confirm("Are you sure you want to rematch?")) {
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
        if (window.confirm("Are you sure you want to finish this match?")) {
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
