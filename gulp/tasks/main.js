'use strict';
var cfg = require('../config.js');
var gulp = require('gulp');
var colors = require('colors'); // get colors in your node.js console like what
var browserify = require('browserify');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var del = require('del');
var rename = require("gulp-rename");
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var LessPluginAutoPrefix = require('less-plugin-autoprefix'), autoprefixPlugin = new LessPluginAutoPrefix({browsers: cfg.autoprefixerBrowsers});
var os = require("os");

// Log
console.log("hostname: [" + os.hostname().grey.underline + "]" + " (" + "ajouté éventuellements des configs par utilisateur".bold.grey + ")");

// Default --------------------------------------------------------------------
gulp.task("default", ['css', 'js', 'jsLibs', 'watcher'], function(){});

// clear --------------------------------------------------------------------
gulp.task('cleanDist', function () {
	del([cfg.dist.dir]);
});

// Less / CSS --------------------------------------------------------------------
gulp.task('css', function () {
	//
	gulp.src(cfg.src.lessMainFile.path)
		.pipe(sourcemaps.init({loadMaps: true, debug: true}))
		.pipe(less({
			compress: true,
			strictImports: true,
			strictMath: true,
			strictUnits: true,
			plugins: [autoprefixPlugin]
		}))
		.pipe(rename({extname: cfg.dist.cssExtname})) // change extension
		.pipe(sourcemaps.write('./')) // write the source map file at the same place
		.pipe(gulp.dest(cfg.dist.cssDir));
});

// JS validation --------------------------------------------------------------------
gulp.task('jshint', function() {
	gulp.src(cfg.jshintPaths)
		.pipe(jshint({strict: true}))
		//.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('jshint-stylish')) 
		.pipe(jshint.reporter('fail'))
		.on('error', function(){
			console.log(" jshint error !".red);
		})
});

// Javascript --------------------------------------------------------------------
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md	
// http://viget.com/extend/gulp-browserify-starter-faq
gulp.task('js', function() {
	return browserify(cfg.src.jsMainFile.path)
		.bundle()
		.pipe(source(cfg.dist.jsMainFile.name))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify()) // Add transformation tasks to the pipeline here.
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(cfg.dist.jsDir));
});

// JsLibs --------------------------------------------------------------------
gulp.task('jsLibs', function() {
	// cfg.src.jsVendorsFiles
	gulp.src(cfg.src.jsVendorsFiles)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(concat(cfg.dist.jsVendorsFile.name))
		.pipe(sourcemaps.write('./')) // write the source map file at the same place
		.pipe(gulp.dest(cfg.dist.jsVendorsFile.dir))
});


// Watcher --------------------------------------------------------------------
gulp.task('watcher', function () {

	var watcherJS = gulp.watch([cfg.src.jsDir + '/**/*.js', "!" + cfg.src.jsDir + '/**/vendor/*.js'], ['js']);
	watcherJS.on('change', function(event) {
		console.log('Js File '+ event.path.green +' was '+ event.type.bgGreen.bold);
	});

	var watcherJS = gulp.watch(cfg.src.jsDir + '/**/vendor/*.js', ['jsLibs']);
	watcherJS.on('change', function(event) {
		console.log('Js [vendors] File '+ event.path.green +' was '+ event.type.bgGreen.bold);
	});

	var watcherCSS = gulp.watch(cfg.src.lessDir + '/**/*.less', ['css']);
	watcherCSS.on('change', function(event) {
		console.log('Css File '+ event.path.green +' was '+ event.type.bgGreen.bold);
	});

	livereload.listen();
  	gulp.watch(cfg.livereloadPaths).on('change', livereload.changed);
});
