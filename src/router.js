// TODO: Comments

const express = require('express');

const name = require('../package.json').name;
const util = require('./util');

const router = express.Router();


router.get('/', (request, response) =>
  response.render('views/index.nunjucks', { name })
);


router.get('/receive', (request, response) => {
  const route = request.url
    .replace('/', '');

  response.render('views/receive.nunjucks', {
    name,
    route,
  });
});


router.post('/post', (request, response) => { });

module.exports = { router };
