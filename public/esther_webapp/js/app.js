(function() {
    'use strict';
    var onsenApp = angular.module('myApp', ['onsen.directives']);
    onsenApp.controller('dataCtrl', function($scope, $http, $interval) {
        $scope.data = [];
        $scope.sampleResponse_old = {
            "userId": "24",
            "journeyRef": "tamaki",
            "travelMinutes": "34",
            "isImproving": true
        }

        // $scope.sampleResponse = {
        //     __v: 0,
        //     _id: "5380ba48cd8df6ef3d6436dc",
        //     isImproving: "true",
        //     journeyRef: "R05-EB",
        //     travelMinutes: "26",
        //     userId: "44"
        // }

        $scope.trafficData = [];
        console.log($scope.data);
        $scope.handleDataLoaded = function(data, status) {
            $scope.sampleResponse = data;
            console.log('handle', $scope.sampleResponse, data)
        }

        $scope.fetch = function() {
            $http.get('/api/travel-time?userId=44').success($scope.handleDataLoaded);
            console.log('scope fetch')
            // $http({
            //     method: 'GET',
            //     url: 'javascripts/fieldDemoData2.json'
            // }).
            // success($scope.handleDataLoaded).
            // error(function(data, status, headers, config) {
            //     // called asynchronously if an error occurs
            //     // or server returns response with an error status.
            //     alert('status')
            // });
        }
        $scope.fetch();
        $interval($scope.fetch, 5000);
        // $scope.fetch();
    })
})();