"use strict";

$ = require('jquery');

// JSMediaQueries class
function JSMediaQueries() {
	this.cssMediaQuery;
	this.cssBreakPointsName;
}

// Init the module
JSMediaQueries.prototype.init = function(breakPoints) {
	this.cssBreakPointsName = breakPoints;
	
	this.cssMediaQuery = $('<div id="JSMediaQueries"></div>'); // This must be style correctly in your css
    $("body").append(this.cssMediaQuery);
    
    $(window).on("resize.JSMediaQueries", $.proxy(this.onChange, this));
    this.onChange();
};

// On Change
JSMediaQueries.prototype.onChange = function() {
	var index = parseInt(this.cssMediaQuery.css("width"));
	var breakPointName = this.cssBreakPointsName[index];
	if(breakPointName){
		$(document).trigger("JSMediaQueries.changeState", [breakPointName]); // Trigger a global event
	}
};

module.exports = JSMediaQueries;