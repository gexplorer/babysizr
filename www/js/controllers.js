angular.module('controllers', ['ionic.contrib.ui.cards', 'services', 'utils', 'ionic-datepicker'])

    .controller('CardController', function ($scope, $ionicSwipeCardDelegate, CardService, Colors, $ionicLoading, $ionicModal) {
        $scope.stack = CardService.getCards();
        $scope.currentWeek = CardService.getCurrentWeek();

        $scope.dueDate = new Date();
        $scope.dueDate.setMonth($scope.dueDate.getMonth() + 8);

        if ($scope.currentWeek) {
            $scope.index = $scope.currentWeek - 1;
            $scope.cards = [$scope.stack[$scope.index]];
            $scope.bg = Colors.get($scope.cards[0].color);
            $scope.dueDate = CardService.getDueDate();
        }

        $ionicModal.fromTemplateUrl('/js/config.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.config = modal;

            if (CardService.getDueDate() == null) {
                CardService.setDueDate($scope.dueDate);
                $scope.config.show();
            }
        });


        $scope.datepicker = {
            titleLabel: 'Due date',
            inputDate: $scope.dueDate,
            mondayFirst: true,
            templateType: 'popup',
            from: new Date(),
            callback: function (date) {
                if (typeof(date) !== 'undefined') {
                    CardService.setDueDate(date);
                    $scope.datepicker.inputDate = date;
                }
            }
        };

        $scope.openConfig = function () {
            $scope.config.show();
        };

        $scope.closeConfig = function () {
            $scope.currentWeek = CardService.getCurrentWeek();
            $scope.index = $scope.currentWeek - 1;
            $scope.cards = [$scope.stack[$scope.index]];
            $scope.bg = Colors.get($scope.cards[0].color);
            $scope.config.hide();
        };

        $scope.cardSwipedUp = function () {
            if ($scope.index > 0) {
                $scope.index--;
                var card = $scope.stack[$scope.index];
                $scope.bg = Colors.get(card.color);
                $scope.cards.push(card);
                return true;
            } else {
                return false;
            }
        };

        $scope.cardSwipedDown = function () {
            if ($scope.index < $scope.currentWeek) {
                $scope.index++;
                var card = $scope.stack[$scope.index]
                $scope.bg = Colors.get(card.color);
                $scope.cards.push(card);
                return true;
            } else {
                $ionicLoading.show({
                    template: "You are still in week " + ($scope.currentWeek + 1) + ".<br/>Come next week for more!",
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
