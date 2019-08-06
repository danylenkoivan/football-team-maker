import React, { Component } from "react";

import FullScreenMatchNews from "./FullScreenMatchComponents/FullScreenMatchNews";
import FullScreenMatchTeam from "./FullScreenMatchComponents/FullScreenMatchTeam";
import FullScreenMatchScore from "./FullScreenMatchComponents/FullScreenMatchScore";
import FullScreenMatchScoreButton from "./FullScreenMatchComponents/FullScreenMatchScoreButton";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

class FullScreenMatch extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <FullScreenMatchNews match={this.props.match} />
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            <FullScreenMatchScoreButton
              teamIndex={0}
              changeScore={this.props.changeTeam0Score}
            />
          </Grid>
          <Grid item xs={2}>
            <FullScreenMatchTeam team={this.props.match.teams[0]} />
          </Grid>
          <Grid item xs={2}>
            <FullScreenMatchScore
              score={this.props.match.teams[0].score}
              teamIndex={0}
            />
          </Grid>
          <Grid item xs={2}>
            <FullScreenMatchScore
              score={this.props.match.teams[1].score}
              teamIndex={1}
            />
          </Grid>
          <Grid item xs={2}>
            <FullScreenMatchTeam team={this.props.match.teams[1]} />
          </Grid>
          <Grid item xs={2}>
            <FullScreenMatchScoreButton
              teamIndex={1}
              changeScore={this.props.changeTeam1Score}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Button
              color="secondary"
              onClick={this.props.finalizeScore}
              title="Finish"
            >
              Finish the match <PowerSettingsNewIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
      // <div className="match full-screen has-background-dark is-hidden-mobile is-hidden-tablet-only is-hidden-desktop-only">
      //     <div className="columns">
      //         <div className="column is-4 has-text-left">
      //             <div className="button is-dark is-uppercase" onClick={this.props.toggleFullScreen}>
      //                 <span className="icon">
      //                     <FontAwesomeIcon icon="expand" />
      //                 </span>
      //                 <span>Exit full screen</span>
      //             </div>
      //         </div>
      //         <div className="column is-4 has-text-centered is-size-4 has-text-white">
      //             {/* Football team manager */}
      //         </div>
      //         <div className="column is-4 has-text-right">
      //             <div className="button is-dark is-uppercase" onClick={this.props.finalizeScore}>
      //                 <span className="icon">
      //                     <FontAwesomeIcon icon="power-off" />
      //                 </span>
      //                 <span>End match</span>
      //             </div>
      //         </div>
      //     </div>
      //     <div className="columns news-line">
      //         <div className="column">
      //             <FullScreenMatchNews
      //                 match={this.props.match}
      //             />
      //         </div>
      //     </div>
      //     <div className="columns">
      //         <div className="column">
      //             <div className="tile">
      //                 <div className="tile is-parent is-vertical team-wrapper">
      //                     <div className="tile is-child">
      //                         <FullScreenMatchTeam team={this.props.match.teams[0]} />
      //                     </div>
      //                 </div>
      //                 <div className="tile is-parent">
      //                     <div className="tile is-vertical">
      //                         <div className="tile is-child">
      //                             <FullScreenMatchScore score={this.props.match.teams[0].score} teamIndex={0} />
      //                         </div>
      //                         {this.props.canEdit && (
      //                             <div className="tile is-child">
      //                                 <FullScreenMatchScoreButton teamIndex={0} changeScore={this.props.changeTeam0Score} />
      //                             </div>
      //                         )}
      //                     </div>
      //                     <div className="tile is-child team-score-delimiter"></div>
      //                     <div className="tile is-vertical">
      //                         <div className="tile is-child">
      //                             <FullScreenMatchScore score={this.props.match.teams[1].score} teamIndex={1} />
      //                         </div>
      //                         {this.props.canEdit && (
      //                             <div className="tile is-child">
      //                                 <FullScreenMatchScoreButton teamIndex={1} changeScore={this.props.changeTeam1Score} />
      //                             </div>
      //                         )}
      //                     </div>
      //                 </div>
      //                 <div className="tile is-parent is-vertical team-wrapper">
      //                     <div className="tile is-child">
      //                         <FullScreenMatchTeam team={this.props.match.teams[1]} />
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // </div>
    );
  }
}

export default FullScreenMatch;
