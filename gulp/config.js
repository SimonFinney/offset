// Module configuration

// Paths
const spritesheet = 'sprite.svg';

const paths = new function paths() {
  this.app = 'app/';
  this.dist = 'dist/';

  this.extras = ['fonts/', 'manifest.json'];

  this.images = 'images/';
  this.icons = `${this.app}${this.images}/icons/**/*`;

  const imageSuffix = `${this.images}**`;
  this.imagePath = `${imageSuffix}/*.*`;

  this.js = `${this.app}js/`;
  this.scss = `${this.app}scss/**/*.scss`;
  this.spritesheet = `${imageSuffix}/${spritesheet}`;
  this.tmp = '.tmp/';
}();

// Configuration
const browsers = ['> 5%'];

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

const svgSprite = {
  mode: {
    symbol: {
      bust: false, // Prevents cache-busting suffix
      dest: './',
      sprite: `${paths.images}${spritesheet}`,
    },
  },
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
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['env'],
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
  svgSprite,
  webpack,
};
