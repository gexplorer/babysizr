angular.module('controllers', ['ionic.contrib.ui.cards', 'services', 'utils'])

    .controller('CardController', function ($scope, $ionicSwipeCardDelegate, CardService, Colors, $ionicLoading) {
        $scope.stack = CardService.getCards();
        $scope.currentWeek = CardService.getCurrentWeek();
        $scope.index = $scope.currentWeek - 1;
        $scope.cards = [$scope.stack[$scope.index]];
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
                $ionicLoading.show({
                    template: "You are still in week " + $scope.currentWeek + ".<br/>Come next week for more!",
                    duration: 2000
                });
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
