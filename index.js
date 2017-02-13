const fs = require('fs');
const http = require('http');

const index = fs.readFileSync(`${__dirname}/app/index.html`);

// Emits time
function time() {
  io.emit(
    'time',
    { time: new Date().toJSON() }
  );
}


// Send index.html to all requests
var server = http.createServer((request, response) => {
  response.writeHead(
    200,
    {'Content-Type': 'text/html' }
  );
  response.end(index);
});

// Socket.io server listens to our app
const io = require('socket.io').listen(server);

// Emit connection message
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

server.listen(3000);

// Emits time every 3 seconds
setInterval(time, 3000);

module.exports = { server };
