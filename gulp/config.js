var cfg = {};

cfg.src = {};
cfg.src.dir = "./src/mbiance/";
cfg.src.jsDir = cfg.src.dir + "js/";
cfg.src.imgDir = cfg.src.dir + "img/";
cfg.src.cssDir = cfg.src.dir + "css/";
cfg.src.lessDir = cfg.src.dir + "less/";
cfg.src.lessMainFile = {};
cfg.src.lessMainFile.name = "main.less";
cfg.src.lessMainFile.path = cfg.src.lessDir + cfg.src.lessMainFile.name ;
cfg.src.jsMainFile = {};
cfg.src.jsMainFile.name = "main.js";
cfg.src.jsMainFile.path = cfg.src.jsDir + cfg.src.jsMainFile.name;
cfg.src.jsVendorsFiles = [cfg.src.jsDir + 'vendor/html5shiv.min.js', cfg.src.jsDir + 'vendor/modernizr-2.8.3.min.js'];

cfg.dist = {};
cfg.dist.dir = "./dist/";
cfg.dist.jsDir = cfg.dist.dir + "js/";
cfg.dist.imgDir = cfg.dist.dir + "img/";
cfg.dist.cssDir = cfg.dist.dir + "css/";
cfg.dist.cssExtname = ".min.css";
cfg.dist.jsMainFile = {};
cfg.dist.jsMainFile.name = "main.min.js";
cfg.dist.jsMainFile.path = cfg.dist.jsDir + cfg.dist.jsMainFile.name;
cfg.dist.jsVendorsFile = {};
cfg.dist.jsVendorsFile.name =  'libs.min.js';
cfg.dist.jsVendorsFile.dir = cfg.dist.jsDir + 'vendor/';
cfg.dist.jsVendorsFile.path = cfg.dist.jsDir + cfg.dist.jsVendorsFile.name;

// Check the compile files only
cfg.livereloadPaths = ['./**/*.html', cfg.dist.jsDir + '**/*', cfg.dist.cssDir + '**/*'];

cfg.jshintPaths = ['!' + cfg.src.jsDir + 'vendor/*.js', cfg.src.jsDir + '**/*.js'],

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