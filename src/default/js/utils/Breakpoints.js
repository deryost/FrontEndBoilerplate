"use strict";

var util = require("util");
var EventEmitter = require("events").EventEmitter;
//var $ = require('jquery');

// Breakpoints class
function Breakpoints() {
	EventEmitter.call(this);
	this.cssMediaQuery = null;
	this.cssBreakPointsNames = null;
	this.currentBreakPointName = null;
}

// Inherit the EventEmitter
util.inherits(Breakpoints, EventEmitter);

// Init the module
Breakpoints.prototype.init = function(breakPoints) {
	this.cssBreakPointsNames = breakPoints;
	
	this.cssMediaQuery = $('<div id="breakpoints"></div>'); // This must be style correctly in your css
    $("body").append(this.cssMediaQuery);
    
    $(window).on("resize.Breakpoints", $.proxy(this.onChange, this));
    this.onChange();
};

// On Change
Breakpoints.prototype.onChange = function() {
	var index = parseInt(this.cssMediaQuery.css("width"));
	var oldBreakPointName = this.currentBreakPointName;
	this.currentBreakPointName = this.cssBreakPointsNames[index];
	if(this.currentBreakPointName && oldBreakPointName != this.currentBreakPointName){
		this.emit("change", this.currentBreakPointName); // Trigger an event
	}
	this.emit("check"); // Trigger an event
};

// Get current breakpoint name
Breakpoints.prototype.current = function() {
	return this.currentBreakPointName;
};

module.exports = new Breakpoints(); // Singleton