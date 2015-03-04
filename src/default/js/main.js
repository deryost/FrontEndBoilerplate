"use strict";

global.jQuery = global.$ = require('jquery');

//require('./vendor/respond.min.js'); // A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more)
require('./vendor/jquery.matchHeight-min.js');
//require('./vendor/modernizr-2.8.3.min.js');

// Document Ready
$(document).ready(function() {

	// Avoid console errors
	var avoidConsoleErrors = require('./utils/avoidConsoleErrors');
	avoidConsoleErrors();

	// Simulate N child selector
	var simulateNthChild = require('./utils/simulateNthChild');
	simulateNthChild("table.simulateNthChild", "tr", "n", 3);

	// JSMediaQueries
	var jsMediaQueries = require('./utils/JSMediaQueries');
	jsMediaQueries.init(["TN","SM", "MD", "BG"]); // must be defined in the css file like this on the #JSMediaQueries element

	// Responsive DOM child element move into their parent container depending of the browser size, depends on JSMediaQueries events
    var ResponsiveDOM = require('./utils/ResponsiveDOM');
    var responsiveDOM = new ResponsiveDOM();
    responsiveDOM.init();

     // jQuery MatchHeight plugin
    $("#matchHeight .match").matchHeight(); 
});

// Document loaded
$(window).load(function() {
 	
});