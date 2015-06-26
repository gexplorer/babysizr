angular.module('controllers', ['ionic.contrib.ui.cards', 'services'])

    .controller('CardController', function ($scope, $ionicSwipeCardDelegate, CardService) {
        var cardTypes = CardService.getWeeks();
        $scope.bg = faker.internet.color();

        $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

        $scope.cardSwipedUp = function () {
            $scope.addCard();
            $scope.bg = faker.internet.color();
            return true;
        };

        $scope.cardSwipedDown = function () {
            $scope.addCard();
            $scope.bg = faker.internet.color();
            return true;
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