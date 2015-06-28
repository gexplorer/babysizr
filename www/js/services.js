angular.module('services', [])

    .factory('CardService', function () {
        var weeks = [
            {number: 1, title: 'Midiclorians', sizeFrom: 0, sizeTo: 0, weightFrom: 0, weightTo: 0, quote: 'May the force be with you.'},
            {number: 2, title: 'Nanobots', sizeFrom: 0, sizeTo: 0, weightFrom: 0, weightTo: 0, quote: 'Sure, at some level scientists know nanobots will destroy mankind. They just can\'t resist seeing how it happens.'},
            {number: 3, title: 'The innerspace ship', sizeFrom: 0, sizeTo: 0, weightFrom: 0, weightTo: 0, quote: 'I\'m right here, INSIDE you INSIDE YOUR BODY!'},
            {number: 4, title: 'Ant-man', sizeFrom: 0, sizeTo: 1, weightFrom: 0, weightTo: 1, quote: 'One question... Is it too late to change the name?'},
            {number: 5, title: 'The thickness of a katana', sizeFrom: 1, sizeTo: 2, weightFrom: 0, weightTo: 1, quote: 'You must have big rats if you need Hattori Hanzo\'s steel.'},
            {number: 6, title: 'A pixelized plumber', sizeFrom: 3, sizeTo: 4, weightFrom: 0, weightTo: 1, quote: 'Thank you so much for playing my game!'},
            {number: 7, title: 'A radioactive spider', sizeFrom: 0, sizeTo: 10, weightFrom: 0, weightTo: 1, quote: 'With great power. comes great responsibility.'},
            {number: 8, title: 'The One Ring', sizeFrom: 14, sizeTo: 18, weightFrom: 0, weightTo: 1, quote: 'One ring to rule them all...'},
            {number: 9, title: 'The Matrix pills', sizeFrom: 0, sizeTo: 20, weightFrom: 0, weightTo: 2, quote: 'Which one are you gonna choose?'},
            {number: 10, title: 'A spinning top', sizeFrom: 30, sizeTo: 40, weightFrom: 0, weightTo: 5, quote: 'You mustn\'t be afraid to dream a little bigger, darling.'},
            {number: 11, title: 'A Rubik\'s cube', sizeFrom: 40, sizeTo: 50, weightFrom: 6, weightTo: 8, quote: 'All problems can be solved.'},
            {number: 12, title: 'A Tamagotchi', sizeFrom: 0, sizeTo: 60, weightFrom: 8, weightTo: 14, quote: 'Life was a lot easier when the only thing I had to take care of was a tamagotchi.'},
            {number: 13, title: 'A Powerball', sizeFrom: 65, sizeTo: 75, weightFrom: 15, weightTo: 20, quote: 'Your arms won\'t believe your wrists.'},
            {number: 14, title: 'A 3,5 floppy disk', sizeFrom: 80, sizeTo: 90, weightFrom: 0, weightTo: 30, quote: '1.44 MB in your hand! '},
            {number: 15, title: 'A GI Joe figure', sizeFrom: 0, sizeTo: 100, weightFrom: 0, weightTo: 50, quote: 'A Real American Hero!'},
            {number: 16, title: 'The Guide', sizeFrom: 0, sizeTo: 110, weightFrom: 90, weightTo: 100, quote: 'Almost but not quite, entirely unlike tea.'},
            {number: 17, title: 'A CD Rom', sizeFrom: 110, sizeTo: 120, weightFrom: 0, weightTo: 100, quote: '486 floppy disks in one CD.'},
            {number: 18, title: 'A NES controller', sizeFrom: 120, sizeTo: 140, weightFrom: 0, weightTo: 150, quote: 'Now you\'re playing with power.'},
            {number: 19, title: 'Indiana Jone\'s Holy Grail', sizeFrom: 130, sizeTo: 150, weightFrom: 0, weightTo: 200, quote: '"X" never, ever marks the spot.'},
            {number: 20, title: 'The Sonic Screwdriver', sizeFrom: 140, sizeTo: 160, weightFrom: 0, weightTo: 255, quote: 'Never ignore coincidence. Unless, of course, you\'re busy. In which case, always ignore coincidence.'},
            {number: 21, title: 'A T-rex tooth', sizeFrom: 160, sizeTo: 250, weightFrom: 0, weightTo: 300, quote: 'That doesn\'t look very scary. More like a six-foot turkey.'},
            {number: 22, title: 'Wolverine\'s claws', sizeFrom: 250, sizeTo: 270, weightFrom: 0, weightTo: 350, quote: '-Put the knives down!   -I can\'t.'},
            {number: 23, title: 'Harry Potter\'s wand', sizeFrom: 270, sizeTo: 290, weightFrom: 455, weightTo: 490, quote: 'Avada Kedavra!'},
            {number: 24, title: 'Buzz Lightyear', sizeFrom: 280, sizeTo: 300, weightFrom: 500, weightTo: 550, quote: 'To infinity... and beyond!'},
            {number: 25, title: 'A ZX Spectrum+', sizeFrom: 300, sizeTo: 330, weightFrom: 600, weightTo: 700, quote: 'Old school fun now in all 8 colors.'},
            {number: 26, title: 'An Oscar statue', sizeFrom: 310, sizeTo: 340, weightFrom: 0, weightTo: 800, quote: 'And the Oscar goes to...'},
            {number: 27, title: 'A Cassete deck', sizeFrom: 340, sizeTo: 360, weightFrom: 900, weightTo: 1000, quote: 'The last time the word "rewind" made sense.'},
            {number: 28, title: 'The barrell of a shotgun', sizeFrom: 350, sizeTo: 370, weightFrom: 1000, weightTo: 1100, quote: 'Man\'s best friend... against zombies!'},
            {number: 29, title: 'A 3d chess board', sizeFrom: 360, sizeTo: 380, weightFrom: 1100, weightTo: 1200, quote: 'Live long and prosper.'},
            {number: 30, title: 'An Alien chestbuster', sizeFrom: 380, sizeTo: 400, weightFrom: 0, weightTo: 1300, quote: 'In space no one can hear you scream.'},
            {number: 31, title: 'A Cluedo board', sizeFrom: 0, sizeTo: 400, weightFrom: 1400, weightTo: 1500, quote: 'Miss Scarlett with the Knife in the Library.'},
            {number: 32, title: 'Pikachu', sizeFrom: 400, sizeTo: 420, weightFrom: 1700, weightTo: 1800, quote: 'Gotta catch \'em all!'},
            {number: 33, title: 'Punxsutawney Phil Sowerby', sizeFrom: 410, sizeTo: 430, weightFrom: 0, weightTo: 2000, quote: 'What would you do if you were stuck in one place and every day was exactly the same, and nothing that you did mattered?'},
            {number: 34, title: 'Mjolnir, Thor\'s hammer', sizeFrom: 430, sizeTo: 450, weightFrom: 2100, weightTo: 2200, quote: 'Whosoever holds this hammer, if he be worthy, shall possess the power of Thor!'},
            {number: 35, title: 'A T-800 arm', sizeFrom: 440, sizeTo: 460, weightFrom: 0, weightTo: 2500, quote: 'Hasta la vista, baby.'},
            {number: 36, title: 'V\'s hat', sizeFrom: 450, sizeTo: 470, weightFrom: 0, weightTo: 2700, quote: 'Remember, remember, the Fifth of November...'},
            {number: 37, title: 'A Flux capacitor', sizeFrom: 460, sizeTo: 480, weightFrom: 0, weightTo: 3000, quote: 'if you\'re gonna build a time machine into a car, why not do it with some style?'},
            {number: 38, title: 'A Baby dragon', sizeFrom: 470, sizeTo: 490, weightFrom: 0, weightTo: 3100, quote: 'Dracarys!'},
            {number: 39, title: 'A Rubber chicken with a pulley', sizeFrom: 0, sizeTo: 500, weightFrom: 0, weightTo: 3200, quote: 'Hmm, a rubber chicken with a pulley in the middle. What possible use could that have?'},
            {number: 40, title: 'A Ghostbusters proton gun', sizeFrom: 480, sizeTo: 530, weightFrom: 3200, weightTo: 3600, quote: 'Who you gonna call?'}
        ];

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