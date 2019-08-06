import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  victoryPoints: {
    color: theme.palette.matchResultColors.victory
  },
  lossPoints: {
    color: theme.palette.matchResultColors.loss
  },
});

class MatchTeam extends Component {
    render() {
        return (
            <div>
                {this.props.team.players.map((player, i) =>
                    <Typography variant="button" gutterBottom key={i}>{player}</Typography>
                )}

                <Chip className={this.props.classes.chip} label={this.props.team.elo} />

                {this.props.team.eloChange && (
                    <Chip className={this.props.team.eloChange > 0 ? this.props.classes.victoryPoints : this.props.classes.lossPoints} label={(this.props.team.eloChange > 0 ? '+' : '') + this.props.team.eloChange} />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(MatchTeam);
