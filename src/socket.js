// Socket

const socket = require('socket.io');

let io;


function init(server) {
  io = socket.listen(server);

  io.on('connection', connection =>
    setInterval(() =>
      io.emit('receive', 'http://lorempixel.com/800/800/'),
      3000
    )
  );
}


module.exports = { init };
