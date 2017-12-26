/* Author: John Gibby @thatgibbyguy */

// ==========================
/* Store current location */
// ==========================

var pathName = location.pathname;

// ==========================
/* Remove Phone Link on Desktop */
// ==========================

remPhoneLink = function() {
	docWidth = $(document).width();
	if (docWidth >= 1024) {
		$('[data-query="phone"]').click(function() {
			return false;
		});
	} else {
		$('[data-query="phone"]').click(function() {
			return true;
		});
	}
};
remPhoneLink();

// ==========================
/* Adding and removing classes */
// ==========================

var addClassTo = function(query) {
	$('[data-query="' + query + '"]').addClass("on");
};
var removeClassFrom = function(query) {
	$('[data-query="' + query + '"]').removeClass("on");
};
var addClassByUrl = function(path, query) {
	if (pathName.indexOf(path) >= 0) {
		$('[data-query="' + query + '"]').addClass("on");
	}
};

// ==========================
/* Mobile Menu Trigger */
// ==========================

var nav = "";
var toggler = document.getElementById("mobile-toggle");

$(toggler).click(function() {
	$(nav)
		.toggleClass("mobile-hidden")
		.toggleClass("show");
});

// ==============================================
/* JVFloat - Placeholder Effect*/
// ==============================================

//apply effect
if (!$("html").hasClass("lt-ie9")) {
	$(".float-pattern").jvFloat();
}

// ==============================================
/* Logo Work*/
// ==============================================

// when click on Logo
var logo = document.getElementById("qj-logo");
var logoQ = document.getElementById("logo-q");
var logoJ = document.getElementById("logo-j");
var logoExpanded = true;
var tl = new TimelineMax({ paused: true });

tl.addLabel("start");
tl
	.to(logoJ, 0.5, { x: "-=91" }, "start")
	.to(logoJ, 0.5, { autoAlpha: 0 }, "start-=.3")
	.to(logoQ, 0.5, { x: getCenter(logo, logoQ) }, "start");

function getCenter(x, y) {
	// get center of path inside SVG
	var xWid = x.getBoundingClientRect().width;
	var yWid = y.getBoundingClientRect().width;
	return (xWid - yWid) / 4;
}

logo.onclick = function() {
	logo.classList.toggle("on");

	// slide J from left(-91px) to orig spot and fadeIn if not expanded
	if (logoExpanded) {
		tl.play();
	} else {
		tl.reverse();
	}

	logoExpanded = !logoExpanded;
};
