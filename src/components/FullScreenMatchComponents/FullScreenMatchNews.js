import React, { Component } from "react";

import moment from "moment";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import StarRateIcon from "@material-ui/icons/StarRate";

const styles = theme => ({
  root: {
    width: "100%",
    overflow: "hidden",
    height: "3rem",
    marginBottom: "3rem",
    backgroundColor: theme.palette.primary.main,
    borderBottom: "solid 2px " + theme.palette.primary.light,
    borderTop: "solid 2px " + theme.palette.primary.light,
    boxSizing: "content-box"
  },
  tikker: {
    display: "inline-block",
    height: "3rem",
    lineHeight: "3rem",
    whiteSpace: "nowrap",
    paddingLeft: "100%",
    boxSizing: "content-box",

    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    animationName: "ticker",
    animationDuration: "25s"
  },
  tickerItem: {
    display: "inline-block",
    padding: "0 1rem",
    color: "#fff",
    fontSize: "2rem"
  },
  divider: {
    fontSize: "1rem"
  },
  teamName: {
    backgroundColor: theme.palette.primary.contrastText,
    padding: "0 0.5rem"
  },
  team0name: {
    color: theme.palette.teamColors[0]
  },
  team1name: {
    color: theme.palette.teamColors[1]
  }
});

class FullScreenMatchNews extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.tikker}>
          <Typography className={this.props.classes.tickerItem}>
            The match started on{" "}
            {moment(this.props.match.created).format("D MMMM YYYY, HH:mm")}
          </Typography>

          <Typography
            className={classNames(
              this.props.classes.divider,
              this.props.classes.tickerItem
            )}
          >
            <StarRateIcon />
          </Typography>

          <Typography className={this.props.classes.tickerItem}>
            Team{" "}
            <span
              className={classNames(
                this.props.classes.teamName,
                this.props.classes.team0name
              )}
            >
              {this.props.match.teams[0].players.join(" - ")}
            </span>{" "}
            has <b>{this.props.match.teams[0].elo}</b> points, can receive{" "}
            <b>
              {this.props.match.teams[0].eloIfWins -
                this.props.match.teams[0].elo}
            </b>{" "}
            points or lose{" "}
            <b>
              {this.props.match.teams[0].elo -
                this.props.match.teams[0].eloIfLoses}
            </b>{" "}
            points.
          </Typography>

          <Typography
            className={classNames(
              this.props.classes.divider,
              this.props.classes.tickerItem
            )}
          >
            <StarRateIcon />
          </Typography>

          <Typography className={this.props.classes.tickerItem}>
            Team{" "}
            <span
              className={classNames(
                this.props.classes.teamName,
                this.props.classes.team1name
              )}
            >
              {this.props.match.teams[1].players.join(" - ")}
            </span>{" "}
            has <b>{this.props.match.teams[1].elo}</b> points, can receive{" "}
            <b>
              {this.props.match.teams[1].eloIfWins -
                this.props.match.teams[1].elo}
            </b>{" "}
            points or lose{" "}
            <b>
              {this.props.match.teams[1].elo -
                this.props.match.teams[1].eloIfLoses}
            </b>{" "}
            points.
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FullScreenMatchNews);
