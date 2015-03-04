// ResponsiveDOM class
// Responsive DOM child elements move into their parent container depending of the browser size
// Depends on JSMediaQueries events

"use strict";

// Constructor
function ResponsiveDOM() {
	
}

// init
ResponsiveDOM.prototype.init = function() {
	var responsiveDOM = this;
	$(document).on("JSMediaQueries.changeState", function(e, currentState){
		responsiveDOM.stateChange(currentState);
	});
};

// Move responsive child into parents
ResponsiveDOM.prototype.stateChange = function(state) {
	var childs = $("[data-responsivechild]");
	childs.each(function() {
		var child = $(this);
		var childID = child.data("responsivechild");
		var parents = $('[data-responsiveparent="' + childID + '"]');
		parents.each(function() {
			var parent = $(this);
			var parentState = parent.data("state");
			//var parentID = parent.data("responsiveparent");
			//console.log("parentID:" + parentID + " childID:" + childID + " parentState:" + parentState + " ?= " + state);
			if(parentState == state){
				parent.append(child);
				return false;
			}
		});
	});
};

module.exports = ResponsiveDOM;