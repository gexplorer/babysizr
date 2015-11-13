angular.module('services', ['data'])

    .factory('CardService', function (cards, $localStorage) {

        cards[-1] = {number: 0, title: 'Welcome!', sizeFrom: 0, sizeTo: 0, weightFrom: 0, weightTo: 0, color: 'teal', quote: 'Swipe up/down to navigate between cards.'};

        function getDueDate() {
            return $localStorage.getDate('dueDate');
        }

        function setDueDate(date) {
            if(date) {
                $localStorage.putDate('dueDate', date);
            }
        }

        function getCards() {
            return cards;
        }

        function getCurrentWeek(dueDate) {
            var today = new Date();
            var tmpDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

            var currentWeek = 40;
            while (tmpDate <= dueDate && currentWeek > 1) {
                tmpDate.setDate(tmpDate.getDate() + 7);
                currentWeek--;
            }
            return currentWeek;
        }

        return {
            getDueDate: getDueDate,
            setDueDate: setDueDate,
            getCards: getCards,
            getCurrentWeek: getCurrentWeek
        }
    })

    .factory('$localStorage', ['$window', function ($window) {
        return {
            put: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            putObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            putDate: function (key, value) {
                $window.localStorage[key] = value;
            },
            getDate: function (key) {
                var tmpDate = $window.localStorage[key];
                if (tmpDate) {
                    return new Date(tmpDate);
                } else {
                    return null;
                }
            },
            remove: function (key) {
                if ($window.localStorage[key]) {
                    $window.localStorage[key] = null;
                }
            }
        }
    }]);
