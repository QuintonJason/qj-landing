// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f() {
	log.history = log.history || [];
	log.history.push(arguments);
	if (this.console) {
		var args = arguments,
			newarr;
		args.callee = args.callee.caller;
		newarr = [].slice.call(args);
		if (typeof console.log === "object")
			log.apply.call(console.log, console, newarr);
		else console.log.apply(console, newarr);
	}
};

// make it safe to use console.log always
(function(a) {
	function b() {}
	for (
		var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(
				","
			),
			d;
		!!(d = c.pop());

	) {
		a[d] = a[d] || b;
	}
})(
	(function() {
		try {
			console.log();
			return window.console;
		} catch (a) {
			return (window.console = {});
		}
	})()
);

// smooth scrolling function
$("a[href*='#']:not([href='#'])").click(function() {
	if (
		location.pathname.replace(/^\//, "") ==
			this.pathname.replace(/^\//, "") &&
		location.hostname == this.hostname
	) {
		var target = $(this.hash);
		target = target.length
			? target
			: $("[name=" + this.hash.slice(1) + "]");
		if (target.length) {
			$("html,body").animate(
				{
					scrollTop: target.offset().top
				},
				1000
			);
			return false;
		}
	}
});

//Slick.mis.js
!(function(a) {
	"use strict";
	"function" == typeof define && define.amd
		? define(["jquery"], a)
		: a(jQuery);
})(function(a) {
	"use strict";
	var b = window.Slick || {};
	(b = (function() {
		function c(c, d) {
			var f,
				g,
				e = this;
			if (
				((e.defaults = {
					accessibility: !0,
					appendArrows: a(c),
					arrows: !0,
					prevArrow:
						'<button type="button" class="slick-prev">Previous</button>',
					nextArrow:
						'<button type="button" class="slick-next">Next</button>',
					autoplay: !1,
					autoplaySpeed: 3e3,
					centerMode: !1,
					centerPadding: "50px",
					cssEase: "ease",
					customPaging: function(a, b) {
						return '<button type="button">' + (b + 1) + "</button>";
					},
					dots: !1,
					draggable: !0,
					easing: "linear",
					fade: !1,
					infinite: !0,
					lazyLoad: "ondemand",
					onBeforeChange: null,
					onAfterChange: null,
					onInit: null,
					onReInit: null,
					pauseOnHover: !0,
					pauseOnDotsHover: !1,
					responsive: null,
					slide: "div",
					slidesToShow: 1,
					slidesToScroll: 1,
					speed: 300,
					swipe: !0,
					touchMove: !0,
					touchThreshold: 5,
					useCSS: !0,
					vertical: !1
				}),
				(e.initials = {
					animating: !1,
					dragging: !1,
					autoPlayTimer: null,
					currentSlide: 0,
					currentLeft: null,
					direction: 1,
					$dots: null,
					listWidth: null,
					listHeight: null,
					loadIndex: 0,
					$nextArrow: null,
					$prevArrow: null,
					slideCount: null,
					slideWidth: null,
					$slideTrack: null,
					$slides: null,
					sliding: !1,
					slideOffset: 0,
					swipeLeft: null,
					$list: null,
					touchObject: {},
					transformsEnabled: !1
				}),
				a.extend(e, e.initials),
				(e.activeBreakpoint = null),
				(e.animType = null),
				(e.animProp = null),
				(e.breakpoints = []),
				(e.breakpointSettings = []),
				(e.cssTransitions = !1),
				(e.paused = !1),
				(e.positionProp = null),
				(e.$slider = a(c)),
				(e.$slidesCache = null),
				(e.transformType = null),
				(e.transitionType = null),
				(e.windowWidth = 0),
				(e.windowTimer = null),
				(e.options = a.extend({}, e.defaults, d)),
				(e.originalSettings = e.options),
				(f = e.options.responsive || null),
				f && f.length > -1)
			) {
				for (g in f)
					f.hasOwnProperty(g) &&
						(e.breakpoints.push(f[g].breakpoint),
						(e.breakpointSettings[f[g].breakpoint] =
							f[g].settings));
				e.breakpoints.sort(function(a, b) {
					return b - a;
				});
			}
			(e.autoPlay = a.proxy(e.autoPlay, e)),
				(e.autoPlayClear = a.proxy(e.autoPlayClear, e)),
				(e.changeSlide = a.proxy(e.changeSlide, e)),
				(e.setPosition = a.proxy(e.setPosition, e)),
				(e.swipeHandler = a.proxy(e.swipeHandler, e)),
				(e.dragHandler = a.proxy(e.dragHandler, e)),
				(e.keyHandler = a.proxy(e.keyHandler, e)),
				(e.autoPlayIterator = a.proxy(e.autoPlayIterator, e)),
				(e.instanceUid = b++),
				(e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
				e.init();
		}
		var b = 0;
		return c;
	})()),
		(b.prototype.addSlide = function(b, c, d) {
			var e = this;
			if ("boolean" == typeof c) (d = c), (c = null);
			else if (0 > c || c >= e.slideCount) return !1;
			e.unload(),
				"number" == typeof c
					? 0 === c && 0 === e.$slides.length
						? a(b).appendTo(e.$slideTrack)
						: d
							? a(b).insertBefore(e.$slides.eq(c))
							: a(b).insertAfter(e.$slides.eq(c))
					: d === !0
						? a(b).prependTo(e.$slideTrack)
						: a(b).appendTo(e.$slideTrack),
				(e.$slides = e.$slideTrack.children(this.options.slide)),
				e.$slideTrack.children(this.options.slide).remove(),
				e.$slideTrack.append(e.$slides),
				(e.$slidesCache = e.$slides),
				e.reinit();
		}),
		(b.prototype.animateSlide = function(b, c) {
			var d = {},
				e = this;
			e.transformsEnabled === !1
				? e.options.vertical === !1
					? e.$slideTrack.animate(
							{ left: b },
							e.options.speed,
							e.options.easing,
							c
						)
					: e.$slideTrack.animate(
							{ top: b },
							e.options.speed,
							e.options.easing,
							c
						)
				: e.cssTransitions === !1
					? a({ animStart: e.currentLeft }).animate(
							{ animStart: b },
							{
								duration: e.options.speed,
								easing: e.options.easing,
								step: function(a) {
									e.options.vertical === !1
										? ((d[e.animType] =
												"translate(" + a + "px, 0px)"),
											e.$slideTrack.css(d))
										: ((d[e.animType] =
												"translate(0px," + a + "px)"),
											e.$slideTrack.css(d));
								},
								complete: function() {
									c && c.call();
								}
							}
						)
					: (e.applyTransition(),
						(d[e.animType] =
							e.options.vertical === !1
								? "translate3d(" + b + "px, 0px, 0px)"
								: "translate3d(0px," + b + "px, 0px)"),
						e.$slideTrack.css(d),
						c &&
							setTimeout(function() {
								e.disableTransition(), c.call();
							}, e.options.speed));
		}),
		(b.prototype.applyTransition = function(a) {
			var b = this,
				c = {};
			(c[b.transitionType] =
				b.options.fade === !1
					? b.transformType +
						" " +
						b.options.speed +
						"ms " +
						b.options.cssEase
					: "opacity " + b.options.speed + "ms " + b.options.cssEase),
				b.options.fade === !1
					? b.$slideTrack.css(c)
					: b.$slides.eq(a).css(c);
		}),
		(b.prototype.autoPlay = function() {
			var a = this;
			a.autoPlayTimer && clearInterval(a.autoPlayTimer),
				a.slideCount > a.options.slidesToShow &&
					a.paused !== !0 &&
					(a.autoPlayTimer = setInterval(
						a.autoPlayIterator,
						a.options.autoplaySpeed
					));
		}),
		(b.prototype.autoPlayClear = function() {
			var a = this;
			a.autoPlayTimer && clearInterval(a.autoPlayTimer);
		}),
		(b.prototype.autoPlayIterator = function() {
			var a = this;
			a.options.infinite === !1
				? 1 === a.direction
					? (a.currentSlide + 1 === a.slideCount - 1 &&
							(a.direction = 0),
						a.slideHandler(
							a.currentSlide + a.options.slidesToScroll
						))
					: (0 === a.currentSlide - 1 && (a.direction = 1),
						a.slideHandler(
							a.currentSlide - a.options.slidesToScroll
						))
				: a.slideHandler(a.currentSlide + a.options.slidesToScroll);
		}),
		(b.prototype.buildArrows = function() {
			var b = this;
			b.options.arrows === !0 &&
				b.slideCount > b.options.slidesToShow &&
				((b.$prevArrow = a(b.options.prevArrow)),
				(b.$nextArrow = a(b.options.nextArrow)),
				b.htmlExpr.test(b.options.prevArrow) &&
					b.$prevArrow.appendTo(b.options.appendArrows),
				b.htmlExpr.test(b.options.nextArrow) &&
					b.$nextArrow.appendTo(b.options.appendArrows),
				b.options.infinite !== !0 &&
					b.$prevArrow.addClass("slick-disabled"));
		}),
		(b.prototype.buildDots = function() {
			var c,
				d,
				b = this;
			if (
				b.options.dots === !0 &&
				b.slideCount > b.options.slidesToShow
			) {
				for (
					d = '<ul class="slick-dots">', c = 0;
					c <= b.getDotCount();
					c += 1
				)
					d +=
						"<li>" +
						b.options.customPaging.call(this, b, c) +
						"</li>";
				(d += "</ul>"),
					(b.$dots = a(d).appendTo(b.$slider)),
					b.$dots
						.find("li")
						.first()
						.addClass("slick-active");
			}
		}),
		(b.prototype.buildOut = function() {
			var b = this;
			(b.$slides = b.$slider
				.children(b.options.slide + ":not(.slick-cloned)")
				.addClass("slick-slide")),
				(b.slideCount = b.$slides.length),
				(b.$slidesCache = b.$slides),
				b.$slider.addClass("slick-slider"),
				(b.$slideTrack =
					0 === b.slideCount
						? a('<div class="slick-track"/>').appendTo(b.$slider)
						: b.$slides
								.wrapAll('<div class="slick-track"/>')
								.parent()),
				(b.$list = b.$slideTrack
					.wrap('<div class="slick-list"/>')
					.parent()),
				b.$slideTrack.css("opacity", 0),
				b.options.centerMode === !0 &&
					((b.options.slidesToScroll = 1),
					0 === b.options.slidesToShow % 2 &&
						(b.options.slidesToShow = 3)),
				a("img[data-lazy]", b.$slider)
					.not("[src]")
					.addClass("slick-loading"),
				b.setupInfinite(),
				b.buildArrows(),
				b.buildDots(),
				b.updateDots(),
				b.options.accessibility === !0 && b.$list.prop("tabIndex", 0),
				b.setSlideClasses(
					"number" == typeof this.currentSlide ? this.currentSlide : 0
				),
				b.options.draggable === !0 && b.$list.addClass("draggable");
		}),
		(b.prototype.checkResponsive = function() {
			var c,
				d,
				b = this;
			if (
				b.originalSettings.responsive &&
				b.originalSettings.responsive.length > -1 &&
				null !== b.originalSettings.responsive
			) {
				d = null;
				for (c in b.breakpoints)
					b.breakpoints.hasOwnProperty(c) &&
						a(window).width() < b.breakpoints[c] &&
						(d = b.breakpoints[c]);
				null !== d
					? null !== b.activeBreakpoint
						? d !== b.activeBreakpoint &&
							((b.activeBreakpoint = d),
							(b.options = a.extend(
								{},
								b.options,
								b.breakpointSettings[d]
							)),
							b.refresh())
						: ((b.activeBreakpoint = d),
							(b.options = a.extend(
								{},
								b.options,
								b.breakpointSettings[d]
							)),
							b.refresh())
					: null !== b.activeBreakpoint &&
						((b.activeBreakpoint = null),
						(b.options = a.extend(
							{},
							b.options,
							b.originalSettings
						)),
						b.refresh());
			}
		}),
		(b.prototype.changeSlide = function(b) {
			var c = this,
				d = a(b.target);
			switch ((d.is("a") && b.preventDefault(), b.data.message)) {
				case "previous":
					c.slideCount > c.options.slidesToShow &&
						c.slideHandler(
							c.currentSlide - c.options.slidesToScroll
						);
					break;
				case "next":
					c.slideCount > c.options.slidesToShow &&
						c.slideHandler(
							c.currentSlide + c.options.slidesToScroll
						);
					break;
				case "index":
					c.slideHandler(
						d.parent().index() * c.options.slidesToScroll
					);
					break;
				default:
					return !1;
			}
		}),
		(b.prototype.destroy = function() {
			var b = this;
			b.autoPlayClear(),
				(b.touchObject = {}),
				a(".slick-cloned", b.$slider).remove(),
				b.$dots && b.$dots.remove(),
				b.$prevArrow && (b.$prevArrow.remove(), b.$nextArrow.remove()),
				b.$slides.parent().hasClass("slick-track") &&
					b.$slides.unwrap().unwrap(),
				b.$slides
					.removeClass("slick-slide slick-active slick-visible")
					.removeAttr("style"),
				b.$slider.removeClass("slick-slider"),
				b.$slider.removeClass("slick-initialized"),
				b.$list.off(".slick"),
				a(window).off(".slick-" + b.instanceUid);
		}),
		(b.prototype.disableTransition = function(a) {
			var b = this,
				c = {};
			(c[b.transitionType] = ""),
				b.options.fade === !1
					? b.$slideTrack.css(c)
					: b.$slides.eq(a).css(c);
		}),
		(b.prototype.fadeSlide = function(a, b) {
			var c = this;
			c.cssTransitions === !1
				? (c.$slides.eq(a).css({ zIndex: 1e3 }),
					c.$slides
						.eq(a)
						.animate(
							{ opacity: 1 },
							c.options.speed,
							c.options.easing,
							b
						))
				: (c.applyTransition(a),
					c.$slides.eq(a).css({ opacity: 1, zIndex: 1e3 }),
					b &&
						setTimeout(function() {
							c.disableTransition(a), b.call();
						}, c.options.speed));
		}),
		(b.prototype.filterSlides = function(a) {
			var b = this;
			null !== a &&
				(b.unload(),
				b.$slideTrack.children(this.options.slide).remove(),
				b.$slidesCache.filter(a).appendTo(b.$slideTrack),
				b.reinit());
		}),
		(b.prototype.getCurrent = function() {
			var a = this;
			return a.currentSlide;
		}),
		(b.prototype.getDotCount = function() {
			var e,
				a = this,
				b = 0,
				c = 0,
				d = 0;
			for (
				e =
					a.options.infinite === !0
						? a.slideCount +
							a.options.slidesToShow -
							a.options.slidesToScroll
						: a.slideCount;
				e > b;

			)
				d++,
					(c += a.options.slidesToScroll),
					(b = c + a.options.slidesToShow);
			return d;
		}),
		(b.prototype.getLeft = function(a) {
			var c,
				d,
				b = this,
				e = 0;
			return (
				(b.slideOffset = 0),
				(d = b.$slides.first().outerHeight()),
				b.options.infinite === !0
					? (b.slideCount > b.options.slidesToShow &&
							((b.slideOffset =
								-1 * b.slideWidth * b.options.slidesToShow),
							(e = -1 * d * b.options.slidesToShow)),
						0 !== b.slideCount % b.options.slidesToScroll &&
							a + b.options.slidesToScroll > b.slideCount &&
							b.slideCount > b.options.slidesToShow &&
							((b.slideOffset =
								((-1 * b.slideCount) % b.options.slidesToShow) *
								b.slideWidth),
							(e =
								((-1 * b.slideCount) % b.options.slidesToShow) *
								d)))
					: 0 !== b.slideCount % b.options.slidesToShow &&
						a + b.options.slidesToScroll > b.slideCount &&
						b.slideCount > b.options.slidesToShow &&
						((b.slideOffset =
							b.options.slidesToShow * b.slideWidth -
							(b.slideCount % b.options.slidesToShow) *
								b.slideWidth),
						(e = (b.slideCount % b.options.slidesToShow) * d)),
				b.options.centerMode === !0 && b.options.infinite === !0
					? (b.slideOffset +=
							b.slideWidth *
								Math.floor(b.options.slidesToShow / 2) -
							b.slideWidth)
					: b.options.centerMode === !0 &&
						(b.slideOffset +=
							b.slideWidth *
							Math.floor(b.options.slidesToShow / 2)),
				(c =
					b.options.vertical === !1
						? -1 * a * b.slideWidth + b.slideOffset
						: -1 * a * d + e)
			);
		}),
		(b.prototype.init = function() {
			var b = this;
			a(b.$slider).hasClass("slick-initialized") ||
				(a(b.$slider).addClass("slick-initialized"),
				b.buildOut(),
				b.setProps(),
				b.startLoad(),
				b.loadSlider(),
				b.initializeEvents(),
				b.checkResponsive()),
				null !== b.options.onInit && b.options.onInit.call(this, b);
		}),
		(b.prototype.initArrowEvents = function() {
			var a = this;
			a.options.arrows === !0 &&
				a.slideCount > a.options.slidesToShow &&
				(a.$prevArrow.on(
					"click.slick",
					{ message: "previous" },
					a.changeSlide
				),
				a.$nextArrow.on(
					"click.slick",
					{ message: "next" },
					a.changeSlide
				));
		}),
		(b.prototype.initDotEvents = function() {
			var b = this;
			b.options.dots === !0 &&
				b.slideCount > b.options.slidesToShow &&
				a("li", b.$dots).on(
					"click.slick",
					{ message: "index" },
					b.changeSlide
				),
				b.options.dots === !0 &&
					b.options.pauseOnDotsHover === !0 &&
					b.options.autoplay === !0 &&
					a("li", b.$dots)
						.on("mouseenter.slick", b.autoPlayClear)
						.on("mouseleave.slick", b.autoPlay);
		}),
		(b.prototype.initializeEvents = function() {
			var b = this;
			b.initArrowEvents(),
				b.initDotEvents(),
				b.$list.on(
					"touchstart.slick mousedown.slick",
					{ action: "start" },
					b.swipeHandler
				),
				b.$list.on(
					"touchmove.slick mousemove.slick",
					{ action: "move" },
					b.swipeHandler
				),
				b.$list.on(
					"touchend.slick mouseup.slick",
					{ action: "end" },
					b.swipeHandler
				),
				b.$list.on(
					"touchcancel.slick mouseleave.slick",
					{ action: "end" },
					b.swipeHandler
				),
				b.options.pauseOnHover === !0 &&
					b.options.autoplay === !0 &&
					(b.$list.on("mouseenter.slick", b.autoPlayClear),
					b.$list.on("mouseleave.slick", b.autoPlay)),
				b.options.accessibility === !0 &&
					b.$list.on("keydown.slick", b.keyHandler),
				a(window).on(
					"orientationchange.slick.slick-" + b.instanceUid,
					function() {
						b.checkResponsive(), b.setPosition();
					}
				),
				a(window).on("resize.slick.slick-" + b.instanceUid, function() {
					a(window).width !== b.windowWidth &&
						(clearTimeout(b.windowDelay),
						(b.windowDelay = window.setTimeout(function() {
							(b.windowWidth = a(window).width()),
								b.checkResponsive(),
								b.setPosition();
						}, 50)));
				}),
				a(window).on(
					"load.slick.slick-" + b.instanceUid,
					b.setPosition
				),
				a(document).on(
					"ready.slick.slick-" + b.instanceUid,
					b.setPosition
				);
		}),
		(b.prototype.initUI = function() {
			var a = this;
			a.options.arrows === !0 &&
				a.slideCount > a.options.slidesToShow &&
				(a.$prevArrow.show(), a.$nextArrow.show()),
				a.options.dots === !0 &&
					a.slideCount > a.options.slidesToShow &&
					a.$dots.show(),
				a.options.autoplay === !0 && a.autoPlay();
		}),
		(b.prototype.keyHandler = function(a) {
			var b = this;
			37 === a.keyCode
				? b.changeSlide({ data: { message: "previous" } })
				: 39 === a.keyCode &&
					b.changeSlide({ data: { message: "next" } });
		}),
		(b.prototype.lazyLoad = function() {
			function g(b) {
				a("img[data-lazy]", b).each(function() {
					var b = a(this),
						c = a(this).attr("data-lazy");
					b
						.css({ opacity: 0 })
						.attr("src", c)
						.removeAttr("data-lazy")
						.removeClass("slick-loading")
						.load(function() {
							b.animate({ opacity: 1 }, 200);
						});
				});
			}
			var c,
				d,
				e,
				f,
				b = this;
			b.options.centerMode === !0 || b.options.fade === !0
				? ((e = b.options.slidesToShow + b.currentSlide - 1),
					(f = e + b.options.slidesToShow + 2))
				: ((e = b.options.infinite
						? b.options.slidesToShow + b.currentSlide
						: b.currentSlide),
					(f = e + b.options.slidesToShow)),
				(c = b.$slider.find(".slick-slide").slice(e, f)),
				g(c),
				b.currentSlide >= b.slideCount - b.options.slidesToShow
					? ((d = b.$slider
							.find(".slick-cloned")
							.slice(0, b.options.slidesToShow)),
						g(d))
					: 0 === b.currentSlide &&
						((d = b.$slider
							.find(".slick-cloned")
							.slice(-1 * b.options.slidesToShow)),
						g(d));
		}),
		(b.prototype.loadSlider = function() {
			var a = this;
			a.setPosition(),
				a.$slideTrack.css({ opacity: 1 }),
				a.$slider.removeClass("slick-loading"),
				a.initUI(),
				"progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
		}),
		(b.prototype.postSlide = function(a) {
			var b = this;
			null !== b.options.onAfterChange &&
				b.options.onAfterChange.call(this, b, a),
				(b.animating = !1),
				b.setPosition(),
				(b.swipeLeft = null),
				b.options.autoplay === !0 && b.paused === !1 && b.autoPlay();
		}),
		(b.prototype.progressiveLazyLoad = function() {
			var c,
				d,
				b = this;
			(c = a("img[data-lazy]").length),
				c > 0 &&
					((d = a("img[data-lazy]", b.$slider).first()),
					d
						.attr("src", d.attr("data-lazy"))
						.removeClass("slick-loading")
						.load(function() {
							d.removeAttr("data-lazy"), b.progressiveLazyLoad();
						}));
		}),
		(b.prototype.refresh = function() {
			var b = this,
				c = b.currentSlide;
			b.destroy(),
				a.extend(b, b.initials),
				(b.currentSlide = c),
				b.init();
		}),
		(b.prototype.reinit = function() {
			var a = this;
			(a.$slides = a.$slideTrack
				.children(a.options.slide)
				.addClass("slick-slide")),
				(a.slideCount = a.$slides.length),
				a.currentSlide >= a.slideCount &&
					0 !== a.currentSlide &&
					(a.currentSlide =
						a.currentSlide - a.options.slidesToScroll),
				a.setProps(),
				a.setupInfinite(),
				a.buildArrows(),
				a.updateArrows(),
				a.initArrowEvents(),
				a.buildDots(),
				a.updateDots(),
				a.initDotEvents(),
				a.setSlideClasses(0),
				a.setPosition(),
				null !== a.options.onReInit && a.options.onReInit.call(this, a);
		}),
		(b.prototype.removeSlide = function(a, b) {
			var c = this;
			return (
				"boolean" == typeof a
					? ((b = a), (a = b === !0 ? 0 : c.slideCount - 1))
					: (a = b === !0 ? --a : a),
				c.slideCount < 1 || 0 > a || a > c.slideCount - 1
					? !1
					: (c.unload(),
						c.$slideTrack
							.children(this.options.slide)
							.eq(a)
							.remove(),
						(c.$slides = c.$slideTrack.children(
							this.options.slide
						)),
						c.$slideTrack.children(this.options.slide).remove(),
						c.$slideTrack.append(c.$slides),
						(c.$slidesCache = c.$slides),
						c.reinit(),
						void 0)
			);
		}),
		(b.prototype.setCSS = function(a) {
			var d,
				e,
				b = this,
				c = {};
			(d = "left" == b.positionProp ? a + "px" : "0px"),
				(e = "top" == b.positionProp ? a + "px" : "0px"),
				(c[b.positionProp] = a),
				b.transformsEnabled === !1
					? b.$slideTrack.css(c)
					: ((c = {}),
						b.cssTransitions === !1
							? ((c[b.animType] =
									"translate(" + d + ", " + e + ")"),
								b.$slideTrack.css(c))
							: ((c[b.animType] =
									"translate3d(" + d + ", " + e + ", 0px)"),
								b.$slideTrack.css(c)));
		}),
		(b.prototype.setDimensions = function() {
			var a = this;
			a.options.centerMode === !0
				? a.$slideTrack.children(".slick-slide").width(a.slideWidth)
				: a.$slideTrack.children(".slick-slide").width(a.slideWidth),
				a.options.vertical === !1
					? (a.$slideTrack.width(
							Math.ceil(
								a.slideWidth *
									a.$slideTrack.children(".slick-slide")
										.length
							)
						),
						a.options.centerMode === !0 &&
							a.$list.css({
								padding: "0px " + a.options.centerPadding
							}))
					: (a.$list.height(
							a.$slides.first().outerHeight() *
								a.options.slidesToShow
						),
						a.$slideTrack.height(
							Math.ceil(
								a.$slides.first().outerHeight() *
									a.$slideTrack.children(".slick-slide")
										.length
							)
						),
						a.options.centerMode === !0 &&
							a.$list.css({
								padding: a.options.centerPadding + " 0px"
							}));
		}),
		(b.prototype.setFade = function() {
			var c,
				b = this;
			b.$slides.each(function(d, e) {
				(c = -1 * b.slideWidth * d),
					a(e).css({
						position: "relative",
						left: c,
						top: 0,
						zIndex: 800,
						opacity: 0
					});
			}),
				b.$slides.eq(b.currentSlide).css({ zIndex: 900, opacity: 1 });
		}),
		(b.prototype.setPosition = function() {
			var a = this;
			a.setValues(),
				a.setDimensions(),
				a.options.fade === !1
					? a.setCSS(a.getLeft(a.currentSlide))
					: a.setFade();
		}),
		(b.prototype.setProps = function() {
			var a = this;
			(a.positionProp = a.options.vertical === !0 ? "top" : "left"),
				"top" === a.positionProp
					? a.$slider.addClass("slick-vertical")
					: a.$slider.removeClass("slick-vertical"),
				(void 0 !== document.body.style.WebkitTransition ||
					void 0 !== document.body.style.MozTransition ||
					void 0 !== document.body.style.msTransition) &&
					a.options.useCSS === !0 &&
					(a.cssTransitions = !0),
				void 0 !== document.body.style.MozTransform &&
					((a.animType = "MozTransform"),
					(a.transformType = "-moz-transform"),
					(a.transitionType = "MozTransition")),
				void 0 !== document.body.style.webkitTransform &&
					((a.animType = "webkitTransform"),
					(a.transformType = "-webkit-transform"),
					(a.transitionType = "webkitTransition")),
				void 0 !== document.body.style.msTransform &&
					((a.animType = "transform"),
					(a.transformType = "transform"),
					(a.transitionType = "transition")),
				(a.transformsEnabled = null !== a.animType);
		}),
		(b.prototype.setValues = function() {
			var a = this;
			(a.listWidth = a.$list.width()),
				(a.listHeight = a.$list.height()),
				(a.slideWidth =
					a.options.vertical === !1
						? Math.ceil(a.listWidth / a.options.slidesToShow)
						: Math.ceil(a.listWidth));
		}),
		(b.prototype.setSlideClasses = function(a) {
			var c,
				d,
				e,
				b = this;
			b.$slider
				.find(".slick-slide")
				.removeClass("slick-active")
				.removeClass("slick-center"),
				(d = b.$slider.find(".slick-slide")),
				b.options.centerMode === !0
					? ((c = Math.floor(b.options.slidesToShow / 2)),
						b.options.infinite === !0 &&
							(a >= c && a <= b.slideCount - 1 - c
								? b.$slides
										.slice(a - c, a + c + 1)
										.addClass("slick-active")
								: ((e = b.options.slidesToShow + a),
									d
										.slice(e - c + 1, e + c + 2)
										.addClass("slick-active")),
							0 === a
								? d
										.eq(
											d.length -
												1 -
												b.options.slidesToShow
										)
										.addClass("slick-center")
								: a === b.slideCount - 1 &&
									d
										.eq(b.options.slidesToShow)
										.addClass("slick-center")),
						b.$slides.eq(a).addClass("slick-center"))
					: a > 0 && a < b.slideCount - b.options.slidesToShow
						? b.$slides
								.slice(a, a + b.options.slidesToShow)
								.addClass("slick-active")
						: d.length <= b.options.slidesToShow
							? d.addClass("slick-active")
							: ((e =
									b.options.infinite === !0
										? b.options.slidesToShow + a
										: a),
								d
									.slice(e, e + b.options.slidesToShow)
									.addClass("slick-active")),
				"ondemand" === b.options.lazyLoad && b.lazyLoad();
		}),
		(b.prototype.setupInfinite = function() {
			var c,
				d,
				e,
				b = this;
			if (
				((b.options.fade === !0 || b.options.vertical === !0) &&
					(b.options.centerMode = !1),
				b.options.infinite === !0 &&
					b.options.fade === !1 &&
					((d = null), b.slideCount > b.options.slidesToShow))
			) {
				for (
					e =
						b.options.centerMode === !0
							? b.options.slidesToShow + 1
							: b.options.slidesToShow,
						c = b.slideCount;
					c > b.slideCount - e;
					c -= 1
				)
					(d = c - 1),
						a(b.$slides[d])
							.clone()
							.attr("id", "")
							.prependTo(b.$slideTrack)
							.addClass("slick-cloned");
				for (c = 0; e > c; c += 1)
					(d = c),
						a(b.$slides[d])
							.clone()
							.attr("id", "")
							.appendTo(b.$slideTrack)
							.addClass("slick-cloned");
				b.$slideTrack
					.find(".slick-cloned")
					.find("[id]")
					.each(function() {
						a(this).attr("id", "");
					});
			}
		}),
		(b.prototype.slideHandler = function(a) {
			var b,
				c,
				d,
				e,
				f = null,
				g = this;
			return g.animating === !0
				? !1
				: ((b = a),
					(f = g.getLeft(b)),
					(d = g.getLeft(g.currentSlide)),
					(e =
						0 !== g.slideCount % g.options.slidesToScroll
							? g.options.slidesToScroll
							: 0),
					(g.currentLeft = null === g.swipeLeft ? d : g.swipeLeft),
					g.options.infinite === !1 &&
					g.options.centerMode === !1 &&
					(0 > a || a > g.slideCount - g.options.slidesToShow + e)
						? (g.options.fade === !1 &&
								((b = g.currentSlide),
								g.animateSlide(d, function() {
									g.postSlide(b);
								})),
							!1)
						: g.options.infinite === !1 &&
							g.options.centerMode === !0 &&
							(0 > a ||
								a > g.slideCount - g.options.slidesToScroll)
							? (g.options.fade === !1 &&
									((b = g.currentSlide),
									g.animateSlide(d, function() {
										g.postSlide(b);
									})),
								!1)
							: (g.options.autoplay === !0 &&
									clearInterval(g.autoPlayTimer),
								(c =
									0 > b
										? 0 !==
											g.slideCount %
												g.options.slidesToScroll
											? g.slideCount -
												g.slideCount %
													g.options.slidesToScroll
											: g.slideCount -
												g.options.slidesToScroll
										: b > g.slideCount - 1 ? 0 : b),
								(g.animating = !0),
								null !== g.options.onBeforeChange &&
									a !== g.currentSlide &&
									g.options.onBeforeChange.call(
										this,
										g,
										g.currentSlide,
										c
									),
								(g.currentSlide = c),
								g.setSlideClasses(g.currentSlide),
								g.updateDots(),
								g.updateArrows(),
								g.options.fade === !0
									? (g.fadeSlide(c, function() {
											g.postSlide(c);
										}),
										!1)
									: (g.animateSlide(f, function() {
											g.postSlide(c);
										}),
										void 0)));
		}),
		(b.prototype.startLoad = function() {
			var a = this;
			a.options.arrows === !0 &&
				a.slideCount > a.options.slidesToShow &&
				(a.$prevArrow.hide(), a.$nextArrow.hide()),
				a.options.dots === !0 &&
					a.slideCount > a.options.slidesToShow &&
					a.$dots.hide(),
				a.$slider.addClass("slick-loading");
		}),
		(b.prototype.swipeDirection = function() {
			var a,
				b,
				c,
				d,
				e = this;
			return (
				(a = e.touchObject.startX - e.touchObject.curX),
				(b = e.touchObject.startY - e.touchObject.curY),
				(c = Math.atan2(b, a)),
				(d = Math.round(180 * c / Math.PI)),
				0 > d && (d = 360 - Math.abs(d)),
				45 >= d && d >= 0
					? "left"
					: 360 >= d && d >= 315
						? "left"
						: d >= 135 && 225 >= d ? "right" : "vertical"
			);
		}),
		(b.prototype.swipeEnd = function(b) {
			var c = this;
			if (((c.dragging = !1), void 0 === c.touchObject.curX)) return !1;
			if (c.touchObject.swipeLength >= c.touchObject.minSwipe)
				switch ((a(b.target).on("click.slick", function(b) {
					b.stopImmediatePropagation(),
						b.stopPropagation(),
						b.preventDefault(),
						a(b.target).off("click.slick");
				}),
				c.swipeDirection())) {
					case "left":
						c.slideHandler(
							c.currentSlide + c.options.slidesToScroll
						),
							(c.touchObject = {});
						break;
					case "right":
						c.slideHandler(
							c.currentSlide - c.options.slidesToScroll
						),
							(c.touchObject = {});
				}
			else
				c.touchObject.startX !== c.touchObject.curX &&
					(c.slideHandler(c.currentSlide), (c.touchObject = {}));
		}),
		(b.prototype.swipeHandler = function(a) {
			var b = this;
			if (
				!(
					b.options.swipe === !1 ||
					("ontouchend" in document && b.options.swipe === !1) ||
					b.options.draggable === !1 ||
					(b.options.draggable === !1 && !a.originalEvent.touches)
				)
			)
				switch (((b.touchObject.fingerCount =
					a.originalEvent && void 0 !== a.originalEvent.touches
						? a.originalEvent.touches.length
						: 1),
				(b.touchObject.minSwipe =
					b.listWidth / b.options.touchThreshold),
				a.data.action)) {
					case "start":
						b.swipeStart(a);
						break;
					case "move":
						b.swipeMove(a);
						break;
					case "end":
						b.swipeEnd(a);
				}
		}),
		(b.prototype.swipeMove = function(a) {
			var c,
				d,
				e,
				f,
				b = this;
			return (
				(f =
					void 0 !== a.originalEvent
						? a.originalEvent.touches
						: null),
				(c = b.getLeft(b.currentSlide)),
				!b.dragging || (f && 1 !== f.length)
					? !1
					: ((b.touchObject.curX =
							void 0 !== f ? f[0].pageX : a.clientX),
						(b.touchObject.curY =
							void 0 !== f ? f[0].pageY : a.clientY),
						(b.touchObject.swipeLength = Math.round(
							Math.sqrt(
								Math.pow(
									b.touchObject.curX - b.touchObject.startX,
									2
								)
							)
						)),
						(d = b.swipeDirection()),
						"vertical" !== d
							? (void 0 !== a.originalEvent &&
									b.touchObject.swipeLength > 4 &&
									a.preventDefault(),
								(e =
									b.touchObject.curX > b.touchObject.startX
										? 1
										: -1),
								(b.swipeLeft =
									b.options.vertical === !1
										? c + b.touchObject.swipeLength * e
										: c +
											b.touchObject.swipeLength *
												(b.$list.height() /
													b.listWidth) *
												e),
								b.options.fade === !0 ||
								b.options.touchMove === !1
									? !1
									: b.animating === !0
										? ((b.swipeLeft = null), !1)
										: (b.setCSS(b.swipeLeft), void 0))
							: void 0)
			);
		}),
		(b.prototype.swipeStart = function(a) {
			var c,
				b = this;
			return 1 !== b.touchObject.fingerCount ||
				b.slideCount <= b.options.slidesToShow
				? ((b.touchObject = {}), !1)
				: (void 0 !== a.originalEvent &&
						void 0 !== a.originalEvent.touches &&
						(c = a.originalEvent.touches[0]),
					(b.touchObject.startX = b.touchObject.curX =
						void 0 !== c ? c.pageX : a.clientX),
					(b.touchObject.startY = b.touchObject.curY =
						void 0 !== c ? c.pageY : a.clientY),
					(b.dragging = !0),
					void 0);
		}),
		(b.prototype.unfilterSlides = function() {
			var a = this;
			null !== a.$slidesCache &&
				(a.unload(),
				a.$slideTrack.children(this.options.slide).remove(),
				a.$slidesCache.appendTo(a.$slideTrack),
				a.reinit());
		}),
		(b.prototype.unload = function() {
			var b = this;
			a(".slick-cloned", b.$slider).remove(),
				b.$dots && b.$dots.remove(),
				b.$prevArrow && (b.$prevArrow.remove(), b.$nextArrow.remove()),
				b.$slides
					.removeClass("slick-slide slick-active slick-visible")
					.removeAttr("style");
		}),
		(b.prototype.updateArrows = function() {
			var a = this;
			a.options.arrows === !0 &&
				a.options.infinite !== !0 &&
				a.slideCount > a.options.slidesToShow &&
				(a.$prevArrow.removeClass("slick-disabled"),
				a.$nextArrow.removeClass("slick-disabled"),
				0 === a.currentSlide
					? (a.$prevArrow.addClass("slick-disabled"),
						a.$nextArrow.removeClass("slick-disabled"))
					: a.currentSlide >= a.slideCount - a.options.slidesToShow &&
						(a.$nextArrow.addClass("slick-disabled"),
						a.$prevArrow.removeClass("slick-disabled")));
		}),
		(b.prototype.updateDots = function() {
			var a = this;
			null !== a.$dots &&
				(a.$dots.find("li").removeClass("slick-active"),
				a.$dots
					.find("li")
					.eq(Math.floor(a.currentSlide / a.options.slidesToScroll))
					.addClass("slick-active"));
		}),
		(a.fn.slick = function(a) {
			var c = this;
			return c.each(function(c, d) {
				d.slick = new b(d, a);
			});
		}),
		(a.fn.slickAdd = function(a, b, c) {
			var d = this;
			return d.each(function(d, e) {
				e.slick.addSlide(a, b, c);
			});
		}),
		(a.fn.slickCurrentSlide = function() {
			var a = this;
			return a.get(0).slick.getCurrent();
		}),
		(a.fn.slickFilter = function(a) {
			var b = this;
			return b.each(function(b, c) {
				c.slick.filterSlides(a);
			});
		}),
		(a.fn.slickGoTo = function(a) {
			var b = this;
			return b.each(function(b, c) {
				c.slick.slideHandler(a);
			});
		}),
		(a.fn.slickNext = function() {
			var a = this;
			return a.each(function(a, b) {
				b.slick.changeSlide({ data: { message: "next" } });
			});
		}),
		(a.fn.slickPause = function() {
			var a = this;
			return a.each(function(a, b) {
				b.slick.autoPlayClear(), (b.slick.paused = !0);
			});
		}),
		(a.fn.slickPlay = function() {
			var a = this;
			return a.each(function(a, b) {
				(b.slick.paused = !1), b.slick.autoPlay();
			});
		}),
		(a.fn.slickPrev = function() {
			var a = this;
			return a.each(function(a, b) {
				b.slick.changeSlide({ data: { message: "previous" } });
			});
		}),
		(a.fn.slickRemove = function(a, b) {
			var c = this;
			return c.each(function(c, d) {
				d.slick.removeSlide(a, b);
			});
		}),
		(a.fn.slickGetOption = function(a) {
			var b = this;
			return b.get(0).slick.options[a];
		}),
		(a.fn.slickSetOption = function(a, b, c) {
			var d = this;
			return d.each(function(d, e) {
				(e.slick.options[a] = b),
					c === !0 && (e.slick.unload(), e.slick.reinit());
			});
		}),
		(a.fn.slickUnfilter = function() {
			var a = this;
			return a.each(function(a, b) {
				b.slick.unfilterSlides();
			});
		}),
		(a.fn.unslick = function() {
			var a = this;
			return a.each(function(a, b) {
				b.slick && b.slick.destroy();
			});
		});
});

// place any jQuery/helper plugins in here, instead of separate, slower script files.

//jvFloat -> placeholder text effect
!(function(a) {
	"use strict";
	a.fn.jvFloat = function() {
		return this.filter("input:not([type=submit]), textarea, select").each(
			function() {
				function b(a) {
					var b = a.attr("placeholder");
					return "undefined" == typeof b && (b = a.attr("title")), b;
				}
				function c() {
					var a = f.val();
					if (null == a) a = "";
					else if (f.is("select")) {
						var c = b(f);
						c == a && (a = "");
					}
					i.toggleClass("active", "" !== a);
				}
				function d() {
					var b = "";
					do
						b = (
							"0000" +
							((Math.random() * Math.pow(36, 4)) << 0).toString(
								36
							)
						).substr(-4);
					while (a("#" + b).length);
					return b;
				}
				function e(a) {
					var b = d();
					return a.prop("id", b), b;
				}
				var f = a(this).wrap("<div class=jvFloat>"),
					g = f.attr("id");
				g || (g = e(f));
				var h = f.attr("required") || "",
					i = "",
					j = b(f);
				(i = a(this).is("textarea")
					? a(
							'<label class="placeHolder  textarea ' +
								h +
								'" for="' +
								g +
								'">' +
								j +
								"</label>"
						).insertBefore(f)
					: a(
							'<label class="placeHolder ' +
								h +
								'" for="' +
								g +
								'">' +
								j +
								"</label>"
						).insertBefore(f)),
					c(),
					f.bind("keyup blur", c);
			}
		);
	};
})(window.jQuery || window.Zepto || window.$);
