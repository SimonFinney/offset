// Utilities
const express = require('express');
const server = express();


function getConfiguration(configurationVariable) {
  return (
    process.env[configurationVariable] || require('../USER-DEFINED.json')[configurationVariable]
  );
}


function getDatetime() {
  return (+ new Date);
}


function isDebug() {
  return (server.get('env') === 'development');
}


function getMaxAge() {
  return (isDebug() ? 180000 : 1200000);
}


function shuffle(arrayToShuffle) {
  const array = arrayToShuffle;

  let i = 0;
  let temporaryVariable = null;

  array.forEach(
    (arrayItem, index) => {
      i = Math.floor(
        (Math.random() * (index + 1))
      );

      temporaryVariable = array[index];
      array[index] = array[i];
      array[i] = temporaryVariable;
    }
  );

  return array;
}


module.exports = {
  getConfiguration,
  getDatetime,
  getMaxAge,
  isDebug,
  shuffle,
};
