// Sockets

const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const port = 8081;
const server = http.Server(app);

const io = socket(server);
server.listen(port);


function time() {
  io.emit(
    'time',
    { time: new Date().toJSON() }
  );
}


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


setInterval(time, 3000);
