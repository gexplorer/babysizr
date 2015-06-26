angular.module('services', [])

    .factory('CardService', function () {
        var weeks = [
            {number: 1, title: 'Midiclorians', sizeFrom: 0, sizeTo: 0, weightFrom: 0, weightTo: 0, quote: 'May the force be with you.', image: faker.image.image()},
            {number: 2, title: 'Nanobots', sizeFrom: 0, sizeTo: 0, weightFrom: 0, weightTo: 0, quote: 'Sure, at some level scientists know nanobots will destroy mankind. They just can\'t resist seeing how it happens.', image: faker.image.image()},
            {number: 3, title: 'Innerspace ship', sizeFrom: 0, sizeTo: 0, weightFrom: 0, weightTo: 0, quote: 'I\'m right here, INSIDE you INSIDE YOUR BODY!', image: faker.image.image()},
            {number: 4, title: 'Ant-man', sizeFrom: 0, sizeTo: 1, weightFrom: 0, weightTo: 1, quote: 'One question... Is it too late to change the name?', image: faker.image.image()},
            {number: 5, title: '', sizeFrom: 1, sizeTo: 2, weightFrom: 0, weightTo: 1, quote: 'I\'m right here, INSIDE you INSIDE YOUR BODY!', image: faker.image.image()},
            {number: 6, title: 'Game boy mario bros', sizeFrom: 3, sizeTo: 4, weightFrom: 0, weightTo: 1, quote: 'Thank you so much for playing my game!', image: faker.image.image()},
            {number: 7, title: 'Spiderman spider', sizeFrom: 0, sizeTo: 10, weightFrom: 0, weightTo: 1, quote: 'With great power. comes great responsibility.', image: faker.image.image()},
            {number: 8, title: 'The one ring', sizeFrom: 14, sizeTo: 18, weightFrom: 0, weightTo: 1, quote: 'One ring to rule them all...', image: faker.image.image()},
            {number: 9, title: 'Matrix pill', sizeFrom: 0, sizeTo: 20, weightFrom: 0, weightTo: 2, quote: 'Which one are you gonna choose?', image: faker.image.image()},
            {number: 10, title: 'Inception spinning top', sizeFrom: 30, sizeTo: 40, weightFrom: 0, weightTo: 5, quote: 'You mustn\'t be afraid to dream a little bigger, darling.', image: faker.image.image()},
            {number: 11, title: 'Rubik\'s cube', sizeFrom: 40, sizeTo: 50, weightFrom: 6, weightTo: 8, quote: 'All problems can be solved.', image: faker.image.image()},
            {number: 12, title: 'Tamagotchi', sizeFrom: 0, sizeTo: 60, weightFrom: 8, weightTo: 14, quote: 'Life was a lot easier when the only thing I had to take care of was a tamagotchi.', image: faker.image.image()},
            {number: 13, title: 'Powerball', sizeFrom: 65, sizeTo: 75, weightFrom: 15, weightTo: 20, quote: 'Your arms won\'t believe your wrists.', image: faker.image.image()},
            {number: 14, title: '3,5 floppy disk', sizeFrom: 80, sizeTo: 90, weightFrom: 0, weightTo: 30, quote: '1.44 MB in your hand! ', image: faker.image.image()},
            {number: 15, title: 'GI Joe figure', sizeFrom: 0, sizeTo: 100, weightFrom: 0, weightTo: 50, quote: 'A Real American Hero!', image: faker.image.image()},
            {number: 16, title: 'Hitchhicker\'s Guide to the Galaxy', sizeFrom: 0, sizeTo: 110, weightFrom: 90, weightTo: 100, quote: 'Almost but not quite, entirely unlike tea.', image: faker.image.image()},
            {number: 17, title: 'CD Rom', sizeFrom: 110, sizeTo: 120, weightFrom: 0, weightTo: 100, quote: '486 floppy disks in one CD.', image: faker.image.image()},
            {number: 18, title: 'NES controller', sizeFrom: 120, sizeTo: 140, weightFrom: 0, weightTo: 150, quote: 'Now you\'re playing with power.', image: faker.image.image()},
            {number: 19, title: 'Indiana Jone\'s Holy Grail', sizeFrom: 130, sizeTo: 150, weightFrom: 0, weightTo: 200, quote: '"X" never, ever marks the spot.', image: faker.image.image()},
            {number: 20, title: 'Sonic screwdriver', sizeFrom: 140, sizeTo: 160, weightFrom: 0, weightTo: 255, quote: 'Never ignore coincidence. Unless, of course, you\'re busy. In which case, always ignore coincidence.', image: faker.image.image()},
            {number: 21, title: 'T-rex tooth', sizeFrom: 160, sizeTo: 250, weightFrom: 0, weightTo: 300, quote: 'That doesn\'t look very scary. More like a six-foot turkey.', image: faker.image.image()},
            {number: 22, title: 'Wolverine\'s claws', sizeFrom: 250, sizeTo: 270, weightFrom: 0, weightTo: 350, quote: 'Put the knives down! I can\'t.', image: faker.image.image()},
            {number: 23, title: 'Harry Potter\'s wand', sizeFrom: 270, sizeTo: 290, weightFrom: 455, weightTo: 490, quote: 'Avada Kedavra!', image: faker.image.image()},
            {number: 24, title: 'Buzz Lightyear', sizeFrom: 280, sizeTo: 300, weightFrom: 500, weightTo: 550, quote: 'To infinity... and beyond!', image: faker.image.image()},
            {number: 25, title: 'ZX Spectrum+', sizeFrom: 300, sizeTo: 330, weightFrom: 600, weightTo: 700, quote: 'Old school fun now in all 8 colors.', image: faker.image.image()},
            {number: 26, title: 'Oscar statue', sizeFrom: 310, sizeTo: 340, weightFrom: 0, weightTo: 800, quote: 'And the Oscar goes to...', image: faker.image.image()},
            {number: 27, title: 'Cassete deck', sizeFrom: 340, sizeTo: 360, weightFrom: 900, weightTo: 1000, quote: 'The last time the word "rewind" made sense.', image: faker.image.image()},
            {number: 28, title: 'The barrell of a shotgun', sizeFrom: 350, sizeTo: 370, weightFrom: 1000, weightTo: 1100, quote: 'Man\'s best friend... against zombies!', image: faker.image.image()},
            {number: 29, title: '3d chess board', sizeFrom: 360, sizeTo: 380, weightFrom: 1100, weightTo: 1200, quote: 'Live long and prosper.', image: faker.image.image()},
            {number: 30, title: 'Alien chestbuster', sizeFrom: 380, sizeTo: 400, weightFrom: 0, weightTo: 1300, quote: 'In space no one can hear you scream.', image: faker.image.image()},
            {number: 31, title: 'Cluedo board', sizeFrom: 0, sizeTo: 400, weightFrom: 1400, weightTo: 1500, quote: 'Miss Scarlett with the Knife in the Library.', image: faker.image.image()},
            {number: 32, title: 'Pikachu', sizeFrom: 400, sizeTo: 420, weightFrom: 1700, weightTo: 1800, quote: 'Gotta catch \'em all!', image: faker.image.image()},
            {number: 33, title: 'Groundhog', sizeFrom: 410, sizeTo: 430, weightFrom: 0, weightTo: 2000, quote: 'What would you do if you were stuck in one place and every day was exactly the same, and nothing that you did mattered?', image: faker.image.image()},
            {number: 34, title: 'Mjolnir', sizeFrom: 430, sizeTo: 450, weightFrom: 2100, weightTo: 2200, quote: 'Whosoever holds this hammer, if he be worthy, shall possess the power of THOR!', image: faker.image.image()},
            {number: 35, title: 'T-800 arm', sizeFrom: 440, sizeTo: 460, weightFrom: 0, weightTo: 2500, quote: 'Hasta la vista, baby.', image: faker.image.image()},
            {number: 36, title: 'V\'s hat', sizeFrom: 450, sizeTo: 470, weightFrom: 0, weightTo: 2700, quote: 'Remember, remember, the Fifth of November...', image: faker.image.image()},
            {number: 37, title: 'Flux capacitor', sizeFrom: 460, sizeTo: 480, weightFrom: 0, weightTo: 3000, quote: 'if you\'re gonna build a time machine into a car, why not do it with some style?', image: faker.image.image()},
            {number: 38, title: 'Baby dragon', sizeFrom: 470, sizeTo: 490, weightFrom: 0, weightTo: 3100, quote: 'Dracarys!', image: faker.image.image()},
            {number: 39, title: 'Rubber chicken with a pulley', sizeFrom: 0, sizeTo: 500, weightFrom: 0, weightTo: 3200, quote: 'Hmm, a rubber chicken with a pully in the middle. What possible use could that have?', image: faker.image.image()},
            {number: 40, title: 'Ghostbusters proton gun', sizeFrom: 480, sizeTo: 530, weightFrom: 3200, weightTo: 3600, quote: 'Who you gonna call?', image: faker.image.image()}        ];

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