// Server

// TODO: Comments
const compression = require('compression');
const dotenv = require('dotenv');
const express = require('express');
const minifyHtml = require('express-minify-html');
const nunjucks = require('nunjucks');

dotenv.load();

const router = require('./src/router');
const socket = require('./src/socket');
const util = require('./src/util');

const app = express();

const serverDirectory = util.isDebug() ? '.tmp' : 'dist';
const staticAssets = express.static(`${__dirname}/${serverDirectory}/`);

app.use(staticAssets);

app.use('/', router);

app.use(compression());

app.use(
  minifyHtml({
    htmlMinifier: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
    },
  })
);

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});

app.host = app.set('host', process.env.HOST || 'http://localhost');
app.port = app.set('port', process.env.PORT || 8080);

const port = app.get('port');

const server = app.listen(port, () => {
  app.address = `${app.get('host')}:${port}`;
  console.log(`Listening at ${app.address}`);
});

socket.init(server);
