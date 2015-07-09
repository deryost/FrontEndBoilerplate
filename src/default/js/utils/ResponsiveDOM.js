// ResponsiveDOM class
// Responsive DOM child elements move into their parent container depending of the browser size
// Depends on Breakpoints events

"use strict";

var $ = require('jquery');
var breakpoints = require('./Breakpoints');

// Constructor
function ResponsiveDOM() {
	breakpoints.on('change',$.proxy(this.stateChange,this));
	this.stateChange();
}

// Move responsive child into parents
ResponsiveDOM.prototype.stateChange = function() {
	var childs = $("[data-responsivechild]");
	childs.each(function() {
		var child = $(this);
		var childID = child.data("responsivechild");
		var parents = $('[data-responsiveparent="' + childID + '"]');
		parents.each(function() {
			var parent = $(this);
			var parentState = parent.data("state");
			//var parentID = parent.data("responsiveparent");
			//console.log("parentID:" + parentID + " childID:" + childID + " parentState:" + parentState + " ?= " + breakpoints.current());
			if(parentState == breakpoints.current()){
				parent.append(child);
				return false;
			}
		});
	});
};

module.exports = ResponsiveDOM;