// TODO: Document

module.exports = (gulp, runSequence, paths) =>
  gulp.task('watch', () => {
    gulp.watch(['templates/**/*', 'content/**/*'], () =>
      runSequence('bs-reload')
    );

    gulp.watch(`${paths.app}${paths.imagePath}`, () =>
      runSequence('images', 'bs-reload')
    );
    gulp.watch(paths.icons, () => runSequence('svg-sprite', 'bs-reload'));
    gulp.watch(`${paths.js}**`, () => runSequence('eslint', 'js', 'bs-reload'));
    gulp.watch(paths.scss, ['sass']);
  });
