var gulp = require('gulp');
var bower = require('gulp-bower');
 
gulp.task('bowerInstall', function () {
    return bower();
});

gulp.task('moveBootstrap', ['bowerInstall'], function () {
    return gulp.src(['bower_components/bootstrap/dist/**/*']).pipe(gulp.dest('public/bootstrap'));
});

gulp.task('moveJQuery', ['bowerInstall'], function () {
    return gulp.src(['bower_components/jquery/dist/**/*']).pipe(gulp.dest('public/jquery'));
});

gulp.task('bower', ['moveBootstrap', 'moveJQuery']);