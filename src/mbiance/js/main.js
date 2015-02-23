global.jQuery = $ = require('jquery');
//require('./vendor/respond.min.js'); // A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more)
require('./vendor/jquery.matchHeight-min.js');
//require('./vendor/modernizr-2.8.3.min.js');

// Document Ready
$(document).ready(function() {

	// Avoid console errors
	var avoidConsoleErrors = require('./utils/avoidConsoleErrors');
	avoidConsoleErrors();

	// Simulate N child selector (FIX for IE8)
	var simulateNthChild = require('./utils/simulateNthChild');
	simulateNthChild(".sectorsList", ".sector", "n4_", 4);
	simulateNthChild(".sectorsList", ".sector", "n3_", 3);
	simulateNthChild(".sectorsList", ".sector", "n2_", 2);
	simulateNthChild(".portfolioHighlight", ".portfolioItem", "n4_", 4);
	simulateNthChild(".portfolioHighlight", ".portfolioItem", "n3_", 3);
	simulateNthChild(".portfolioHighlight", ".portfolioItem", "n2_", 2);

	// JSMediaQueries
	var jsMediaQueries = require('./utils/JSMediaQueries');
	jsMediaQueries.init(["TN","SM", "MD", "BG"]); // must be defined in the css file like this on the #JSMediaQueries element

	// Responsive DOM child element move into their parent container depending of the browser size, depends on JSMediaQueries events
    var ResponsiveDOM = require('./utils/ResponsiveDOM');
    var responsiveDOM = new ResponsiveDOM();
    responsiveDOM.init();

    // jQuery MatchHeight plugin
    $("#expertise, #solutions").matchHeight();
	$(".sectorsList .sector").matchHeight();
	$(".portfolioHighlight .portfolioItem").matchHeight();


    // Showcase
    var Showcase = require('./blocs/showcase');
    var scContainer = $('#showcase');
    var showcase = new Showcase(scContainer, scContainer.find('.slide'), scContainer.find('.nav a'));

});

// Document loaded
$(window).load(function() {
 	
});