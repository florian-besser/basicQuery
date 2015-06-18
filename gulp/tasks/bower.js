var gulp = require('gulp');
var bower = require('gulp-bower');
 
gulp.task('bowerInstall', function () {
    return bower();
});

gulp.task('moveBootstrap', ['bowerInstall'], function () {
    return gulp.src(['bower_components/bootstrap/dist/**/*']).pipe(gulp.dest('public/bootstrap'));
});

gulp.task('moveD3', ['bowerInstall'], function () {
    return gulp.src(['bower_components/d3/d3.js']).pipe(gulp.dest('public/d3'));
});

gulp.task('moveJQuery', ['bowerInstall'], function () {
    return gulp.src(['bower_components/jquery/dist/**/*']).pipe(gulp.dest('public/jquery'));
});

gulp.task('moveJasmine', ['bowerInstall'], function () {
    return gulp.src(['bower_components/jasmine/lib/**/*']).pipe(gulp.dest('test-lib/jasmine'));
});

gulp.task('moveJasmineJQuery', ['bowerInstall'], function () {
    return gulp.src(['bower_components/jasmine-jquery/lib/*']).pipe(gulp.dest('test-lib/jasmine-jquery'));
});

gulp.task('moveJasmineAjax', ['bowerInstall'], function () {
    return gulp.src(['bower_components/jasmine-ajax/lib/**/*']).pipe(gulp.dest('test-lib/jasmine-ajax'));
});

gulp.task('bower', ['moveBootstrap', 'moveD3', 'moveJQuery', 'moveJasmineJQuery', 'moveJasmine', 'moveJasmineAjax']);