angular.module('services', [])

    .factory('WeeksService', function () {
        var weeks = [];

        for (var n = 10; n > 0; n--) {
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

        return {
            getWeeks: function () {
                return weeks;
            }
        }
    });
