"use strict";

$ = require('jquery');
var jsMediaQueries = require('./../utils/JSMediaQueries');
var TweenLite = require('./../vendor/greensock/TweenLite');
var TimelineLite = require('./../vendor/greensock/TimelineLite');
var CSSPlugin = require('./../vendor/greensock/plugins/CSSPlugin');
//var ColorPropsPlugin = require('./../vendor/greensock/plugins/ColorPropsPlugin');

// Showcase class
function Showcase(mainContainer, slides, dotNav) {
	this.mainContainer = mainContainer;
	this.dots;
	this.slidesCount;
	this.currentSlide = 0; // The current slide id

	this.slides = slides;
	this.slidesCount = this.slides.length;
	this.currentSlide = 0;
	this.dotNav = dotNav;

	this.intervalID;
	this.intervalDelay = 10 * 1000;

	this.move(this.currentSlide);

	//this.restartTimer();

	//this.egalizeSlides();

	// Call again egalizeSlides when breakpoints are changes
	//$(window).on("JSMediaQueries.changeState", $.proxy(this.egalizeSlides, this));

	// Click on the dots
	this.dotNav.on("click.dotNav", $.proxy(this.onDotNavClick, this));

	this.loadImages();

	$(window).on("JSMediaQueries.changeState", $.proxy(this.loadImages, this));
}

// Load the right image
Showcase.prototype.loadImages = function() {

	for(var i=0; i<this.slidesCount; i++){
		var slide = this.slides.eq(i);
		var img = slide.find("img");

		var newsrc = slide.data("image" + jsMediaQueries.currentBreakPointName.toLowerCase());

		if(img.attr("src") != newsrc){
			img.attr("src", newsrc);
			//console.log(newsrc);
		}
	}
};

// Click on the dots
Showcase.prototype.onDotNavClick = function(e) {
	this.restartTimer();
	this.move($(e.target).index());
	e.preventDefault();
};

// Move to a specific slide ID
Showcase.prototype.move = function(slideId) {
	this.currentSlide = slideId;
	for(var i=0; i<this.slidesCount; i++){
		var slide = this.slides.eq(i);
		var dotNav = this.dotNav.eq(i);
		if(this.currentSlide == i){
			slide.show();
			dotNav.addClass("active");
			var img = slide.find("img");
			var projectName = slide.find(".projectName");
			var title = slide.find(".title");
			var desc = slide.find(".desc");
			
			img.css("opacity", 0);
			projectName.css("opacity", 0);
			title.css("opacity", 0);
			desc.css("opacity", 0);

			projectName.css("color", slide.data("textcolor"));
			title.css("color", slide.data("textcolor"));
			desc.css("color", slide.data("textcolor"));

			//TweenLite.killTweensOf(this.mainContainer);
			//TweenLite.killTweensOf(img);
			if(typeof this.changeSlideTimeline != 'undefined') this.changeSlideTimeline.kill();
			this.changeSlideTimeline = new TimelineLite();
			this.changeSlideTimeline.add([
				TweenLite.to(this.mainContainer, 1, {backgroundColor: slide.data("color")}),
				//TweenLite.to(img, 0.01, {opacity: 0}),
				TweenLite.to(img, 1, {opacity: 1, delay: 1}),
				TweenLite.to(projectName, 0.01, {x: "+=100"}),
				TweenLite.to(projectName, 1, {opacity: 1, x: 0, delay: .3}),
				TweenLite.to(title, 0.01, {x: "+=200"}),
				TweenLite.to(title, 1, {opacity: 1,  x: 0, delay: .5}),
				TweenLite.to(desc, 0.01, {x: "+=300"}),
				TweenLite.to(desc, 1, {opacity: 1, x: 0, delay: .7})
			]);
			
		} else {
			slide.hide();
			dotNav.removeClass("active");
		}
	}
};

// Move to the prev slide 
Showcase.prototype.prev = function() {
	if(this.currentSlide-1 >= 0){
		this.move(this.currentSlide-1);
	} else {
		this.move(this.slidesCount-1);
	}
}

// Move to the next slide 
Showcase.prototype.next = function() {
	if((this.currentSlide+1) < this.slidesCount){
		this.move(this.currentSlide+1);
	} else {
		this.move(0);
	}
}

// Restart/Start the timer
Showcase.prototype.restartTimer = function() {
	clearInterval(this.intervalID);
	this.intervalID = setInterval($.proxy(this.next, this), this.intervalDelay);
}

// Make all the slide the same size
/*Showcase.prototype.egalizeSlides = function() {
	var maxHeight = 0;
	this.slides.css("min-height", 0);

	for(var i=0; i<this.slidesCount; i++){
		var slide = this.slides.eq(i);
		if(slide.height() > maxHeight) maxHeight = slide.height();
	}

	//this.slides.css("min-height", maxHeight);
}
*/

module.exports = Showcase;