// TODO: Comments

const express = require('express');
const frontMatter = require('front-matter');
const fs = require('fs');
const marked = require('marked');
const multer = require('multer');

const database = require('./database');
const img = require('./img');
const util = require('./util');

const content = frontMatter(
  fs.readFileSync('content/questions.md', 'utf-8')
);
content.body = marked(content.body);

const name = require('../package.json').name;
const router = express.Router();
const upload = multer();


function getRoute(request) {
  return request.url
    .replace('/', '');
}


router.get('/', (request, response) => {
  const route = getRoute(request);

  content.attributes.questions = util.shuffle(content.attributes.questions);

  response.render('views/index.nunjucks', {
    content,
    name,
    route,
  });
});


router.get('/receive', (request, response) => {
  const route = getRoute(request);

  database.get(data => {
    const images = Object.keys(data)
      .map(id => data[id]);

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
