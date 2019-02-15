import React, { Component } from 'react';

import Match from './Match';

import './Matches.css';

class Matches extends Component {

    render() {
        var defaultMatchesShownCount = 3;

        return (
            <div className="columns">
                <div className="column is-11 is-offset-1 has-text-centered" id="matches">
                    <div className="matches" id="matches">
                        {this.props.matches.length === 0 ? (
                            <div>
                                <p>Couldn't find any...</p>
                                <img className="" src="https://media.giphy.com/media/5j4wozAB0iC4w/giphy.gif" alt="" />
                            </div>
                        ) : (
                            <div>
                                {this.props.matches.slice().reverse().splice(0, (this.state.showAll ? this.props.matches.length : defaultMatchesShownCount)).map((match, i) =>
                                    <Match match={match} key={i} canEdit={this.props.canEdit} />
                                )}
                            </div>
                        )}
                    </div>
                    <div class="button is-white is-uppercase has-text-primary" onClick={this.toggleMatchesShown.bind(this)}>
                        {this.state.showAll && this.props.matches.length > defaultMatchesShownCount ? (
                            <span>Show less matches</span>
                        ) : (
                            <span>Show all matches</span>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props)

        this.state = {
            showAll: false
        }
    }

    toggleMatchesShown() {
        this.setState({showAll: !this.state.showAll})
    }

}

export default Matches;
