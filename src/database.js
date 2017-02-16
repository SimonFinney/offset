// Database

// TODO: Comments
const firebase = require('firebase');

const util = require('./util');

const firebaseConfiguration = {
  apiKey: util.getConfiguration('firebaseApiKey'),
  databaseURL: util.getConfiguration('firebaseDatabaseURL'),
};

const firebaseApp = firebase.initializeApp(firebaseConfiguration);

firebase.auth().signInWithEmailAndPassword(
  util.getConfiguration('firebaseEmail'),
  util.getConfiguration('firebasePassword')
);

const database = firebaseApp.database();
const data = database.ref('data');


function create(newData, callback) {
  data.push(newData)
    .then(callback);
}


function getValue(databaseReference, callback) {
  databaseReference.once('value')
    .then(value =>
      callback(value.val())
    );
}


function get(callback) {
  getValue(data, callback);
}


function init(callback) {
  data.on('child_added', callback);
}


module.exports = {
  create,
  get,
  init,
};
