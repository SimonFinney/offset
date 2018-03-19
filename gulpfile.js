// TODO: Document

const browserSync = require('browser-sync');
const config = require('./gulp/config');
const gulp = require('gulp');
const runSequence = require('run-sequence');

require('./gulp/tasks/browser-sync')(gulp, browserSync, config.browserSync);
require('./gulp/tasks/build')(gulp, runSequence);
require('./gulp/tasks/clean')(gulp, config.paths);
require('./gulp/tasks/default')(gulp, runSequence, config.paths);
require('./gulp/tasks/eslint')(gulp, config.paths.js);
require('./gulp/tasks/images')(gulp, config.paths);
require('./gulp/tasks/js')(gulp, config);
require('./gulp/tasks/minify')(gulp, config.paths);
require('./gulp/tasks/rm')(gulp, runSequence);
require('./gulp/tasks/nodemon')(gulp, config.nodemon);
require('./gulp/tasks/sass')(gulp, browserSync, config);
require('./gulp/tasks/svg-sprite')(gulp, config);
require('./gulp/tasks/watch')(gulp, runSequence, config.paths);
