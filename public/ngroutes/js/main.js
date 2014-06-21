require.config({

    baseUrl: "js/scripts",
    
	// alias libraries paths
    paths: {
        'angular': '../lib/angular/angular',
        'angular-route': '../lib/angular/angular-route',
        'async': '../lib/requirejs/async',
        'angularAMD': '../lib/requirejs/angularAMD',
        'ngload': '../lib/requirejs/ngload',
        'ui-bootstrap': '../lib/angular-ui-bootstrap/ui-bootstrap-tpls',
        'prettify': '../lib/google-code-prettify/prettify',
        'jquery': '../lib/jquery/jquery',
        'jquery-layout': '../lib/jquery/jquery.layout',
        'jquery-ui': '../lib/jquery/jquery.ui',
        'jquery-blockUI': '../lib/jquery/jquery.blockUI',

        'HomeController': 'controllers/home_ctrl',
        'MapController': 'controllers/map_ctrl',
        'PicturesController': 'controllers/pictures_ctrl',
        'ModulesController': 'controllers/modules_ctrl',
        'RouteController': 'controllers/route_ctrl'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angular': ['jquery'],
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'jquery-ui': ['jquery'],
        'jquery-layout': ['jquery'],
        'jquery-blockUI': ['jquery']
    },

    // kick start application
    deps: ['app']
});
