// TODO: Document

const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');

module.exports = (gulp, config) => {
  gulp.task('svg-sprite', () =>
    gulp
      .src(config.paths.icons)
      .pipe(svgo())
      .pipe(svgSprite(config.svgSprite))
      .pipe(gulp.dest(`${config.paths.tmp}`))
      .pipe(gulp.dest(`${config.paths.dist}`))
  );
};
