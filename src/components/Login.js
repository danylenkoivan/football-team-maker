import React, { Component } from 'react';

import firebase from '../utils/firebase';

class Login extends Component {

    render() {
        return (
            <div>
                {this.state.user ? (
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label has-text-white">{this.state.user.email}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <button className="button is-white" onClick={this.logout.bind(this)}>Logout</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form className="" onSubmit={this.login.bind(this)}>
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <input className="input" id="email" type="email" placeholder="Email" aria-label="Email" />
                                </div>
                                <div className="field">
                                    <input className="input" id="password" type="password" placeholder="Password" aria-label="Password" />
                                </div>
                                <div className="field">
                                    <button className="button is-white" type="submit">Login</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
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
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
        });
    }

    login(e) {
        e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(
                document.getElementById("email").value,
                document.getElementById("password").value
            )
            .catch(function(error) {
                alert(error.message);
            });
    }

    logout(e) {
        e.preventDefault();
        firebase
            .auth()
            .signOut();
    }

}

export default Login;
