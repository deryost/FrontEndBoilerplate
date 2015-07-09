"use strict";

var $ = require('jquery');

module.exports = function(containerSelector, elementSelector, prefix, nMax) {

	var containers = $(containerSelector);

	containers.each(function() {
		var container = $(this);
		var elements = container.find(elementSelector);
		var counter = 0;
		elements.each(function() {
			var element = $(this);
			element.addClass(prefix + (counter+1));
			counter++;
			counter = counter % nMax;
		});
	});
};
