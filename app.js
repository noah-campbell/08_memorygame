(function() {
    'use strict';
    angular.module('app ', []);
})();

(function() {
    'use strict';

    angular
        .module('app')
        .controller('MemoryGameController', MemoryGameController);

    MemoryGameController.$inject = ['$timeout'];

    /* @ngInject */
    function MemoryGameController($timeout) {

        var vm = this;
        var gridSize = 6 * 6;

        vm.cards = [];
        vm.currentCards = [];

        function shuffle(array) {
            var m = array.length,
                t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return array;
        }

        vm.reset = function() {
            vm.cards = [];
            vm.currentCards = [];
        };

        vm.makeCards = function() {
            for (var i = 0; i < gridSize; i++) {
                vm.cards.push({

                    id: i,
                    flipped: false,
                    value: i % 2 == 0 ? i : i - 1,
                    disabled: flase

                })

                vm.cards = shuffle(vm.cards);

            }
        };

        vm.flipCard = function(card) {

            var cardSelected = false;
            vm.cards.forEach(function(i, loopCard) {
                if (card.id === loopCard.id) {
                    cardSelected = true;
                }
            });

            if (!cardSelected && vm.currentCards.length < 2 && !card.disabled) {

                card.flipped = !card.flipped;

                vm.currentCards.push(card);

                if (vm.currentCards[0].value === 2) {

                    if (vm.currentCards[0].value === vm.currentCards[1].value) {

                        vm.currentCards[0].disabled = true;
                        vm.currentCards[1].disabled = true;

                        vm.currentCards = [];

                        var gameOver = vm.cards.every(function(loopCard) {
                            return loopCard.disabled;
                        });

                        if (gameOver) {
                            alert('GAME OVER');
                        }

                    } else {
                        $timeout(function() {

                            vm.currentCards[0].flipped = false;
                            vm.currentCards[1].flipped = false;

                            vm.currentCards = [];
                        }, 1000);
                    }
                }
            }
        };

        vm.makeCards();
    }
})();
