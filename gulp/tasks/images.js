// Images

const imagemin = require('gulp-imagemin');

module.exports = (gulp, paths) => {
  gulp.task('images', () =>
    gulp.src([
      `!${paths.icons}`,
      `${paths.app}${paths.imagePath}`,
    ])
      .pipe(gulp.dest(`${paths.tmp}images`))
  );

  gulp.task('images:dist', () =>
    gulp.src([
      `${paths.tmp}${paths.imagePath}`,
      `!${paths.tmp}${paths.spritesheet}`,
    ])
      .pipe(imagemin())
      .pipe(gulp.dest(`${paths.dist}images`))
  );
};
