// Socket

const socket = require('socket.io');

let io;


function init(server) {
  io = socket.listen(server);

  io.on('connection', connection =>
    connection.on('send', text =>
      io.emit(
        'receive',
        text
      )
    )
  );
}


module.exports = { init };
