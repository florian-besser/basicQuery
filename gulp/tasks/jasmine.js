var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
 
gulp.task('jasmine', ['nodemon'], function () {
    return gulp.src('intTest/*.js')
        .pipe(jasmine());
});