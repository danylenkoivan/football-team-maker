import React, { Component } from 'react';

import firebase from '../utils/firebase';
import explode from '../utils/explode';

import MatchItem from "./MatchItem/MatchItem";
import FullScreenMatch from "./FullScreenMatch/FullScreenMatch";

class Match extends Component {
    render() {
        return (
            <div>
                {this.state.fullScreenMode === true && (
                    <FullScreenMatch
                        match={this.props.match}
                        canEdit={this.props.canEdit}
                        changeTeam0Score={this.changeTeam0Score}
                        changeTeam1Score={this.changeTeam1Score}
                        toggleFullScreen={this.toggleFullScreen.bind(this)}
                        finalizeScore={this.finalizeScore.bind(this)}
                    />
                )}
                <MatchItem
                    match={this.props.match}
                    canEdit={this.props.canEdit}
                    changeTeam0Score={this.changeTeam0Score}
                    changeTeam1Score={this.changeTeam1Score}
                    toggleFullScreen={this.toggleFullScreen.bind(this)}
                    rematch={this.rematch.bind(this)}
                    finalizeScore={this.finalizeScore.bind(this)}
                />
            </div>
        );
    }

    constructor(props) {
        super(props)

        this.state = {
            fullScreenMode: false
        }

        this.changeTeam0Score = (e) => this.changeScore(0, e)
        this.changeTeam1Score = (e) => this.changeScore(1, e)
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

            this.setState({fullScreenMode: false})

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
