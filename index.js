// TODO: Document

const compression = require('compression');
const dotenv = require('dotenv');
const express = require('express');
const expressBeautify = require('express-beautify');
const nunjucks = require('nunjucks');

dotenv.load();

const app = express();

const serverDirectory = app.get('env') === 'development' ? '.tmp' : 'dist';

app.use(
  expressBeautify.minify({
    htmlMinifier: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
    },
  })
);

app.use(express.static(`${__dirname}/${serverDirectory}/`));

app.use(compression());

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});

app.host = app.set('host', process.env.HOST || 'http://localhost');
app.port = app.set('port', process.env.PORT || 8080);

const port = app.get('port');

const socket = require('./src/socket');
require('./src/router')(app);

const server = app.listen(port, () => {
  console.log(`${app.get('host')}:${port}`);
  socket.init(server);
});
