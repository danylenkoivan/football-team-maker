import firebase from 'firebase';

const config = require('./firebase-config/dev.json');

firebase.initializeApp(config);

export default firebase;