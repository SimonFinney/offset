module.exports = (gulp, paths) => {
  gulp.task('fonts', () =>
    gulp.src(`${paths.app}${paths.fonts}**/*`)
      .pipe(gulp.dest(`${paths.tmp}${paths.fonts}`))
      .pipe(gulp.dest(`${paths.dist}${paths.fonts}`))
  );
};
