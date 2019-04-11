import React, { Component } from 'react';

class FullScreenMatchScoreButton extends Component {
    render() {
        var className = ["button is-large is-uppercase"];
        var buttonText = "";

        if (this.props.teamIndex === 0) {
            className.push("is-danger");
            buttonText = "Red Goal!!";
        } else {
            className.push("is-info");
            buttonText = "Blue Goal!!";
        }

        return (
            <div className={className.join(" ")} onClick={this.props.changeScore}>{buttonText}</div>
        );
    }
}

export default FullScreenMatchScoreButton;
