import React, { Component } from 'react';

import Matches from './Matches';

import firebase from './utils/firebase';

class App extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-light bg-light justify-content-between">
                            <a className="navbar-brand">Navbar</a>
                            {this.state.user ? (
                                <div className="form-inline">
                                    <label className="col-form-label mr-2">{this.state.user.email}</label>
                                    <button className="btn btn-primary" onClick={this.logout.bind(this)}>Logout</button>
                                </div>
                            ) : (
                                <form className="form-inline" onSubmit={this.login.bind(this)}>
                                    <input type="email" className="form-control mr-2" id="email" placeholder="Email" />
                                    <input type="password" className="form-control mr-2" id="password" placeholder="Password" />

                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                            )}
                        </nav>
                    </div>
                </div>
                <Matches canEdit={this.state.user !== null} />
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
