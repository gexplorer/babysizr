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
                return 0;
            }
            var from = new Date();
            var millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
            var diff = dueDate - from;

            return Math.floor(diff / millisecondsInWeek);
        }

        return {
            getDueDate: getDueDate,
            setDueDate: setDueDate,
            getCards: getCards,
            getCurrentWeek: getCurrentWeek
        }
    });
