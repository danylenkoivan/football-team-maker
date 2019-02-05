import React, { Component } from 'react';

import Match from './Match';

import './Matches.css';

class Matches extends Component {

    players = {};

    render() {
        return (
            <div className="row">
                <div className="col col-lg-10 offset-lg-1 text-center">
                    <h3 className="text-center">Matches</h3>
                    {this.props.matches.length === 0 ? (
                        <div>
                            <p>Couldn't find any...</p>
                            <img className="img-fluid" src="https://media.giphy.com/media/5j4wozAB0iC4w/giphy.gif" alt="" />
                        </div>
                    ) : (
                        this.props.matches.map((match, i) =>
                            <Match match={match} key={i} canEdit={this.props.canEdit} />
                        )
                    )}
                </div>
            </div>
        );
    }

}

export default Matches;
