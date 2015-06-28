angular.module('utils', [])

    .factory('Colors', function () {
        var colors = {
            "red": "#F44336",
            "pink": "#E91E63",
            "purple": "#9C27B0",
            "deppPurple": "#673AB7",
            "indigo": "#3F51B5",
            "blue": "#2196F3",
            "lightBlue": "#03A9F4",
            "teal": "#009688",
            "green": "#4CAF50",
            "lightGreen": "#8BC34A",
            "lime": "#CDDC39",
            "amber": "#FFC107",
            "yellow": "#FFEB3B",
            "orange": "#FF9800",
            "deepOrange": "#FF5722",
            "brown": "#795548",
            "grey": "#9E9E9E",
            "blueGrey": "#607D8B",
            "black": "#000000"
        };

        function get(name) {
            return colors[name];
        }

        return {
            get: get
        }
    });