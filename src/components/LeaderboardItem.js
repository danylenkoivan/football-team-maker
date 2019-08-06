import React, { Component } from "react";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import Looks3Icon from "@material-ui/icons/Looks3";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    fontSize: "1.5rem",
    lineHeight: "2rem",
    marginBottom: "0.5rem",
    marginTop: "0.5rem",
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    width: "100%"
  },
  leaderboardItemCenteredContainer: {
    textAlign: "center"
  },
  placeIcon: {
    fontSize: "2rem",
    verticalAlign: "middle"
  },
  firstPlaceIcon: {
    color: "#ffe082"
  },
  secondPlaceIcon: {
    color: "#c5cae9",
    fontSize: "2rem"
  },
  thirdPlaceIcon: {
    color: "#ceb1a1",
    fontSize: "2rem"
  },

  victoryPoints: {
    color: theme.palette.matchResultColors.victory
  },
  lossPoints: {
    color: theme.palette.matchResultColors.loss
  }
});

class LeaderboardItem extends Component {
  render() {
    return (
      <Grid container className={this.props.classes.root}>
        <Grid
          item
          xs={2}
          className={this.props.classes.leaderboardItemCenteredContainer}
        >
          {this.props.index === 1 && (
            <LooksOneIcon
              className={classNames(
                this.props.classes.placeIcon,
                this.props.classes.firstPlaceIcon
              )}
            />
          )}
          {this.props.index === 2 && (
            <LooksTwoIcon
              className={classNames(
                this.props.classes.placeIcon,
                this.props.classes.secondPlaceIcon
              )}
            />
          )}
          {this.props.index === 3 && (
            <Looks3Icon
              className={classNames(
                this.props.classes.placeIcon,
                this.props.classes.thirdPlaceIcon
              )}
            />
          )}
          {this.props.index > 3 && (
            <Typography inline>{this.props.index}</Typography>
          )}
        </Grid>
        <Grid item xs={4}>
          <Typography inline>
            <b>{this.props.team.key}</b>
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          className={this.props.classes.leaderboardItemCenteredContainer}
        >
          <Typography inline>
            <b>{this.props.team.elo}</b>
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          className={this.props.classes.leaderboardItemCenteredContainer}
        >
          <Typography inline className={this.props.classes.victoryPoints}>
            {this.props.team.won}
          </Typography>
          <Typography inline> - </Typography>
          <Typography inline className={this.props.classes.lossPoints}>
            {this.props.team.lost}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          className={this.props.classes.leaderboardItemCenteredContainer}
        >
          <Typography inline className={this.props.classes.victoryPoints}>
            {this.props.team.goalsPlus}
          </Typography>
          <Typography inline> - </Typography>
          <Typography inline className={this.props.classes.lossPoints}>
            {this.props.team.goalsMinus}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LeaderboardItem);
