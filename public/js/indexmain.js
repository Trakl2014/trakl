require.config({
	paths : {
	    jquery: '../assets/js/libs/jquery',
		underscore: '../assets/js/libs/underscore',
		backbone: '../assets/js/libs/backbone',
		text: '../assets/js/libs/text',
		handlebars : '../assets/js/libs/handlebars',
		templates : '../assets/templates',
		modules : 'modules',
		models: 'models',
        views: 'views',
        libs: '../assets/libs',
        traklview: 'views/traklview',
        datehelper: '../assets/js/libs/datehelper',
        jquerycookie: '../assets/js/libs/jquery.cookie',
        jquerystorage: '../assets/js/libs/jquery.storage',
        jqueryhelper: '../assets/js/libs/helper.jQuery',
        jqueryvalidate: '../assets/js/libs/jquery.validate',
        jqgrid: '../assets/js/jqGrid/js/jquery.jqGrid.min',
        jqgridlocale: '../assets/js/jqGrid/js/i18n/grid.locale-en',
        jquerylayout: '../assets/js/libs/jquery.layout',
        jqueryui: '../assets/js/libs/jquery.ui',
        jquerydatetimepicker: '../assets/js/libs/jquery.ui.timepicker.addon',
        jquerytimeago: '../assets/js/libs/jquery.timeago',
        jqueryhoverintent: '../assets/js/libs/jquery.hoverintent',
        css: '../assets/js/libs/css.min',
        async: '../assets/js/libs/async',
        goog: '../assets/js/libs/goog',
        googleLayer: '../assets/js/libs/GoogleLayer',
        markerLabel: '../assets/js/libs/markerwithlabel',
        googlecurvedline: '../assets/js/libs/jquery.curved.line-0.0.2',
        markerclusterer: '../assets/js/libs/markerclusterer',
        propertyParser: '../assets/js/libs/propertyParser',
        l10n: '../assets/js/libs/l10n',
        localizations: '../assets/localize/localizations',
        blockui : '../assets/js/libs/jquery.blockUI',
        datefunctions: '../assets/js/libs/date-functions',
        jcarousel: '../assets/js/libs/jquery.jcarousel',
        maptooltip: '../assets/libs/vx.map.markertooltip',
        convexhull: '../assets/js/libs/Convex_hull',
        oms: '../assets/js/libs/oms.min',
        jquerylayout: '../assets/js/libs/jquery.layout',
        dc: '../assets/js/libs/dc',
        d3: '../assets/js/libs/d3',
        crossfilter: '../assets/js/libs/crossfilter',
        multipleselect: '../assets/js/libs/jquery.multiple.select',
        balloonPopup: '../assets/js/libs/jquery.balloon'

	},
    shim: {
		'underscore' : {
			exports: '_'
		},
		'jquery' : {
			exports: 'jQuery'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'goog': {

        },
        'jquerycookie': ['jquery'],
        'jquerystorage': ['jquerycookie'],
        'jqueryhelper': ['jquery'],
		'jqueryvalidate':['jquery'],
		'jqgrid': ['jquery'],
		'jqgridlocale':['jquery'],
		'jqueryui':['jquery'],
		'jquerydatetimepicker': ['jqueryui'],
		'jquerylayout': ['jqueryui'],
		'localizations':['l10n'],
		'blockui':['jquery'],
		'jquerylayout': ['jqueryui'],
        'markerLabel': ['goog!maps,3.x,other_params:sensor=true&libraries=geometry'],
        'googlecurvedline': ['goog!maps,3.x,other_params:sensor=true&libraries=geometry'],
        'markerclusterer': ['goog!maps,3.x,other_params:sensor=true&libraries=geometry'],
        'tooltip': ['goog', 'goog!maps,3.x,other_params:sensor=true&libraries=geometry', 'googleLayer'],
        'maptooltip': ['goog', 'goog!maps,3.x,other_params:sensor=true&libraries=geometry', 'googleLayer'],
        'oms': ['goog', 'goog!maps,3.x,other_params:sensor=true&libraries=geometry', 'googleLayer'],
        'jquerylayout': ['jqueryui'],
        'dc': ['d3', 'crossfilter']
    },
    waitSeconds: 60
});

var TraklApp;
var version = "1.0.0.0";

require(['indexapp'], function (app) {
    TraklApp = app;

    require.config({
        urlArgs: "bust" + version.replace(/\./g,"")
    });

    $.expr[':'].containsIgnoreCase = function (n, i, m) {
        return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    $.expr[':'].notcontainsIgnoreCase = function (n, i, m) {
        return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) < 0;
    };

    $.ajaxSetup({
        'beforeSend': function (xhr) {
            /////if (TraklApp.State.get("tokenid")) {
                //xhr.setRequestHeader("app-auth-fetch-qualifier", TraklApp.State.get("tokenid"));
                /*xhr.setRequestHeader("Access-Control-Allow-Origin", "http://trakl.herokuapp.com");
                xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
                xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");*/
           // }
        },
        cache: false
    });

    TraklApp.initialize();
});