angular.module('controllers', [])

    .controller('WeeksController', function ($scope) {
        $scope.today = new Date();
        $scope.dueDate = new Date(2015, 11, 2);
        $scope.weekNumber = 16;

        $scope.weeks = [
            {
                number: 17,
                size: "200 mm",
                weight: "250 gr",
                title: "Another thing",
                image: "rubik.png",
                quote: "Lorem ipsum."
            },
            {
                number: 16,
                size: "150 mm",
                weight: "110 gr",
                title: "A Rubik's cube",
                image: "rubik.png",
                quote: "A good puzzle, it's a fair thing. Nobody it's lying. It's very clear, and the problem depends just on you."
            }
        ]
    });
