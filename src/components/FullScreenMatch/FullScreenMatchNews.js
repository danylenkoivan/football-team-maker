import React, { Component } from 'react';

import moment from 'moment';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add([faCircle])

class FullScreenMatchNews extends Component {
    render() {
        return (
            <div>
                The match started on {moment(this.props.match.created).format('D MMMM YYYY, HH:mm')}

                <span className="divider">
                    <FontAwesomeIcon icon="circle" />
                </span>

                Team <span className="has-text-danger">{this.props.match.teams[0].players.join(" - ")}</span> has <b>{this.props.match.teams[0].elo}</b> points,
                can receive <b>{this.props.match.teams[0].eloIfWins - this.props.match.teams[0].elo}</b> points or lose <b>{this.props.match.teams[0].elo - this.props.match.teams[0].eloIfLoses}</b> points.

                <span className="divider">
                    <FontAwesomeIcon icon="circle" />
                </span>

                Team <span className="has-text-info">{this.props.match.teams[1].players.join(" - ")}</span> has <b>{this.props.match.teams[1].elo}</b> points,
                can receive <b>{this.props.match.teams[1].eloIfWins - this.props.match.teams[1].elo}</b> points or lose <b>{this.props.match.teams[1].elo - this.props.match.teams[1].eloIfLoses}</b> points.
            </div>
        );
    }

}

export default FullScreenMatchNews;
