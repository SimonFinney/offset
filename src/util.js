// Utilities
const express = require('express');
const server = express();


function getConfiguration(configurationVariable) {
  return (
    process.env[configurationVariable] ?
      process.env[configurationVariable] :
      require('../USER-DEFINED.json')[configurationVariable]
  );
}


function isDebug() {
  return (server.get('env') === 'development');
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
  isDebug,
  shuffle,
};
