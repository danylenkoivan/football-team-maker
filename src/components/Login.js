import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import firebase from '../utils/firebase';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  accountButton: {
      cursor: 'pointer'
  }
});

class Login extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                {this.state.user ? (
                    <div>
                        <AccountCircleIcon className={classes.accountButton} onClick={this.toggleDialog} />
                    </div>
                ) : (
                    <div>
                        <Button color="secondary" variant="contained" onClick={this.toggleDialog}>Login</Button>
                    </div>
                )}


                <Dialog open={this.state.open} onClose={this.toggleDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        {this.state.user ? (
                            <span>Log out</span>
                        ) : (
                            <span>Log in</span>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        {this.state.user ? (
                            <DialogContentText>
                                Hey, {this.state.user.email}.
                            </DialogContentText>
                        ): (
                            <DialogContentText>
                                Please, log in to be able to create and play matches
                            </DialogContentText>
                        )}

                        {!this.state.user && (
                            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.login.bind(this)}>
                                <TextField autoFocus id="email" label="Email" type="email" margin="normal" fullWidth />
                                <TextField id="password" label="Password" type="password" margin="normal" color="white" fullWidth />
                            </form>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleDialog} color="primary">Cancel</Button>
                        {this.state.user ? (
                            <Button onClick={this.logout.bind(this)} color="primary">Logout</Button>
                        ): (
                            <Button onClick={this.login.bind(this)} color="primary">Login</Button>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            user: null
        }
    }

    toggleDialog = () => {
        this.setState({
            open: !this.state.open,
        });
    };

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
            .then(() => {
                this.toggleDialog()
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    logout(e) {
        e.preventDefault();
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.toggleDialog()
            });
    }

}

export default withStyles(styles)(Login);
