import React, { Component } from 'react';

import Matches from './Matches';

import firebase from './utils/firebase';

class App extends Component {

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="/">Football team manager</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="main-menu">
                        <ul className="navbar-nav mr-auto"></ul>
                        {this.state.user ? (
                            <div className="form-inline my-2 my-lg-0">
                                <label className="navbar-text mr-2">{this.state.user.email}</label>
                                <button className="btn btn-primary" onClick={this.logout.bind(this)}>Logout</button>
                            </div>
                        ) : (
                            <form class="form-inline my-2 my-lg-0" onSubmit={this.login.bind(this)}>
                                <input class="form-control mb-2 mb-md-0 mr-sm-2" id="email" type="email" placeholder="Email" aria-label="Email" />
                                <input class="form-control mb-2 mb-md-0 mr-sm-2" id="password" type="password" placeholder="Password" aria-label="Password" />
                                <button class="btn btn-primary my-2 my-sm-0" type="submit">Login</button>
                            </form>
                        )}
                    </div>
                </nav>
                <div className="container">
                    <Matches canEdit={this.state.user !== null} />
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
