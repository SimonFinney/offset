// TODO: Comments

const express = require('express');
const multer = require('multer');

const database = require('./database');
const img = require('./img');
const util = require('./util');

const name = require('../package.json').name;
const router = express.Router();
const upload = multer();


router.get('/', (request, response) =>
  response.render('views/index.nunjucks', { name })
);


router.get('/receive', (request, response) => {
  const route = request.url
    .replace('/', '');

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
  const src = img.convert(request.file);
  database.create({ src }, () => response.redirect('/'));
});


module.exports = router;
