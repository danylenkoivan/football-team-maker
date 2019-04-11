import React, { Component } from 'react';

import MatchScore from "./MatchScore";
import MatchTeam from "./MatchTeam";
import MatchButtons from "./MatchButtons";

import moment from 'moment';

class MatchItem extends Component {
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
                        <MatchButtons
                            finalized={this.props.match.finalized}
                            canEdit={this.props.canEdit}
                            rematch={this.props.rematch}
                            toggleFullScreen={this.props.toggleFullScreen}
                            finalizeScore={this.props.finalizeScore}
                        />
                    </div>
                </div>

                <div className="tile">
                    <div className="tile is-parent is-vertical team-wrapper">
                        <div className="tile is-child">
                            <MatchTeam team={this.props.match.teams[0]} finalized={this.props.match.finalized} />
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <div className="tile is-child team-score">
                            <MatchScore finalized={this.props.match.finalized} score={this.props.match.teams[0].score} canEdit={this.props.canEdit} teamIndex={0} changeScore={this.props.changeTeam0Score} />
                        </div>
                        <div className="tile is-child team-score">
                            <span className="team-score-item is-size-4">-</span>
                        </div>
                        <div className="tile is-child team-score">
                            <MatchScore finalized={this.props.match.finalized} score={this.props.match.teams[1].score} canEdit={this.props.canEdit} teamIndex={1} changeScore={this.props.changeTeam1Score} />
                        </div>
                    </div>
                    <div className="tile is-parent is-vertical team-wrapper">
                        <div className="tile is-child">
                            <MatchTeam team={this.props.match.teams[1]} finalized={this.props.match.finalized} />
                        </div>
                    </div>
                </div>

                {this.props.match.finalized === true && (
                    <hr />
                )}
            </div>
        );
    }
}

export default MatchItem;
