angular.module('controllers', ['ionic.contrib.ui.cards', 'services'])

    .controller('CardController', function ($scope, $ionicSwipeCardDelegate, CardService) {
        $scope.bg = faker.internet.color();

        $scope.stack = CardService.getCards();
        $scope.currentWeek = CardService.calculateWeek();
        $scope.index = $scope.currentWeek - 1;
        $scope.cards = [$scope.stack[$scope.index]];

        $scope.cardSwipedUp = function () {
            if ($scope.index > 0) {
                $scope.bg = faker.internet.color();
                $scope.index--;
                $scope.cards.push($scope.stack[$scope.index]);
                return true;
            } else {
                return false;
            }
        };

        $scope.cardSwipedDown = function () {
            if ($scope.index < $scope.currentWeek - 1) {
                $scope.bg = faker.internet.color();
                $scope.index++;
                $scope.cards.push($scope.stack[$scope.index]);
                return true;
            } else {
                return false;
            }
        };

        $scope.cardDestroyed = function (index) {
            $scope.cards.splice(index, 1);
        };

        $scope.addCard = function () {
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
        };

        $scope.goAway = function () {
            var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
            card.swipe();
        };
    });