angular.module('services', ['data'])

    .factory('CardService', function (cards) {

        function getCards() {
            return cards;
        }

        function calculateWeek(date) {
            var today = new Date();
            return 17;
        }

        return {
            getCards: getCards,
            calculateWeek: calculateWeek
        }
    });
