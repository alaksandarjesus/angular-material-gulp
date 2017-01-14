var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');

var browserSync = require('browser-sync').create();
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('styles', function() {
    pump([
        gulp.src(['app/styles/styles.less']),
        less(),
        concat('style.min.css'),
        minifyCSS(),
        gulp.dest('build/css'),
        browserSync.stream()

    ])
});
gulp.task('libs-css', function() {
    pump([
        gulp.src('bower_components/**/*.min.css'),
        concat('libs.min.css'),
        minifyCSS(),
        gulp.dest('build/css')

    ]);
});

gulp.task('libs-js', function() {
    pump([
        gulp.src([
            'bower_components/moment/min/moment.min.js',
            'bower_components/lodash/dist/lodash.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-messages/angular-messages.min.js',
            'bower_components/angular-aria/angular-aria.min.js',
            'bower_components/angular-material/angular-material.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js'
        ]),


        concat('libs.min.js'),
        gulp.dest('build/js'),
    ])
});

gulp.task('scripts', function() {
    pump([
        gulp.src(['app/**/*.js']),
        ngAnnotate(),
        concat('scripts.min.js'),
        uglify(),
        gulp.dest('build/js'),
        browserSync.stream()

    ]);
});

gulp.task('copy', function() {
    gulp.src('./bower_components/font-awesome/fonts/*.*')
        .pipe(gulp.dest('build/fonts'));
});





var gulp = require('gulp');



gulp.task('serve', ['styles', 'scripts', 'libs-css', 'libs-js', 'copy'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("app/**/*.less", ['styles']);
    gulp.watch("app/**/*.js", ['scripts']);
    gulp.watch(["app/*.html", "app/**/*.html"]).on('change', browserSync.reload);
});