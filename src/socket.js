// Socket

const socket = require('socket.io');

const database = require('./database');

let io;


function init(server) {
  io = socket.listen(server);
  io.on('connection', connection => console.log(connection));

  database.init(
    value => io.emit('receive', value.val())
  );
}


module.exports = { init };
