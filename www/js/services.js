angular.module('services', ['data'])

    .factory('CardService', function (cards, $localStorage) {
        var dueDate = $localStorage.getDate('dueDate');

        function getDueDate() {
            return dueDate;
        }

        function setDueDate(date) {
            $localStorage.putDate('dueDate', date);
            dueDate = date;
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
