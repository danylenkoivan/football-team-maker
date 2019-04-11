import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPowerOff, faRedo, faExpand, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add([faPowerOff, faRedo, faExpand, faCircle])

class MatchItem extends Component {
    render() {

        return (
            <div>
                {this.props.finalized === true && this.props.canEdit === true && (
                    <div className="button rematch-action" onClick={this.props.rematch} title="Rematch">
                        <FontAwesomeIcon icon="redo" />
                    </div>
                )}

                {this.props.finalized !== true && this.props.canEdit === true && (
                    <div className="buttons is-pulled-right">
                        <div className="button expand-action is-hidden-mobile is-hidden-tablet-only is-hidden-desktop-only" onClick={this.props.toggleFullScreen} title="Full screen">
                            <FontAwesomeIcon icon="expand" />
                        </div>
                        <div className="button finalize-action" onClick={this.props.finalizeScore} title="Finish">
                            <FontAwesomeIcon icon="power-off" />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default MatchItem;
