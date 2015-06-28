angular.module('utils', [])

    .factory('Colors', function () {
        function get() {
            return faker.internet.color();
        }

        return {
            get: get
        }
    });