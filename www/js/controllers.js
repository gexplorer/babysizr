angular.module('controllers', ['ionic.contrib.ui.cards', 'services', 'utils', 'ionic-datepicker'])

    .controller('CardController', function ($scope, $ionicSwipeCardDelegate, CardService, Colors, $ionicLoading, $ionicModal) {
        $scope.stack = CardService.getCards();
        $scope.currentWeek = CardService.getCurrentWeek();
        $scope.index = $scope.currentWeek - 1;
        $scope.cards = [$scope.stack[$scope.index]];
        $scope.bg = Colors.get($scope.cards[0].color);

        var defaultDate = new Date();
        defaultDate.setMonth(defaultDate.getMonth() + 9);

        $scope.dueDate = CardService.getDueDate();

        $ionicModal.fromTemplateUrl('/js/config.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.config = modal;

            if ($scope.dueDate == null) {
                $scope.dueDate = defaultDate;
                CardService.setDueDate(defaultDate);
                $scope.config.show();
            }
        });

        $scope.datepicker = {
            titleLabel: 'Due date',
            inputDate: defaultDate,
            mondayFirst: true,
            templateType: 'popup',
            from: new Date(),
            callback: function (date) {
                if (typeof(date) !== 'undefined') {
                    $scope.dueDate = date;
                    CardService.setDueDate(date);
                }
            }
        };

        $scope.openConfig = function () {
            console.log("    . open");
            $scope.config.show();
        };
        $scope.closeConfig = function () {
            console.log("    . close");
            $scope.config.hide();
        };

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
