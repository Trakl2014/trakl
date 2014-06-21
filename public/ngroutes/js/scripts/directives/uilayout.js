/*jslint node: true */
/*global define */
define(['app', 'jquery-ui', 'jquery-layout', 'services/mapServices'], function (app) {
    app.directive('wrapper', ['$timeout','$http', 'MapService', function ($timeout, $http, MapService) {
        return {
            restrict: 'C',
            transclude: true,
            templateUrl: "js/scripts/directives/templates/uilayout.html",
            link: function (scope, elm, attrs, controllers) {
                console.log("applying layout");

                var headerH = $('.header').innerHeight();
                var footerH = $('.footer').innerHeight();
                var height_used = headerH + footerH;

                $('#main').height($(window).height() - 62);
                elm.height($('#main').height());
                elm.width($('#main').width());

                scope.resize = function () {
                    elm.find('.degrading-value').height(elm.find('.degrading-arrow').height() + elm.find('.degrading-text').height() + 20);
                    MapService.resize();

                }

                scope.myLayout = elm.layout({
                    applyDemoStyles: false,
                    defaults: {
                        paneClass: "pane" 		// default = 'ui-layout-pane'
                    , resizerClass: "resizer"	// default = 'ui-layout-resizer'
                    , togglerClass: "toggler"	// default = 'ui-layout-toggler'
                    , buttonClass: "button"	// default = 'ui-layout-button'
                    , contentSelector: ".content"	// inner div to auto-size so only it scrolls, not the entire pane!
                    , contentIgnoreSelector: "span"		// 'paneSelector' for content to 'ignore' when measuring room for content
                    , togglerLength_open: 35			// WIDTH of toggler on north/south edges - HEIGHT on east/west edges
                    , togglerLength_closed: 35			// "100%" OR -1 = full height
                    , hideTogglerOnSlide: true		// hide the toggler when pane is 'slid open'
                    , togglerTip_open: 'Close'
                    , togglerTip_closed: 'Open'
                    , resizerTip: 'resize'
                        //	effect defaults - overridden on some panes
                    , fxName: "slide"		// none, slide, drop, scale
                    , fxSpeed_open: 750
                    , fxSpeed_close: 1500
                    , fxSettings_open: { easing: "easeInQuint" }
                    , fxSettings_close: { easing: "easeOutQuint" }		// hide the toggler when pane is 'slid open'
                    },
                    west: {
                        minSize: 400,
                        spacing_closed: 21, 		// wider space when closed
                        togglerLength_closed: 21, 		// make toggler 'square' - 21x21
                        togglerAlign_closed: "top", 	// align to top of resizer
                        togglerLength_open: 0, 			// NONE - using custom togglers INSIDE east-pane
                        slideTrigger_open: "mouseover",
                        //	override default effect, speed, and settings
                        fxName: "drop",
                        fxSpeed: "normal",
                        fxSettings_open: { easing: "easeOutQuint" },
                        fxSettings_close: { easing: "easeInQuint" },
                        resizable: false

                    },
                    center__onopen_end: scope.resize,
                    center__onclose_end: scope.resize,
                    center__onresize_end: scope.resize

                });


                // save selector strings to vars so we don't have to repeat it
                // must prefix paneClass with "#mySplitter > " to target ONLY the outerLayout panes
                var westSelector = "#mySplitter > .ui-layout-west"; // outer-east pane

                // CREATE SPANs for pin-buttons - using a generic class as identifiers
                //$("<span></span>").addClass("pin-button").prependTo(eastSelector);
                // BIND events to pin-buttons to make them functional
                scope.myLayout.addPinBtn(westSelector + " .pin-button", "west");

                scope.showConditions = function (isImproving, minutes) {
                    elm.find('.degrading-value').hide();
                    elm.find('.degrading-arrow').hide();
                    elm.find('.degrading-text').hide();

                    elm.find('.improving-value').hide();
                    elm.find('.improving-arrow').hide();
                    elm.find('.improving-text').hide();

                    if (isImproving) {
                        elm.find('.improving-value').show();
                        elm.find('.improving-arrow').show();
                        elm.find('.improving-text').show();
                        elm.find('.improving-value .text-time').html(minutes ? minutes : 0);
                        elm.find('#leftPanel').css('background-color', '#d7f4d7');
                    }
                    else {
                        elm.find('.degrading-value').show();
                        elm.find('.degrading-arrow').show();
                        elm.find('.degrading-text').show();
                        elm.find('.degrading-value .text-time').html(minutes ? minutes : 0);
                        elm.find('#leftPanel').css('background-color', '#fecccc');
                    }

                }
                elm.find('#map').height(elm.height());
                elm.find('#leftPanel').height(elm.height());
                // Set the location to be Colosseum
                MapService.initialize(scope, "map");

            }
        };
    }]);
});