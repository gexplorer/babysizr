(function (ionic) {

    // Get transform origin poly
    var d = document.createElement('div');
    var transformKeys = ['webkitTransformOrigin', 'transform-origin', '-webkit-transform-origin', 'webkit-transform-origin',
        '-moz-transform-origin', 'moz-transform-origin', 'MozTransformOrigin', 'mozTransformOrigin'];

    var TRANSFORM_ORIGIN = 'webkitTransformOrigin';
    for (var i = 0; i < transformKeys.length; i++) {
        if (d.style[transformKeys[i]] !== undefined) {
            TRANSFORM_ORIGIN = transformKeys[i];
            break;
        }
    }

    var transitionKeys = ['webkitTransition', 'transition', '-webkit-transition', 'webkit-transition',
        '-moz-transition', 'moz-transition', 'MozTransition', 'mozTransition'];
    var TRANSITION = 'webkitTransition';
    for (var j = 0; j < transitionKeys.length; j++) {
        if (d.style[transitionKeys[j]] !== undefined) {
            TRANSITION = transitionKeys[j];
            break;
        }
    }

    var SwipeableCardController = ionic.views.View.inherit({
        initialize: function (opts) {
            this.cards = [];
            this.maxHeight = opts.height || 300;
            this.cardGutterWidth = opts.cardGutterWidth || 10;
            this.cardPopInDuration = opts.cardPopInDuration || 400;
            this.cardAnimation = opts.cardAnimation || 'pop-in';
        },

        pushCard: function (card) {
            var self = this;

            this.cards.push(card);
            this.beforeCardShow(card);

            card.transitionIn(this.cardAnimation);
            setTimeout(function () {
                card.disableTransition(self.cardAnimation);
            }, this.cardPopInDuration + 100);
        },

        beforeCardShow: function () {
            var nextCard = this.cards[this.cards.length - 1];
            if (!nextCard) return;

            nextCard.setPopInDuration(this.cardPopInDuration);
            nextCard.setZIndex(this.cards.length);
        },

        popCard: function (animate) {
            var card = this.cards.pop();
            if (animate) {
                card.swipe();
            }
            return card;
        }
    });

    var SwipeableCardView = ionic.views.View.inherit({

        initialize: function (opts) {
            opts = ionic.extend({}, opts);

            ionic.extend(this, opts);

            this.el = opts.el;

            this.startX = this.startY = this.x = this.y = 0;

            this.bindEvents();
        },

        setX: function (x) {
            this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + x + 'px,' + this.y + 'px, 0)';
            this.x = x;
            this.startX = x;
        },

        setY: function (y) {
            this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + 'px,' + y + 'px, 0)';
            this.y = y;
            this.startY = y;
        },

        setZIndex: function (index) {
            this.el.style.zIndex = index;
        },

        setWidth: function (width) {
            this.el.style.width = width + 'px';
        },

        setHeight: function (height) {
            this.el.style.height = height + 'px';
        },

        setPopInDuration: function (duration) {
            this.cardPopInDuration = duration;
        },

        transitionIn: function (animationClass) {
            var self = this;

            this.el.classList.add(animationClass + '-start');
            this.el.classList.add(animationClass);
            this.el.style.display = 'block';
            setTimeout(function () {
                self.el.classList.remove(animationClass + '-start');
            }, 100);
        },

        disableTransition: function (animationClass) {
            this.el.classList.remove(animationClass);
        },

        swipe: function () {
            this.transitionOut();
        },

        transitionOut: function () {
            var self = this;
            var direction = 1.5;
            if (this.y < 0) {
                direction = -1;
            }
            var rotateTo = (this.rotationAngle + (this.rotationDirection * -0.6)) || (Math.random() * 0.4);
            var duration = this.rotationAngle ? 0.2 : 0.5;

            this.el.style[TRANSITION] = '-webkit-transform ' + duration + 's ease-in-out';
            this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + ',' + (window.innerHeight * direction) + 'px, 0) rotate(' + rotateTo + 'rad)';

            var revert = false;

            if (direction < 0) {
                revert = !this.onSwipeUp()
            } else {
                revert = !this.onSwipeDown()
            }

            if (revert) {
                this.el.style[TRANSITION] = '-webkit-transform 0.2s ease-in-out';
                this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + ',' + (this.startY) + 'px, 0)';
                setTimeout(function () {
                    self.el.style[TRANSITION] = 'none';
                }, 200);
            } else {
                setTimeout(function () {
                    self.onDestroy && self.onDestroy();
                }, duration * 1000);
            }
        },

        bindEvents: function () {
            var self = this;
            ionic.onGesture('dragstart', function (e) {
                var cx = window.innerWidth / 2;
                if (e.gesture.touches[0].pageX < cx) {
                    self._transformOriginRight();
                } else {
                    self._transformOriginLeft();
                }
                ionic.requestAnimationFrame(function () {
                    self._doDragStart(e)
                });
            }, this.el);

            ionic.onGesture('drag', function (e) {
                ionic.requestAnimationFrame(function () {
                    self._doDrag(e)
                });
            }, this.el);

            ionic.onGesture('dragend', function (e) {
                ionic.requestAnimationFrame(function () {
                    self._doDragEnd(e)
                });
            }, this.el);
        },

        _transformOriginLeft: function () {
            this.el.style[TRANSFORM_ORIGIN] = 'left center';
            this.rotationDirection = 1;
        },

        _transformOriginRight: function () {
            this.el.style[TRANSFORM_ORIGIN] = 'right center';
            this.rotationDirection = -1;
        },

        _doDragStart: function (e) {
            var width = this.el.offsetWidth;
            var point = window.innerWidth / 2 + this.rotationDirection * (width / 2)
            var distance = Math.abs(point - e.gesture.touches[0].pageX);

            this.touchDistance = distance * 10;
        },

        _doDrag: function (e) {
            var o = e.gesture.deltaY / 3;

            this.rotationAngle = Math.atan(o / this.touchDistance) * this.rotationDirection;

            if (e.gesture.deltaY < 0) {
                this.rotationAngle = 0;
            }

            this.y = this.startY + (e.gesture.deltaY * 0.4);

            this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0) rotate(' + (this.rotationAngle || 0) + 'rad)';
        },
        _doDragEnd: function (e) {
            this.transitionOut(e);
        }
    });

    angular.module('ionic.contrib.ui.cards', ['ionic'])
        .directive('swipeCard', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                template: '<div class="swipe-card" ng-transclude></div>',
                require: '^swipeCards',
                transclude: true,
                scope: {
                    onCardSwipeUp: '&',
                    block: '&',
                    onCardSwipeDown: '&',
                    onDestroy: '&'
                },
                link: function ($scope, $element, $attr, swipeCards) {
                    var el = $element[0];

                    var swipeableCard = new SwipeableCardView({
                        el: el,
                        onSwipeUp: function () {
                            return $scope.onCardSwipeUp();
                        },
                        onSwipeDown: function () {
                            return $scope.onCardSwipeDown();
                        },

                        onDestroy: function () {
                            $timeout(function () {
                                $scope.onDestroy();
                            });
                        }
                    });
                    $scope.$parent.swipeCard = swipeableCard;

                    swipeCards.swipeController.pushCard(swipeableCard);
                }
            }
        }])

        .directive('swipeCards', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'E',
                template: '<div class="swipe-cards" ng-transclude></div>',
                transclude: true,
                scope: true,
                controller: function () {
                    var swipeController = new SwipeableCardController({});

                    $rootScope.$on('swipeCard.pop', function (isAnimated) {
                        swipeController.popCard(isAnimated);
                    });

                    this.swipeController = swipeController;
                }
            }
        }])

        .factory('$ionicSwipeCardDelegate', ['$rootScope', function ($rootScope) {
            return {
                popCard: function ($scope, isAnimated) {
                    $rootScope.$emit('swipeCard.pop', isAnimated);
                },
                getSwipeableCard: function ($scope) {
                    return $scope.$parent.swipeCard;
                }
            }
        }]);

})(window.ionic);