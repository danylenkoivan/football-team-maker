import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    teamScoreActive: {
        cursor: 'pointer',
        width: '50%',
        padding: theme.spacing.unit,
        margin: '0 auto',
    },
    teamScoreFinalized: {
        cursor: 'default',
        padding: theme.spacing.unit,
    },
    team0score: {
        color: theme.palette.teamColors[0]
    },
    team1score: {
        color: theme.palette.teamColors[1]
    },
});


class MatchScore extends Component {
    render() {
        return (
            <div className={this.props.finalized ? this.props.classes.teamScoreFinalized : this.props.classes.teamScoreActive} onClick={this.props.changeScore}>
                <Typography variant="h4" className={!this.props.finalized ? (this.props.classes['team' + this.props.teamIndex + 'score']) : ''}>{this.props.score}</Typography>
            </div>
        );
    }
}

export default withStyles(styles)(MatchScore);
