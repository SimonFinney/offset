// Database

// TODO: Comments
const firebase = require('firebase');

const util = require('./util');

const maximumEntries = 16;
const scheduledInterval = 3600000; // Every hour

const firebaseConfiguration = {
  apiKey: util.getConfiguration('firebaseApiKey'),
  databaseURL: util.getConfiguration('firebaseDatabaseURL'),
};

const firebaseApp = firebase.initializeApp(firebaseConfiguration);

firebase
  .auth()
  .signInWithEmailAndPassword(
    util.getConfiguration('firebaseEmail'),
    util.getConfiguration('firebasePassword')
  );

const database = firebaseApp.database();
const data = database.ref('data');

function create(newData, callback) {
  data.push(newData).then(callback);
}

function get(callback, limit = maximumEntries) {
  data
    .limitToLast(limit)
    .once('value')
    .then(value => callback(value.val()));
}

function clean() {
  data.once('value', value => {
    if (value.numChildren() > maximumEntries) {
      let childCount = 0;
      value.forEach(
        child =>
          ++childCount <= value.numChildren() - maximumEntries
            ? data.child(child.key).remove()
            : null
      );
    }
  });
}

function init(callback) {
  data.on('child_added', callback);
  setInterval(clean, scheduledInterval);
}

module.exports = {
  create,
  get,
  init,
};
