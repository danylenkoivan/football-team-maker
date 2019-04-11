import React, { Component } from 'react';

class FullScreenMatchTeam extends Component {
    render() {
        return (
            <div className="team-players has-text-white">
                {this.props.team.players.map((player, i) =>
                    <p key={i}><b>{player}</b></p>
                )}
            </div>
        );
    }
}

export default FullScreenMatchTeam;
