// TODO: Document

const compression = require('compression');
const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');

dotenv.load();

const router = require('./src/router');
const socket = require('./src/socket');

const app = express();

const serverDirectory = app.get('env') === 'development' ? '.tmp' : 'dist';
const staticAssets = express.static(`${__dirname}/${serverDirectory}/`);

app.use(staticAssets);

app.use('/', router);

app.use(compression());

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});

app.host = app.set('host', process.env.HOST || 'http://localhost');
app.port = app.set('port', process.env.PORT || 8080);

const port = app.get('port');

const server = app.listen(port, () => {
  console.log(`${app.get('host')}:${port}`);
  socket.init(server);
});
