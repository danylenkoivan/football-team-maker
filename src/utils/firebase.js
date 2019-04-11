import firebase from 'firebase';

const config = require('./firebase-config/' + process.env.NODE_ENV + '.json');

firebase.initializeApp(config);

export default firebase;