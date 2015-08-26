angular.module('controllers', ['ionic.contrib.ui.cards', 'services', 'utils', 'ionic-datepicker'])

    .controller('CardController', function ($scope, $ionicSwipeCardDelegate, CardService, Colors, $ionicLoading, $ionicModal) {
        $scope.stack = CardService.getCards();
        $scope.currentWeek = CardService.getCurrentWeek();
        $scope.index = $scope.currentWeek - 1;
        $scope.cards = [$scope.stack[$scope.index]];
        $scope.bg = Colors.get($scope.cards[0].color);

        var datePickerCallback = function (date) {
            if (typeof(date) === 'undefined') {
                console.log('  - No date selected');
            } else {
                console.log("  - Selected date: ", date);
                CardService.setDueDate(date);
                console.log("* saved: ", CardService.getDueDate())
            }
        };

        $scope.datepicker = {
            titleLabel: 'Due date',
            todayLabel: 'Today',
            closeLabel: 'Close',
            setLabel: 'Save',
            setButtonType: 'button-balanced',
            todayButtonType: 'button-stable',
            closeButtonType: 'button-assertive',
            inputDate: new Date(),
            mondayFirst: true,
            templateType: 'popup',
            modalHeaderColor: 'bar-positive',
            modalFooterColor: 'bar-positive',
            from: new Date(2012, 8, 2),
            to: new Date(2018, 8, 25),
            callback: function (val) {
                datePickerCallback(val);
            }
        };

        $ionicModal.fromTemplateUrl('/js/config.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.config = modal;

            console.log("* Due date:");
            if (CardService.getDueDate() == null) {
                console.log("  - Ask for it");
                $scope.config.show();
            } else {
                console.log("  - " + CardService.getDueDate());
            }
        });

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
