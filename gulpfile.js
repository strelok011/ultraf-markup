'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var bulkSass = require('gulp-sass-bulk-import');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsFiles = './project/src/js/',
    jsDest = './project/production/assets/js';

 
gulp.task('sass', function () {
  gulp.src('./project/src/scss/style.scss')
    .pipe(bulkSass())
    // .pipe(sass().on('error', sass.logError))
    .pipe(
        sass({
            outputStyle: 'compressed',
            includePaths: ['./project/src/scss/components/']
        })
        .on('error', sass.logError)
    )
    .pipe(gulp.dest('./project/production/assets/css/'));
});

gulp.task('pug', function () {
    gulp.src('./project/src/templates/*.pug')
    //   .pipe(bulkSass())
    .pipe(
        pug({
        //   includePaths: ['./project/src/scss/components/']
        }))
    .pipe(gulp.dest('./project/production/'));
});

gulp.task('watch', function () {
  gulp.watch(['./project/src/scss/**/*.scss', './project/src/js/**/*.js', './project/src/**/*.pug'], function(){
    gulp.run('sass', 'scripts', 'pug');
  });
});

gulp.task('assets', function () {
    gulp
        .src('./project/src/fonts/**/*')
        .pipe(gulp.dest('./project/production/assets/fonts'));
    gulp
        .src('./project/src/images/**/*')
        .pipe(gulp.dest('./project/production/assets/images'));
});

gulp.task('scripts', function() {
    return gulp.src([jsFiles +'bin/html5shiv.js', jsFiles +'bin/materialize.js', jsFiles +'scrollfire.js', jsFiles +'global.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest));
});