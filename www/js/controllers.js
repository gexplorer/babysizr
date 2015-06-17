angular.module('controllers', ['services'])

    .controller('WeeksController', function ($scope, WeeksService) {
        $scope.dueDate = new Date(2015, 11, 2);
        $scope.weekNumber = WeeksService.calculateWeek($scope.dueDate);

        $scope.weeks = WeeksService.getWeeks();
    });
