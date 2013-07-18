//(function(){
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    // tic tac toe namespace
    var TicTacToe;
    if (typeof exports !== 'undefined') {
        TicTacToe = exports;
    } else {
        TicTacToe = this.TicTacToe = {};
    }

    // game options
    TicTacToe.options = {};

    // initialize game
    TicTacToe.init = function(options) {
        _.extend(TicTacToe.options, options);
        return new Game();
    }

    // game constructor
    var Game = function() {
        var that = this;

        this.bind('game:move', function(position) {
            //switch player, regardless of winner. avoids placing two x's / o's
            this.switchPlayer();

            var winner = that.board.getWinner();
            if (winner === this.players[0] || winner == this.players[1]) {
                // if winner present
                this.trigger("game:winner", winner);
            } else if (that.board.isFull()) {
                // if board is full
                this.trigger("game:draw");
            }
        });
    }

    // game prototype
    _.extend(Game.prototype, Backbone.Events, {
        // makes move
        move: function(index, options) {
            options = options || {};
            this.board.move(index, this.cur);
            this.trigger("game:move", index, this.cur);
        },

        // starts game
        start: function() {
            this.board = new Board();
            this.players = [this.board.X, this.board.O];

            // current player
            this.cur = this.players[0];
        },

        // switch the current player after a player moves
        switchPlayer: function() {
            this.cur = ((this.cur === this.players[0]) ? this.players[1] : this.players[0]);
        }
    });

    // board constructor
    var Board = function() {
        // game board
        this.board = [0,0,0,0,0,0,0,0,0];

        // wining positions
        this.wins = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        // square state
        this.EMPTY = 0;
        this.X = 1;
        this.O = 2;

        // number of moves played thus far
        this.moves = 0;

        // minimum number of moves to win, based on board size
        // TODO:: figure out formula to calculate this on board size
        this.minimum_moves = 5;
    }

    // board prototype
    Board.prototype = {
        // checks if board is full
        isFull: function() {
            //return !!(this.moves == 9);
            return !!(this.moves == this.board.length);
        },

        // returns value from the board for given index
        getSquare: function(index) {
            return this.board[index];
        },

        // makes move
        move: function(index, player) {
            this.moves++;
            this.board[index] = player;
        },

        // checks if board has a winner
        getWinner: function() {
            this.w = this.wins;
            this.s = this.getSquare;

            //no winner if minimum number of moves hasn't occurred.
            if(this.moves >= this.minimum_moves) {
                for (var i = 0; i < this.w.length; i++) {
                    // no winner if the first square of winning positions is empty
                    if(this.s(this.w[i][0]) != this.EMPTY) {
                        if (this.s(this.w[i][0]) === this.s(this.w[i][1]) && this.s(this.w[i][0]) === this.s(this.w[i][2])) {
                            this.highlightWinningSquares(this.w[i]);
                            return this.s(this.w[i][0]);
                        }
                    }
                }
            }
            return -1;
        },

        // highlight the winning squares
        highlightWinningSquares: function(winners) {
            for (var s = 0; s < winners.length; s++) {
                $('#square_' + winners[s]).addClass("winner");
            }
        }
    }

    return TicTacToe;
});
