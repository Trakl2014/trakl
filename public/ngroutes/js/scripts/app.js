define(['angularAMD', 'angular-route', 'jquery-blockUI'], function (angularAMD) {
    var app = angular.module("ngreq-app", ['ngRoute']);
    $.blockUI.defaults.message = '<h3><img src="images/ajax-loader.gif" />' + ' Loading</h3>';
    /**
     * Configure Angular ngApp with route and cache the needed providers
     */
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/route", angularAMD.route({
                templateUrl: 'views/route.html', controller: 'RouteController'
            }))
            .otherwise({redirectTo: '/route'})
    });
    
    // Add support for pretty print
    app.directive('prettyprint', function() {
        return {
            restrict: 'C',
            link: function postLink(scope, element, attrs) {
                  element.html(prettyPrint(scope.dom));
            }
        };
    });
        
    // Bootstrap Angular when DOM is ready
    angularAMD.bootstrap(app);

    return app;
});
