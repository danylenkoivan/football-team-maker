import React, { Component } from "react";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: "8rem"
  },
  button: {
    color: "#fff",
    cursor: "pointer",
    textAlign: "center",
    lineHeight: "8rem"
  },
  team0Button: {
    backgroundColor: theme.palette.teamColors[0]
  },
  team1Button: {
    backgroundColor: theme.palette.teamColors[1]
  }
});

class FullScreenMatchScoreButton extends Component {
  render() {
    let className = [this.props.classes.button];

    let buttonText = "";

    if (this.props.teamIndex === 0) {
      className.push(this.props.classes.team0Button);
      buttonText = "Goal!!";
    } else {
      className.push(this.props.classes.team1Button);
      buttonText = "Goal!!";
    }

    return (
      <Paper
        elevation={0}
        className={this.props.classes.root}
        onClick={this.props.changeScore}
      >
        <Typography variant="h5" className={classNames(className)}>
          {buttonText}
        </Typography>
      </Paper>
      // <div className={className.join(" ")} onClick={this.props.changeScore}>{buttonText}</div>
    );
  }
}

export default withStyles(styles)(FullScreenMatchScoreButton);
