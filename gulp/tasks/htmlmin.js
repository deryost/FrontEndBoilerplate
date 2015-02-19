'use strict';
var cfg = require('../config.js');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
 
gulp.task('htmlmin', function() {
  gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(cfg.dist.dir))
});