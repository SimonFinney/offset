// TODO: Document

module.exports = (gulp, runSequence) =>
  gulp.task('build', callback =>
    runSequence('rm', 'minify', 'images:dist', callback)
  );
