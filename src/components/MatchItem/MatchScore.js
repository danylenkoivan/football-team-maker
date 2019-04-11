import React, { Component } from 'react';

class MatchScore extends Component {
    render() {
        var className = ["team-score-item tag is-size-4"];

        if (this.props.finalized) {
            className.push("is-dark");
        } else {
            className.push("active");
            if (this.props.teamIndex === 0) {
                className.push("is-danger");
            } else {
                className.push("is-info");
            }
        }

        if (this.props.canEdit) {
            className.push("editable");
        }

        return (
            <span className={className.join(" ")} onClick={this.props.changeScore}>
                {this.props.score}
            </span>
        );
    }
}

export default MatchScore;
