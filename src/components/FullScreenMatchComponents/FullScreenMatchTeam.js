import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '8rem',
  },
  player: {
    textAlign: 'center',
    lineHeight: '4rem',
  }
});

class FullScreenMatchTeam extends Component {
    render() {
        return (
            <Paper elevation={0} className={this.props.classes.root}>
                {this.props.team.players.map((player, i) =>
                    <Typography variant="h4" className={this.props.classes.player} key={i}>{player}</Typography>
                )}
            </Paper>
        );
    }
}

export default withStyles(styles)(FullScreenMatchTeam);
