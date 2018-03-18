// TODO: Document

const express = require('express');
const fs = require('fs');
const multer = require('multer');
const yaml = require('js-yaml');

const database = require('./database');
const img = require('./img');
const util = require('./util');

const content = yaml.safeLoad(fs.readFileSync('content/content.yml', 'utf-8'));

const name = require('../package.json').name;
const router = express.Router();
const upload = multer();

function getRoute(request) {
  return request.url.replace('/', '');
}

router.get('/', (request, response) => {
  const route = getRoute(request);

  content.questions = util.shuffle(content.questions);

  response.render('views/index.nunjucks', {
    content,
    name,
    route,
  });
});

router.get('/receive', (request, response) => {
  const route = getRoute(request);

  database.get(data => {
    const images = data && Object.keys(data).map(id => data[id]);

    response.render('views/receive.nunjucks', {
      images,
      name,
      route,
    });
  });
});

router.post('/submit', upload.single('file'), (request, response) => {
  const modifier = request.body.modifier;
  const src = img.convert(request.file);

  const data = {
    modifier,
    src,
  };

  database.create(data, () => response.redirect('/'));
});

module.exports = router;
