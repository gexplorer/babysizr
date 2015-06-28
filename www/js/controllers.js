angular.module('controllers', ['ionic.contrib.ui.cards', 'services', 'utils'])

    .controller('CardController', function ($scope, $ionicSwipeCardDelegate, CardService, Colors) {
        $scope.stack = CardService.getCards();
        $scope.currentWeek = CardService.calculateWeek();
        $scope.index = $scope.currentWeek - 1;
        $scope.cards = [$scope.stack[$scope.index]];
        console.log($scope.cards[0]);
        $scope.bg = Colors.get($scope.cards[0].color);

        $scope.cardSwipedUp = function () {
            if ($scope.index > 0) {
                $scope.index--;
                var card = $scope.stack[$scope.index]
                $scope.bg = Colors.get(card.color);
                $scope.cards.push(card);
                return true;
            } else {
                return false;
            }
        };

        $scope.cardSwipedDown = function () {
            if ($scope.index < $scope.currentWeek - 1) {
                $scope.index++;
                var card = $scope.stack[$scope.index]
                $scope.bg = Colors.get(card.color);
                $scope.cards.push(card);
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