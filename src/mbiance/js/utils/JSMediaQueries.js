"use strict";

$ = require('jquery');

// JSMediaQueries class
function JSMediaQueries() {
	this.cssMediaQuery;
	this.cssBreakPointsNames;
	this.currentBreakPointName;
}

// Init the module
JSMediaQueries.prototype.init = function(breakPoints) {
	this.cssBreakPointsNames = breakPoints;
	
	this.cssMediaQuery = $('<div id="JSMediaQueries"></div>'); // This must be style correctly in your css
    $("body").append(this.cssMediaQuery);
    
    $(window).on("resize.JSMediaQueries", $.proxy(this.onChange, this));
    this.onChange();
};

// On Change
JSMediaQueries.prototype.onChange = function() {
	var index = parseInt(this.cssMediaQuery.css("width"));
	var oldBreakPointName = this.currentBreakPointName;
	this.currentBreakPointName = this.cssBreakPointsNames[index];
	if(this.currentBreakPointName && oldBreakPointName != this.currentBreakPointName){
		$(document).trigger("JSMediaQueries.changeState", [this.currentBreakPointName]); // Trigger a global event
	}
};

module.exports = JSMediaQueries;