define(['app', 'services/mapServices', 'directives/header', 'directives/footer', 'directives/uilayout'], function (app) {
    app.controller('RouteController', function ($scope, $http, $interval, MapService) {

        $scope.journeys = [];
        $scope.selectedJourney = {};
        var timerId;

        $.blockUI();
        $http.get('/Auckland-Journeys.json').success(function (data) {
            $scope.journeys = data;
            
        })
        .then(function (data) {
            $http.get('/api/travel-time', { params: { userId: 44 } }).success(function (data) {
                $scope.selectedJourney = $.grep($scope.journeys, function (j) {
                    return data.journeyRef === j.ref;
                })[0];
                $scope.showConditions(data.isImproving === "true", data.travelMinutes);

                $scope.retrieveJourneyTraffic();
                MapService.showDirections($scope.selectedJourney);
                $.unblockUI();
            });
        })

        $scope.stopPolling = function () {
            if (angular.isDefined(timerId)) {
                $interval.cancel(timerId);
                timerId = undefined;
            }
        };

        $scope.ddlRouteChange = function () {
            $.blockUI();
            if (angular.isDefined(timerId)) $scope.stopPolling();

            $http.post('/api/travel-time', {
                data: { userId: 44, journeyRef: $scope.selectedJourney.ref }
            })
            .then(function (data) {
                $scope.retrieveJourneyTraffic();
                MapService.showDirections($scope.selectedJourney);
                $.unblockUI();
            });
        }

        $scope.retrieveJourneyTraffic = function () {
            $http.get('/api/travel-time', { params: { userId: 44 } }).success(function (data) {
                $scope.showConditions(data.isImproving === "true", data.travelMinutes);
            });

            if (angular.isDefined(timerId)) $scope.stopPolling();

            timerId = $interval(function () {
                $scope.retrieveJourneyTraffic()
            }, 30000);   
        }

        $scope.$on('$destroy', function () {
            // Make sure that the interval is destroyed too
            $scope.stopPolling();
        });
    })
    
});
