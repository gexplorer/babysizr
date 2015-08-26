angular.module('services', ['data'])

    .factory('CardService', function (cards) {
        var dueDate = null;

        function getDueDate() {
            return dueDate;
        }

        function setDueDate(date) {
            dueDate = date;
        }

        function getCards() {
            return cards;
        }

        function getCurrentWeek() {
            if (!dueDate) {
                return null;
            }
            var today = new Date();
            var millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
            var diff = dueDate - today;
            var diffWeeks = Math.floor(diff / millisecondsInWeek);
            var weekNumber = 41 - diffWeeks;
            if (weekNumber < 0) {
                weekNumber = 0;
            }
            return weekNumber;
        }

        return {
            getDueDate: getDueDate,
            setDueDate: setDueDate,
            getCards: getCards,
            getCurrentWeek: getCurrentWeek
        }
    });
