var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

/**
 * Start rsync task
 */
gulp.task('nodemon', ['bower'], function () {
  nodemon()
});