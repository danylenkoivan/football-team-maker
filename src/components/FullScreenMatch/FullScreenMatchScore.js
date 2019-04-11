import React, { Component } from 'react';

class FullScreenMatchScore extends Component {
    render() {
        var className = ["box team-score has-text-white"];

        if (this.props.teamIndex === 0) {
            className.push("has-background-danger");
        } else {
            className.push("has-background-info");
        }

        return (
            <div className={className.join(" ")}>
                {this.props.score}
            </div>
        );
    }
}

export default FullScreenMatchScore;
