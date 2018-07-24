import React, { Component } from 'react';

import Matches from './Matches';
import Leaderboard from './Leaderboard';

import firebase from './utils/firebase';

class App extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Football team manager</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="main-menu">
                        <ul className="navbar-nav mr-auto"></ul>
                        {this.state.user ? (
                            <div className="form-inline my-2 my-lg-0">
                                <label className="navbar-text mr-2">{this.state.user.email}</label>
                                <button className="btn btn-primary" onClick={this.logout.bind(this)}>Logout</button>
                            </div>
                        ) : (
                            <form className="form-inline my-2 my-lg-0" onSubmit={this.login.bind(this)}>
                                <input className="form-control mb-2 mb-md-0 mr-sm-2" id="email" type="email" placeholder="Email" aria-label="Email" />
                                <input className="form-control mb-2 mb-md-0 mr-sm-2" id="password" type="password" placeholder="Password" aria-label="Password" />
                                <button className="btn btn-primary my-2 my-sm-0" type="submit">Login</button>
                            </form>
                        )}
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <h3 className="text-center">Matches</h3>
                            <Matches canEdit={this.state.user !== null} />
                        </div>
                        <div className="col-12 col-lg-4">
                            <h3 className="text-center">Players</h3>
                            <Leaderboard />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    login(e) {
        e.preventDefault()
        let _this = this
        firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("password").value)
            .then(function(data) {
                _this.setState({ user: data.user });
            })
            .catch(function(error) {
                alert(error.message);
            });
    }

    logout(e) {
        e.preventDefault()
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }
}

export default App;
