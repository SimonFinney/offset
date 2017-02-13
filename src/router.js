// TODO: Comments

const express = require('express');

const name = require('../package.json').name;
const util = require('./util');

const router = express.Router();

router.get('/', (request, response) => {
  response.render('views/index.nunjucks', { name });
});

router.get('/success', (request, response) => { });

router.post('/submit', (request, response) => { });

module.exports = { router };
