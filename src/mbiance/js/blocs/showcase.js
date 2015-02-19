"use strict";

$ = require('jquery');
var gsap = require('gsap');

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
}

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
			var img = this.mainContainer.find("img");
			img.css("opacity", 0);
			TweenMax.to(this.mainContainer, 1, {backgroundColor: slide.data("color")});
			TweenMax.to(img, 1, {opacity: 1, delay: .5});
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