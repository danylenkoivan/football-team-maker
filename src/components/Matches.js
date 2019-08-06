import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Match from "./Match";

const styles = theme => ({
  showMoreMatchesButton: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit
  }
});

class Matches extends Component {
  render() {
    const defaultMatchesShownCount = 24;

    return (
      <div>
        {this.props.matches.length === 0 ? (
          <Grid container justify="center">
            <Grid item>
              <Typography align="center">No matches yet</Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={16} justify="flex-start">
            {this.props.matches
              .slice()
              .reverse()
              .splice(
                0,
                this.state.showAll
                  ? this.props.matches.length
                  : defaultMatchesShownCount
              )
              .map((match, i) => (
                <Grid item key={i}>
                  <Match match={match} key={i} canEdit={this.props.canEdit} />
                </Grid>
              ))}
          </Grid>
        )}
        {this.props.matches.length > defaultMatchesShownCount && (
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.showMoreMatchesButton}
                onClick={this.toggleMatchesShown.bind(this)}
              >
                {this.state.showAll ? (
                  <span>Show less matches</span>
                ) : (
                  <span>Show more matches</span>
                )}
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      showAll: false
    };
  }

  toggleMatchesShown() {
    this.setState({ showAll: !this.state.showAll });
  }
}

export default withStyles(styles)(Matches);
