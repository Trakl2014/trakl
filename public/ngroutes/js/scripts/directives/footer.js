define(['app'], function (app) {
    app.directive('footer', function () {
        return {
            restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            templateUrl: "js/scripts/directives/templates/footer.html",
            controller: function ($scope, $route, $window, $location) {
                // Your behaviour goes here :)
            }
        }
    });
});