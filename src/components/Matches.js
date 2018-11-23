import React, { Component } from 'react';

import Teams from './Teams';

import firebase from '../utils/firebase';
import moment from 'moment';

import './Matches.css';

class Matches extends Component {

    players = {};

    render() {
        return (
            <div className="row">
                <div className="col col-lg-10 offset-lg-1 text-center">
                    <h3 className="text-center">Matches</h3>
                    {this.props.matches.length === 0 ? (
                        <div>
                            <p>Couldn't find any...</p>
                            <img className="img-fluid" src="https://media.giphy.com/media/5j4wozAB0iC4w/giphy.gif" alt="" />
                        </div>
                    ) : (
                        this.props.matches.map((match, i) =>
                            <div className="row" key={i}>
                                <div className="col-12">
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <h5 className="d-inline mr-2">
                                                {moment(match.created).format('D MMMM YYYY, HH:mm')}
                                            </h5>

                                            { match.finalized !== true ? (
                                                <span>
                                                    {this.props.canEdit === true && (
                                                        <span className="text-primary lock-score" onClick={(e) => this.finalizeScore(match.key)}>Lock the score</span>
                                                    )}
                                                </span>
                                            ) : (
                                                <span>(Finished)</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Teams teams={match.teams} matchId={match.key} finalized={match.finalized} canEdit={this.props.canEdit} />
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }

    finalizeScore(matchId) {
        if (window.confirm("Are you sure you want to lock this match's score?")) {
            firebase.database().ref('matches/' + matchId).update({finalized: true})

            let match = this.props.matches.find( match => match.key === matchId )

            if (
                (match.teams[0].score > 0 && match.teams[1].score === 0) ||
                (match.teams[0].score === 0 && match.teams[1].score > 0)
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

export default Matches;
