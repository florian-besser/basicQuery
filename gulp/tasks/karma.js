var gulp = require('gulp');
var karma = require('gulp-karma');
 
gulp.task('test', ['bower'], function() {
  // Be sure to return the stream 
  return gulp.src([])   //Defined in karma.conf.js
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero 
      throw err;
    });
});

gulp.task('testWatch', ['bower'], function() {
  // Be sure to return the stream 
  return gulp.src([])   //Defined in karma.conf.js
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero 
      throw err;
    });
});