module.exports = (gulp, paths) =>
  gulp.task('extras', () =>
    paths.extras.forEach(path => {
      const isDir = path.indexOf('/') > -1;
      const src = isDir ? `${paths.app}${path}/**/*` : `${paths.app}${path}`;

      const tmp = isDir ? `${paths.tmp}${path}` : paths.tmp;
      const dist = isDir ? `${paths.dist}${path}` : paths.dist;

      gulp
        .src(src)
        .pipe(gulp.dest(tmp))
        .pipe(gulp.dest(dist));
    })
  );
