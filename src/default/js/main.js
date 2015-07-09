"use strict";

var $ = require('jquery');
require('matchHeight');
require('modernizr');
require('respond'); // A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more)
//var echo = require('./vendor/echo.js');

// Document Ready
$(document).ready(function() {

	// Avoid console errors
	var avoidConsoleErrors = require('./utils/avoidConsoleErrors');
	avoidConsoleErrors();

	// Simulate N child selector
	var simulateNthChild = require('./utils/simulateNthChild');
	simulateNthChild("table.simulateNthChild", "tr", "n", 3);

	// Breakpoints
	var breakpoints = require('./utils/Breakpoints');
	breakpoints.init(["TN", "SM", "MD", "BG"]); // must be defined in the css file like this on the #breakpoints element

	// Responsive DOM child element move into their parent container depending of the browser size, depends on JSMediaQueries events
    var ResponsiveDOM = require('./utils/ResponsiveDOM');
    new ResponsiveDOM();

     // jQuery MatchHeight plugin
    $("#matchHeight .match").matchHeight(); 
});

/*
// Document loaded
$(window).load(function() {
 	
});
*/