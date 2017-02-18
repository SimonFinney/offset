// Module configuration

// Paths
const paths = new (function paths() {
  this.app = 'app/';
  this.dist = 'dist/';

  this.extras = [
    'fonts/',
    'images/',
    'manifest.json',
  ];

  this.js = `${this.app}js/`;
  this.scss = `${this.app}scss/**/*.scss`;
  this.tmp = '.tmp/';
});


// Configuration
const browsers = [
  '> 5%',
];

const autoprefixer = { browsers };

const browserSync = {
  notify: false,
  proxy: {
    target: 'http://localhost:8080',
    ws: true,
  },
};

const nodemon = {
  ext: 'js md nunjucks',
  script: 'index.js',
};

const webpack = {
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};

module.exports = {
  paths,
  autoprefixer,
  browserSync,
  nodemon,
  webpack,
};
