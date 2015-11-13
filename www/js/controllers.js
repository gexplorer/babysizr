angular.module('controllers', ['ionic.contrib.ui.cards', 'services', 'utils', 'ionic-datepicker'])

    .controller('CardController', function ($scope, $ionicSwipeCardDelegate, CardService, Colors, $ionicLoading, $ionicModal) {
        $scope.stack = CardService.getCards();

        $scope.dueDate = new Date();
        $scope.dueDate.setMonth($scope.dueDate.getMonth() + 9);
        $scope.lastDate = new Date($scope.dueDate.getTime());

        $scope.currentWeek = CardService.getCurrentWeek($scope.dueDate);
        $scope.index = $scope.currentWeek - 1;
        $scope.firstCard = -1;

        var storedDate = CardService.getDueDate();
        if (storedDate) {
            $scope.dueDate = storedDate;
            $scope.currentWeek = CardService.getCurrentWeek($scope.dueDate);
            $scope.index = $scope.currentWeek - 1;
        } else {
            CardService.setDueDate($scope.dueDate);
            $scope.index = $scope.firstCard;
        }

        $scope.cards = [$scope.stack[$scope.index]];
        $scope.bg = Colors.get($scope.cards[0].color);

        $scope.openConfig = function () {
            if (!$scope.datepicker) {
                $scope.datepicker = {
                    inputDate: $scope.dueDate,
                    mondayFirst: true,
                    templateType: 'popup',
                    from: new Date(),
                    to: $scope.lastDate,
                    callback: function (date) {
                        if (typeof(date) !== 'undefined') {
                            $scope.dueDate = date;
                            $scope.datepicker.inputDate = date;
                        }
                    }
                }
            }
            $scope.datepicker.inputDate = $scope.dueDate;

            if (!$scope.config) {
                $ionicModal.fromTemplateUrl('config.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.config = modal;
                    $scope.config.show();
                });
            } else {
                $scope.config.show();
            }

        };

        $scope.closeConfig = function () {
            CardService.setDueDate($scope.dueDate);
            $scope.currentWeek = CardService.getCurrentWeek($scope.dueDate);
            $scope.index = $scope.currentWeek - 1;
            $scope.cards = [$scope.stack[$scope.index]];
            $scope.bg = Colors.get($scope.cards[0].color);
            $scope.config.hide();
        };

        $scope.cardSwipedUp = function () {
            if ($scope.index > $scope.firstCard) {
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
            if ($scope.index < $scope.currentWeek - 1) {
                $scope.index++;
                var card = $scope.stack[$scope.index];
                $scope.bg = Colors.get(card.color);
                $scope.cards.push(card);
                return true;
            } else {
                var template = "You are still in week " + $scope.currentWeek + ".<br/>Come next week for more!";
                if ($scope.currentWeek == 40) {
                    template = "Finally week 40, isn\'t it exciting?";
                }
                $ionicLoading.show({
                    template: template,
                    duration: 2000
                });
                return false;
            }
        };

        $scope.cardDestroyed = function (index) {
            $scope.cards.splice(index, 1);
        };

    });
