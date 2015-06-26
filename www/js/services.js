angular.module('services', [])

    .factory('CardService', function () {
        var weeks = [];

        for (var n = 0; n < 10; n++) {
            weeks.push({
                number: n,
                size: faker.address.zipCode() + " mm",
                weight: faker.address.zipCode() + " gr",
                title: faker.company.catchPhrase(),
                avatar: faker.image.avatar(),
                image: faker.image.image(),
                quote: faker.lorem.paragraph()
            });
        }

        function getWeeks() {
            return weeks;
        }

        function calculateWeek(date) {
            var today = new Date();
            return 16;
        }

        return {
            getWeeks: getWeeks,
            calculateWeek: calculateWeek
        }
    });
