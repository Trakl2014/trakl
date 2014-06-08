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
        $scope.user = {};
        $scope.dummy = {
            "id": "10152538208191289",
            "email": "leeblazek@gmail.com",
            "first_name": "Lee",
            "gender": "male",
            "last_name": "Blazek",
            "link": "https://www.facebook.com/app_scoped_user_id/10152538208191289/",
            "locale": "en_US",
            "name": "Lee Blazek",
            "timezone": 12,
            "updated_time": "2014-03-08T13:25:35+0000",
            "verified": true
        }
        // Defining user logged status
        $scope.logged = false;

        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;

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
            $http.post('/createuser', $scope.dummy).success(function(data) {
                console.log('data' + data);
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
                    $scope.user = response;
                });

                //added by lee to post create user
                $http.post('/createuser', $scope.user).success(function(data) {
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