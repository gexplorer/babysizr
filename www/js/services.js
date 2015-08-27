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

        function calculateWeeks(from, to) {
            var millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
            var diff = to - from;
            var diffWeeks = Math.floor(diff / millisecondsInWeek);
            return ++diffWeeks;
        }

        function getCurrentWeek() {
            if (!dueDate) {
                return null;
            }
            var today = new Date();
            var diffWeeks = calculateWeeks(today, dueDate);
            var weekNumber = 40 - diffWeeks;
            if (weekNumber < 0) {
                weekNumber = 0;
            }else if (weekNumber >= 40){
                weekNumber = 40;
            }
            return weekNumber;
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
                if(tmpDate){
                    return new Date(tmpDate);
                }else{
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
