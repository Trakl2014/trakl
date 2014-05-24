define([
	'traklview',
    'text!templates/route/routemain.htm',
    'models/Model',
    'jqueryui',
    'jquerylayout',
    'markerLabel',
    'googleLayer'
], function (view, template, Model) {
    //View for the header
    LeftPanelView = view.extend({
        el: $("#main"),
        template: Handlebars.compile(template),
        initialize: function () {
            _.bindAll(this, 'open', 'close', 'render', 'resize');
            TraklApp.appendJqueryLayoutCss();
        },
        render: function () {
            $(this.el).html(this.template());

            this.$('#mySplitter').height(this.$el.height());
            this.$('#mySplitter').width(this.$el.width());

            this.myLayout = $('#mySplitter').layout({
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
                , togglerTip_open: l("%layout.close_pane")
                , togglerTip_closed: l("%layout.open_pane")
                , resizerTip: l("%layout.resize_pane")
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
                    fxSettings: { easing: "" }, // nullify default easing
                    resizable: false

                },
                center__onopen_end: this.resize,
                center__onclose_end: this.resize,
                center__onresize_end: this.resize

            });

            // save selector strings to vars so we don't have to repeat it
            // must prefix paneClass with "#mySplitter > " to target ONLY the outerLayout panes
            var westSelector = "#mySplitter > .ui-layout-west"; // outer-east pane

            // CREATE SPANs for pin-buttons - using a generic class as identifiers
            //$("<span></span>").addClass("pin-button").prependTo(eastSelector);
            // BIND events to pin-buttons to make them functional
            this.myLayout.addPinBtn(westSelector + " .pin-button", "west");

            this.setPageLayout();
            this.loadMap();

            this.loadData();
        },
        open: function () {
            document.title = "Route";
            this.model = new Model();
            this.model.urlRoot = 'dominion_rd.json';

            this.model.fetch({
                success: this.render,
                error: function (a, b, c) {

                }
            })
        },
        loadData: function () {
            var data = this.model.toJSON();
        },
        loadMap: function () {
            var mapOptions = {
                zoom: 5,
                center: this.getLatLng(),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: true,
                panControl: true,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                overviewMapControl: false,
                navigationControl: false
            };

            this.map = new google.maps.Map(this.$('#map')[0], mapOptions);
            var myMap = this.map;

            this.infoWindow = new google.maps.InfoWindow();
            this.gBounds = new google.maps.LatLngBounds();
        },
        getLatLng: function () {
            if (google.loader.ClientLocation != null) {
                return new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
            }
            return new google.maps.LatLng(-36.836218, 174.762955);
        },
        resize: function () {
            this.$('#mySplitter').height(this.$el.height());
            this.$('#mySplitter').width(this.$el.width());

            this.setPageLayout();
            google.maps.event.trigger(this.map, 'resize');
        },
        setPageLayout: function () {
            this.$('#map').width(this.$('.ui-layout-center').width());
            this.$('#map').height(this.$('.ui-layout-center').height());

        },
        close: function () {
            this.$el.unbind();
            this.$el.empty();
            this.unbind();
        }
    });

    return LeftPanelView;
});