import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import AutorenewIcon from "@material-ui/icons/Autorenew";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const styles = theme => ({
  buttonsContainer: {
    textAlign: "right"
  }
});

class MatchButtons extends Component {
  render() {
    return (
      <div className={this.props.classes.buttonsContainer}>
        {this.props.finalized === true && this.props.canEdit === true && (
          <Button color="primary" onClick={this.props.rematch} title="Rematch">
            <AutorenewIcon />
          </Button>
        )}

        {this.props.finalized !== true && this.props.canEdit === true && (
          <div>
            <Button
              color="primary"
              className="is-hidden-mobile is-hidden-tablet-only is-hidden-desktop-only"
              onClick={this.props.toggleFullScreen}
              title="Full screen"
            >
              <FullscreenIcon />
            </Button>
            <Button
              color="secondary"
              onClick={this.props.finalizeScore}
              title="Finish"
            >
              <PowerSettingsNewIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MatchButtons);
