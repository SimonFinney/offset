// Socket

const socket = require('socket.io');

let io;


function time(io) {
  io.emit(
    'time',
    { time: new Date().toJSON() }
  );
}


function init(server) {
  io = socket.listen(server);

  io.on('connection', socket => {
    socket.emit(
      'server',
      {
        id: socket.id,
        message: 'Hello Client!',
      }
    );

    socket.on('client', console.log);
  });

  setInterval(() => time(io), 3000);
}


module.exports = { init };
