// Socket

const socket = require('socket.io');

const database = require('./database');

function init(server) {
  const io = socket.listen(server);
  database.init(value => io.emit('receive', value.val()));
}

module.exports = { init };
