// Database

// TODO: Comments
const firebase = require('firebase');

const maximumEntries = 16;
const scheduledInterval = 3600000; // Every hour

const firebaseConfiguration = {
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

const firebaseApp = firebase.initializeApp(firebaseConfiguration);

firebase
  .auth()
  .signInWithEmailAndPassword(
    process.env.FIREBASE_EMAIL,
    process.env.FIREBASE_PASSWORD
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
