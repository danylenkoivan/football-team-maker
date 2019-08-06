import React, { Component } from "react";
import LeaderboardItem from "./LeaderboardItem"

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        width: '100%',
    },
    leaderboardItemCenteredContainer: {
        textAlign: 'center',
    },
});

class Leaderboard extends Component {
    render() {
        return (
            <div>
                {this.props.teams && (
                    <Grid container className={this.props.classes.root}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={2} className={this.props.classes.leaderboardItemCenteredContainer}><Typography>Score</Typography></Grid>
                        <Grid item xs={2} className={this.props.classes.leaderboardItemCenteredContainer}><Typography>Matches</Typography></Grid>
                        <Grid item xs={2} className={this.props.classes.leaderboardItemCenteredContainer}><Typography>Goals</Typography></Grid>
                    </Grid>
                )}
                {this.props.teams.map((team, i) =>
                    <LeaderboardItem team={team} index={i + 1} key={i} />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(Leaderboard);
