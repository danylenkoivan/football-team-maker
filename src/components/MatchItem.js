import React, { Component } from 'react';

import MatchScore from "./MatchItemComponents/MatchScore";
import MatchTeam from "./MatchItemComponents/MatchTeam";
import MatchButtons from "./MatchItemComponents/MatchButtons";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import moment from 'moment';

const styles = theme => ({
    root: {
        border: '1px solid #fff',
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        width: '350px',
    },
    finalized: {
        borderColor: '#ddd',
    },
    dateContainer: {
        paddingBottom: theme.spacing.unit,
        paddingTop: theme.spacing.unit,
    },
    teamContainer: {
        textAlign: 'center'
    }
});

class MatchItem extends Component {
    render() {
        let classes = [this.props.classes.root]

        if (this.props.match.finalized) {
            classes.push(this.props.classes.finalized)
        }
        return (
            <Card elevation={this.props.match.finalized ? 0 : 10} className={classes.join(' ')} >
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography className={this.props.classes.dateContainer}>{moment(this.props.match.created).format('D MMMM YYYY, HH:mm')}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <MatchButtons
                                    finalized={this.props.match.finalized}
                                    canEdit={this.props.canEdit}
                                    rematch={this.props.rematch}
                                    toggleFullScreen={this.props.toggleFullScreen}
                                    finalizeScore={this.props.finalizeScore}
                                />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6} className={this.props.classes.teamContainer}>
                            <MatchScore finalized={this.props.match.finalized} score={this.props.match.teams[0].score} canEdit={this.props.canEdit} teamIndex={0} changeScore={this.props.changeTeam0Score} />
                            <MatchTeam team={this.props.match.teams[0]} finalized={this.props.match.finalized} />
                        </Grid>
                        <Grid item xs={6} className={this.props.classes.teamContainer}>
                            <MatchScore finalized={this.props.match.finalized} score={this.props.match.teams[1].score} canEdit={this.props.canEdit} teamIndex={1} changeScore={this.props.changeTeam1Score} />
                            <MatchTeam team={this.props.match.teams[1]} finalized={this.props.match.finalized} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(MatchItem);
