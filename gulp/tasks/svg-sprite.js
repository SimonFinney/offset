// SVG sprite sheet
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');

module.exports = (gulp, config) => {
  gulp.task('svg-sprite', () =>
    gulp.src(config.paths.icons)
      .pipe(svgo()) // Optimise icons and strip out unwanted attributes
      .pipe(svgSprite(config.svgSprite)) // Creates the sprite sheet
      .pipe(gulp.dest(`${config.paths.tmp}`))
      .pipe(gulp.dest(`${config.paths.dist}`))
  );
};
