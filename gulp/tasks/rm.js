// Move

module.exports = (gulp, runSequence) =>
  gulp.task('rm', callback => runSequence('clean', 'sass', 'js', 'images', 'svg-sprite', 'extras', callback));
