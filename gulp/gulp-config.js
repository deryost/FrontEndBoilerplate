// Create config object
var cfg = {};

// CSS preprocessors
cfg.cssPreprocessors = 'sass'; // support 'less' os 'sass'

// Sub-tasks to run for default task
cfg.defaultsTask = ['html', 'img', 'copyfonts', 'css', 'js', 'js:libs', 'watch'];

// Source 
cfg.src = {};
cfg.src.dir 				= "./src/default/";
cfg.src.htmlDir 			= cfg.src.dir; // same as base
cfg.src.jsDir 				= cfg.src.dir + "js/";
cfg.src.fontsDir 			= cfg.src.dir + "fonts/";
cfg.src.imgDir 				= cfg.src.dir + "img/";
cfg.src.cssDir 				= cfg.src.dir + "css/";
cfg.src.lessDir 			= cfg.src.dir + "less/";
cfg.src.sassDir 			= cfg.src.dir + "sass/";
cfg.src.lessMainFile 		= {};
cfg.src.lessMainFile.name 	= "main.less";
cfg.src.lessMainFile.path 	= cfg.src.lessDir + cfg.src.lessMainFile.name ;
cfg.src.jsMainFile 			= {};
cfg.src.jsMainFile.name 	= "main.js"; // Main javascript file
cfg.src.jsMainFile.path 	= cfg.src.jsDir + cfg.src.jsMainFile.name;
cfg.src.jsVendorsFiles 		= [];

// Distribution
cfg.dist = {};
cfg.dist.dir = "./dist/";
cfg.dist.htmlDir = cfg.dist.dir; // same as base
cfg.dist.jsDir = cfg.dist.dir + "js/";
cfg.dist.fontsDir = cfg.dist.dir + "fonts/";
cfg.dist.imgDir = cfg.dist.dir + "img/";
cfg.dist.cssDir = cfg.dist.dir + "css/";
cfg.dist.cssExtname = ".min.css"; // css extension names
cfg.dist.jsExtname = ".min.js"; // css extension names
cfg.dist.jsMainFile = {};
cfg.dist.jsMainFile.name = "main.min.js";
cfg.dist.jsMainFile.path = cfg.dist.jsDir + cfg.dist.jsMainFile.name;
cfg.dist.jsVendorsFile = {};
cfg.dist.jsVendorsFile.name =  'libs.min.js';
cfg.dist.jsVendorsFile.dir = cfg.dist.jsDir + 'vendor/';
cfg.dist.jsVendorsFile.path = cfg.dist.jsDir + cfg.dist.jsVendorsFile.name;

// Check the compile files only
cfg.livereloadPaths = [
						'./**/*.html', 
						cfg.dist.jsDir + '**/*', 
						cfg.dist.cssDir + '**/*', 
						cfg.dist.imgDir + '**/*'
					  ];

// JS HINT
cfg.jshintPaths = [
					"./gulp/**/*.js", 
					cfg.src.jsDir + '**/*.js', 
					'!' + cfg.src.jsDir + 'vendor/**/*.js'
				  ]; 
// https://github.com/jshint/jshint/blob/master/examples/.jshintrc
cfg.jsHintOptions = {
	"devel" : true, // Development/debugging (alert, confirm, etc)
	"browserify" : true, // Browserify (node.js code in the browser)
	"camelcase" : true, // true: Identifiers must be in camelCase
	"maxerr" : 50, // {int} Maximum error before stopping
	"indent" : 4,  // {int} Number of spaces to use for indentation
	"newcap" : false, // true: Require capitalization of all constructor functions e.g. `new F()`
	"freeze" : true, // true: prohibits overwriting prototypes of native objects such as Array, Date etc.
	"latedef" : false, // true: Require variables/functions to be defined before being used
	"unused" : true, // true: Require all defined variables be used
	"predef" : [], // additional predefined global variables
	"strict" : true, // true: Requires all functions run in ES5 Strict Mode
	"immed" : true, // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
	"maxlen" : false // {int} Max number of characters per line
};

cfg.autoprefixerBrowsers = [
	'ie >= 8',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

module.exports = cfg;