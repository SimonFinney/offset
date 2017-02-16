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


router.get('/', (request, response) =>
  response.render('views/index.nunjucks', {
    content,
    name,
  })
);


router.get('/receive', (request, response) => {
  const route = request.url
    .replace('/', '');

  database.get(data => {
    const images = util.shuffle(
      Object.keys(data)
        .map(id => data[id])
    );

    response.render('views/receive.nunjucks', {
      images,
      name,
      route,
    });
  });
});


router.post('/submit', upload.single('file'), (request, response) => {
  const src = img.convert(request.file);
  database.create({ src }, () => response.redirect('/'));
});


module.exports = router;
