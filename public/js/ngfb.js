angular.module('TraklFbApp', ['facebook'])

.config([
    'FacebookProvider',
    function(FacebookProvider) {
        var myAppId = '230446117153579';

        // You can set appId with setApp method
        // FacebookProvider.setAppId('myAppId');

        /**
         * After setting appId you need to initialize the module.
         * You can pass the appId on the init method as a shortcut too.
         */
        FacebookProvider.init(myAppId);

    }
])

.controller('MainController', [
    '$scope',
    '$http',
    '$timeout',
    'Facebook',
    function($scope, $http, $timeout, Facebook) {

        // Define user empty data :/
        $scope.user = {
            "id": "",
            "userId": "",
            "email": "",
            "first_name": "",
            "gender": "",
            "last_name": "",
            "link": "",
            "locale": "",
            "name": "",
            "timezone": 12,
            "updated_time": "",
            "verified": false,
            "journey": "",
            "device": "",
            "deviceIdentifier": ""
        };
        $scope.journeys = {};
        $scope.myJourney = {};
        $scope.devices = ["ios", "android"];

        $scope.dummy = {
            "id": "10152538208191289",
            "userId": "",
            "email": "leeblazek@gmail.com",
            "first_name": "Lee",
            "gender": "male",
            "last_name": "Blazek",
            "link": "https://www.facebook.com/app_scoped_user_id/10152538208191289/",
            "locale": "en_US",
            "name": "Lee Blazek",
            "timezone": 144,
            "updated_time": "2014-03-08T13:25:35+0000",
            "verified": true,
            "journey": "",
            "device": "device",
            "deviceIdentifier": "dsdsdsd"
        }
        // Defining user logged status
        $scope.logged = false;

        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;

        $http.get('data/journeys-june2014.json').success(function(data) {
            $scope.journeys = data;
        })

        /**
         * Watch for Facebook to be ready.
         * There's also the event that could be used
         */
        $scope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        /**
         * IntentLogin
         */
        $scope.IntentLogin = function() {
            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    $scope.me();
                } else
                    $scope.login();
            });
        };

        /**
         * Login
         */
        $scope.login = function() {
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    $scope.me();
                }

            });
        };

        $scope.testhttp = function() {
            $scope.dummy.journey = $scope.myJourney.name;
            $http.post('/api/createuser', $scope.dummy).success(function(data) {
                console.log('data' + data);
                console.log($scope.myJourney.name);
            });
        }

        /**
         * me
         */
        $scope.me = function() {
            Facebook.api('/me', function(response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */
                $scope.$apply(function() {
                    // $scope.user = response;
                    $scope.user.id = response.id;
                    $scope.user.userId = response.id;
                    $scope.user.email = response.email;
                    $scope.user.first_name = response.first_name;
                    $scope.user.gender = response.gender;
                    $scope.user.link = response.link;
                    $scope.user.locale = response.locale;
                    $scope.user.name = response.name;
                    $scope.user.timezone = response.timezone;
                    $scope.user.updated_time = response.updated_time;
                    $scope.user.verified = response.verified;
                    $scope.user.journey = $scope.myJourney.name;
                });

                //added by lee to post create user
                $http.post('/api/createuser', $scope.user).success(function(data) {
                    console.log('data' + data);
                });

            });
        };

        /**
         * Logout
         */
        $scope.logout = function() {
            Facebook.logout(function() {
                $scope.$apply(function() {
                    $scope.user = {};
                    $scope.logged = false;
                });
            });
        }

        /**
         * Taking approach of Events :D
         */
        $scope.$on('Facebook:statusChange', function(ev, data) {
            console.log('Status: ', data);
            if (data.status == 'connected') {
                $scope.$apply(function() {
                    $scope.salutation = true;
                    $scope.byebye = false;
                });
            } else {
                $scope.$apply(function() {
                    $scope.salutation = false;
                    $scope.byebye = true;

                    // Dismiss byebye message after two seconds
                    $timeout(function() {
                        $scope.byebye = false;
                    }, 2000)
                });
            }


        });


    }
])

/**
 * Just for debugging purposes.
 * Shows objects in a pretty way
 */
.directive('debug', function() {
    return {
        restrict: 'E',
        scope: {
            expression: '=val'
        },
        template: '<pre>{{debug(expression)}}</pre>',
        link: function(scope) {
            // pretty-prints
            scope.debug = function(exp) {
                return angular.toJson(exp, true);
            };
        }
    }
})

;