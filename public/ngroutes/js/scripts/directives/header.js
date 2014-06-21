/*jslint node: true */
/*global define */
define(['app'], function (app) {
    app.directive('header', function () {
        return {
            restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            scope: { user: '=' }, // This is one of the cool things :). Will be explained in post.
            templateUrl: "js/scripts/directives/templates/header.html",
            controller: function ($scope, $route, $window, $location) {
                // Your behaviour goes here :)
            }
        }
    });
});