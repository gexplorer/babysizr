angular.module('controllers', [])

    .controller('WeeksController', function ($scope) {
        $scope.today = new Date();
        $scope.dueDate = new Date(2015, 11, 2);
        $scope.weekNumber = 16;
        $scope.days = 112;
    });
