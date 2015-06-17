angular.module('controllers', ['services'])

    .controller('WeeksController', function ($scope, WeeksService) {
        $scope.today = new Date();
        $scope.dueDate = new Date(2015, 11, 2);
        $scope.weekNumber = 16;

        $scope.weeks = WeeksService.getWeeks();
    });
