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
            var today = new Date();
            return 17;
        }

        return {
            getDueDate: getDueDate,
            setDueDate: setDueDate,
            getCards: getCards,
            getCurrentWeek: getCurrentWeek
        }
    });
