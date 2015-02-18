"use strict";
$ = require('jquery');

module.exports = function(containerSelector, elementSelector, prefix, nMax) {

	var containers = $(containerSelector);

	containers.each(function(index) {
		var container = $(this);
		var elements = container.find(elementSelector);
		var counter = 0;
		elements.each(function(index) {
			var element = $(this);
			element.addClass(prefix + counter);
			counter++;
			counter = counter % nMax;
		});
	});
};
