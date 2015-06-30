'use strict';
require('colors'); // get colors in your node.js console like what
var cfg = require('./gulp-config.js');
var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var rename = require("gulp-rename");
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var pngquant = require('imagemin-pngquant');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var LessPluginAutoPrefix = require('less-plugin-autoprefix'), autoprefixPlugin = new LessPluginAutoPrefix({browsers: cfg.autoprefixerBrowsers});
var beeper = require('beeper');
var os = require("os");

// Log
console.log("hostname: [" + os.hostname().grey.underline + "]" );

// Run --------------------------------------------------------------------
gulp.task("run", ['html', 'img', 'copyfonts', 'css', 'js', 'js:libs', 'watch'], function(){});

// clean --------------------------------------------------------------------
gulp.task('clean', function () {
	del([cfg.dist.dir]);
});

// Images --------------------------------------------------------------------
gulp.task('img', function () {
	return gulp.src(cfg.src.imgDir + '/**/*.*')
		.pipe(plumber({errorHandler: handleErrors}))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(cfg.dist.imgDir));
});

// Copy fonts --------------------------------------------------------------------
gulp.task('copyfonts', function() {
	gulp.src(cfg.src.fontsDir + '/**/*.{ttf,woff,eof,eot,svg}')
	.pipe(plumber({errorHandler: handleErrors}))
	.pipe(gulp.dest(cfg.dist.fontsDir));
});

// Less / CSS --------------------------------------------------------------------
gulp.task('css', function () {
	//
	gulp.src(cfg.src.lessMainFile.path)
		.pipe(plumber({errorHandler: handleErrors}))
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

// html --------------------------------------------------------------------
gulp.task('html', function() {
  gulp.src(cfg.src.htmlDir + '/**/*.html')
  	.pipe(plumber({errorHandler: handleErrors}))
    .pipe(htmlmin({collapseWhitespace: true, removeComments:true}))
    .pipe(gulp.dest(cfg.dist.htmlDir));
});

// JS validation --------------------------------------------------------------------
gulp.task('js:hint', function() {
	gulp.src(cfg.jshintPaths)
		.pipe(plumber({errorHandler: handleErrors}))
		.pipe(jshint(cfg.jsHintOptions))
		//.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('jshint-stylish')) 
		.pipe(jshint.reporter('fail'))
		.on('error', function(){
			console.log(" jshint error !".red);
		});
});

// Javascript --------------------------------------------------------------------
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/	
gulp.task('js', ['js:hint'], function () {
	browserify(cfg.src.jsMainFile.path)
		.bundle()
		//.pipe(plumber({errorHandler: handleErrors}))
		.on('error', handleErrors)
		.pipe(source(cfg.src.jsMainFile.name))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(streamify(uglify()))
		.pipe(rename({extname: cfg.dist.jsExtname})) // change extension
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(cfg.dist.jsDir));
});

// js:libs --------------------------------------------------------------------
gulp.task('js:libs', function() {
	// cfg.src.jsVendorsFiles
	gulp.src(cfg.src.jsVendorsFiles)
		.pipe(plumber({errorHandler: handleErrors}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(concat(cfg.dist.jsVendorsFile.name))
		.pipe(sourcemaps.write('./')) // write the source map file at the same place
		.pipe(gulp.dest(cfg.dist.jsVendorsFile.dir));
});


// Watch --------------------------------------------------------------------
gulp.task('watch', function () {

	// Watch HTML
	var watcherHTML = gulp.watch(cfg.src.htmlDir + '/**/*.html', ['html']);
	watcherHTML.on('change', function(event) {
		console.log('HTML File '+ event.path.green +' was '+ event.type.bgGreen.bold);
	});

	// Watch JS
	var watcherJS = gulp.watch([cfg.src.jsDir + '/**/*.js', "!" + cfg.src.jsDir + '/**/vendor/*.js'], ['js']);
	watcherJS.on('change', function(event) {
		console.log('Js File '+ event.path.green +' was '+ event.type.bgGreen.bold);
	});

	// Watch JS vendors
	var watcherJSVendors = gulp.watch(cfg.src.jsDir + '/**/vendor/*.js', ['js:libs']);
	watcherJSVendors.on('change', function(event) {
		console.log('Js [vendors] File '+ event.path.green +' was '+ event.type.bgGreen.bold);
	});

	// Watch Fonts
	var watcherFonts = gulp.watch(cfg.src.fontsDir + '/**/*.{ttf,woff,eof,eot,svg}', ['copyfonts']);
	watcherFonts.on('change', function(event) {
		console.log('Fonts File '+ event.path.green +' was '+ event.type.bgGreen.bold);
	});

	// Watch CSS
	var watcherCSS = gulp.watch(cfg.src.lessDir + '/**/*.less', ['css']);
	watcherCSS.on('change', function(event) {
		console.log('Css File '+ event.path.green +' was '+ event.type.bgGreen.bold);
	});

	// Watch Images
	var watcherIMG = gulp.watch(cfg.src.imgDir + '/**/*.*', ['img']);
	watcherIMG.on('change', function(event) {
		console.log('Image File '+ event.path.green +' was '+ event.type.bgGreen.bold);
	});

	livereload.listen();
  	gulp.watch(cfg.livereloadPaths).on('change', function(event) {
		console.log('livereload.changed');
		livereload.changed(event);
	});
});


// Plumber/Errors catch function --------------------------------------------------------------------
function handleErrors(err) {
	/*jshint validthis:true */
	var plugin = (err.plugin) ? "[" +err.plugin.toString().red + "] " : '';
	console.log(plugin + err.message.toString().bgRed);
	beeper('*-*');
	this.emit('end');
}