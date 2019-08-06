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
  score: {
    fontSize: "8rem",
    lineHeight: "8rem",
    textAlign: "center"
  },
  team0Score: {
    color: theme.palette.teamColors[0]
  },
  team1Score: {
    color: theme.palette.teamColors[1]
  }
});

class FullScreenMatchScore extends Component {
  render() {
    let className = [this.props.classes.score];

    if (this.props.teamIndex === 0) {
      className.push(this.props.classes.team0Score);
    } else {
      className.push(this.props.classes.team1Score);
    }

    return (
      <Paper elevation={0} className={this.props.classes.root}>
        <Typography variant="h4" className={classNames(className)}>
          {this.props.score}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(FullScreenMatchScore);
