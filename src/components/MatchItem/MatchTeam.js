import React, { Component } from 'react';

class MatchTeam extends Component {
    render() {
        return (
            <div>
                {this.props.team.players.map((player, i) =>
                    <p key={i}><b>{player}</b></p>
                )}

                <div className="has-addons">
                    <p className="tag is-dark">{this.props.team.elo}</p>
                    {this.props.finalized && (
                        <div className={"tag" + (this.props.team.eloChange > 0 ? " has-text-success" : " has-text-danger")}>
                            {this.props.team.eloChange > 0 && (
                                <span>+</span>
                            )}
                            {this.props.team.eloChange}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MatchTeam;
