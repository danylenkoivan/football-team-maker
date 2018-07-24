import firebase from 'firebase';

const config = require('./firebase-config/live.json');

firebase.initializeApp(config);

export default firebase;