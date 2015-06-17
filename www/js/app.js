angular.module('babysizr', ['ionic', 'controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('week', {
                url: '/week',
                templateUrl: 'templates/week.html',
                controller: 'WeeksController'
            });

        $urlRouterProvider.otherwise('/week');
    });
