import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from '../utils/firebase';
import explode from '../utils/explode';
import moment from 'moment';

class Match extends Component {

    render() {
        return (
            <div>
                {this.state.fullScreenMode === true && (
                    <div className="match full-screen has-background-dark is-hidden-mobile is-hidden-tablet-only is-hidden-desktop-only">

                        <div className="columns">
                            <div className="column is-4 has-text-left">
                                <div className="button is-dark is-uppercase" onClick={this.toggleFullScreen.bind(this)}>
                                    <span className="icon">
                                        <FontAwesomeIcon icon="expand" />
                                    </span>
                                    <span>Exit full screen</span>
                                </div>
                            </div>
                            <div className="column is-4 has-text-centered is-size-4 has-text-white">
                                Football team manager
                            </div>
                            <div className="column is-4 has-text-right">
                                <div className="button is-dark is-uppercase" onClick={this.finalizeScore.bind(this)}>
                                    <span className="icon">
                                        <FontAwesomeIcon icon="power-off" />
                                    </span>
                                    <span>End match</span>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="tag is-danger live-match-tag">
                                    <FontAwesomeIcon icon="circle" />
                                    Live match
                                </div>
                            </div>
                        </div>
                        <div className="columns news-line">
                            <div className="column">
                                The match started on {moment(this.props.match.created).format('D MMMM YYYY, HH:mm')}

                                <span className="divider">
                                    <FontAwesomeIcon icon="circle" />
                                </span>

                                Team <span className="has-text-danger">{this.props.match.teams[0].players.join(" - ")}</span> has <b>{this.props.match.teams[0].elo}</b> points,
                                can receive <b>{this.props.match.teams[0].eloIfWins - this.props.match.teams[0].elo}</b> points or lose <b>{this.props.match.teams[0].elo - this.props.match.teams[0].eloIfLoses}</b> points.

                                <span className="divider">
                                    <FontAwesomeIcon icon="circle" />
                                </span>

                                Team <span className="has-text-info">{this.props.match.teams[1].players.join(" - ")}</span> has <b>{this.props.match.teams[1].elo}</b> points,
                                can receive <b>{this.props.match.teams[1].eloIfWins - this.props.match.teams[1].elo}</b> points or lose <b>{this.props.match.teams[1].elo - this.props.match.teams[1].eloIfLoses}</b> points.
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="tile">
                                    <div className="tile is-parent is-vertical team-wrapper">
                                        <div className="tile is-child team-players has-text-white">
                                            {this.props.match.teams[0].players.map((player, i) =>
                                                <p key={i}><b>{player}</b></p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tile is-parent">
                                        <div className="tile is-vertical">
                                            <div className="tile is-child box team-score has-background-danger has-text-white">
                                                {this.props.match.teams[0].score}
                                            </div>
                                            {this.props.canEdit && (
                                                <div className="tile is-child">
                                                    <div className="button is-large is-danger is-uppercase" onClick={(e) => this.changeScore(0, e)}>Red goal!!</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="tile is-child team-score-delimiter"></div>
                                        <div className="tile is-vertical">
                                            <div className="tile is-child box team-score has-background-info has-text-white">
                                                {this.props.match.teams[1].score}
                                            </div>
                                            {this.props.canEdit && (
                                                <div className="tile is-child">
                                                    <div className="button is-large is-info is-uppercase" onClick={(e) => this.changeScore(1, e)}>Blue goal!!</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tile is-parent is-vertical team-wrapper">
                                        <div className="tile is-child team-players has-text-white">
                                            {this.props.match.teams[1].players.map((player, i) =>
                                                <div key={i}><b>{player}</b></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={"tile is-vertical match-item message" + (this.props.match.finalized === true ? " is-white" : "")}>
                    <div className="tile is-parent">
                        <div className="tile is-child has-text-left">
                            <div className="button is-static">
                                {moment(this.props.match.created).format('D MMMM YYYY, HH:mm')}
                            </div>
                        </div>

                        <div className="tile is-child has-text-right">

                            {this.props.match.finalized === true && this.props.canEdit === true && (
                                <div className="button" onClick={this.rematch.bind(this)} title="Rematch">
                                    <FontAwesomeIcon icon="redo" />
                                </div>
                            )}

                            {this.props.match.finalized !== true && this.props.canEdit === true && (
                                <div className="buttons is-pulled-right">
                                    <div className="button is-hidden-mobile is-hidden-tablet-only is-hidden-desktop-only" onClick={this.toggleFullScreen.bind(this)} title="Full screen">
                                        <FontAwesomeIcon icon="expand" />
                                    </div>
                                    <div className="button" onClick={this.finalizeScore.bind(this)} title="Finish">
                                        <FontAwesomeIcon icon="power-off" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="tile">
                        <div className="tile is-parent is-vertical team-wrapper">
                            <div className="tile is-child">
                                {this.props.match.teams[0].players.map((player, i) =>
                                    <p key={i}><b>{player}</b></p>
                                )}

                                <div className="has-addons">
                                    <p className="tag is-dark">{this.props.match.teams[0].elo}</p>
                                    {this.props.match.finalized && (
                                        <div className={"tag" + (this.props.match.teams[0].eloChange > 0 ? " has-text-success" : " has-text-danger")}>
                                            {this.props.match.teams[0].eloChange > 0 && (
                                                <span>+</span>
                                            )}
                                            {this.props.match.teams[0].eloChange}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <div className="tile is-child team-score">
                                <span className={"team-score-item tag is-size-4 " + (this.props.match.finalized ? "is-dark" : "is-danger active") + (this.props.canEdit ? " editable" : "")} onClick={(e) => this.changeScore(0, e)}>{this.props.match.teams[0].score}</span>
                            </div>
                            <div className="tile is-child team-score">
                                <span className="team-score-item is-size-4">-</span>
                            </div>
                            <div className="tile is-child team-score">
                                <span className={"team-score-item tag is-size-4 " + (this.props.match.finalized ? "is-dark" : "is-info active") + (this.props.canEdit ? " editable" : "")} onClick={(e) => this.changeScore(1, e)}>{this.props.match.teams[1].score}</span>
                            </div>
                        </div>
                        <div className="tile is-parent is-vertical team-wrapper">
                            <div className="tile is-child">
                                {this.props.match.teams[1].players.map((player, i) =>
                                    <div key={i}><b>{player}</b></div>
                                )}

                                <div className="has-addons">
                                    <div className="tag is-dark">{this.props.match.teams[1].elo}</div>
                                    {this.props.match.finalized && (
                                        <div className={"tag" + (this.props.match.teams[1].eloChange > 0 ? " has-text-success" : " has-text-danger")}>
                                            {this.props.match.teams[1].eloChange > 0 && (
                                                <span>+</span>
                                            )}
                                            {this.props.match.teams[1].eloChange}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.props.match.finalized === true && (
                        <hr />
                    )}
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props)

        this.state = {
            fullScreenMode: false
        }
    }

    changeScore (teamId, e) {
        if (this.props.canEdit) {
            // if clicked with ctrl then it's a decrease action.
            // no way mobile users can decrease atm
            let action = (e.ctrlKey === true) ? "decrease" : "increase";

            if (this.props.finalized !== true) {
                let score = this.props.match.teams[teamId].score

                if (action === "increase" && score < 10) {
                    score++;
                    if (this.state.fullScreenMode === false) {
                        explode(e.pageX, e.pageY);
                    }
                } else if (action === "decrease" && score > 0) {
                    score--;
                } else {
                    return;
                }

                firebase.database().ref("matches/" + this.props.match.key + "/teams/" + teamId).update({score: score})
            }
        }
    }

    toggleFullScreen() {
        this.setState({
            fullScreenMode: !this.state.fullScreenMode
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
