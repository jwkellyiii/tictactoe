// Tic Tac Toe View
define([
    'jquery',
    'modernizr',
    'backbone',
    'text!../../templates/board/board.html'
], function($, Modernizr, Backbone, boardTemplate){
    var AppView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, "render", "start", "renderMark", "clearBoard", "makeMove", "renderDraw", "renderWinner", "showMessage", "hideMessage", "updateStatistics", "clearStatistics");
            this.el = $('#tictactoe');
            this.messageEl = this.el.find('.message');
            this.model
                .bind('game:draw', this.renderDraw)
                .bind('game:winner', this.renderWinner);

            $('.clear_stats').one('click', this.clearStatistics);

            if (Modernizr.localstorage) {
                this.updateStatistics();
            } else {
                $("#statistics").hide();
            }
        },

        render: function () {
            this.el.html(boardTemplate);
            this.start();
        },

        // starts game
        start: function() {
            this.clearBoard();
            $('.square', $(this.el)).one('click', this.makeMove);

            this.model.start();
        },

        // places mark on the board
        renderMark: function(index, player) {
            $('#square_' + index).unbind();

            var xo = (player == this.model.board.X) ? 'X' : 'O';
            $('#square_' + index).html('<div class="mark">' + xo + '</div>');
        },

        // clears board
        clearBoard: function() {
            $(".start").addClass("disabled");

            this.el.find('.square').removeClass("winner").html('');
            this.hideMessage();
        },

        // makes move
        makeMove: function(e) {
            var square = e.currentTarget,
                self = this,
                index = $(square).attr('id').split('_')[1];

            // allow players to restart the game after making a move
            if($(".start").hasClass("disabled")) {
                $(".start").removeClass("disabled");
                $('.start').one('click', this.start);
            }

            // ensure the square has not already been played
            if($(square).html() == "") {
                this.renderMark(index, this.model.cur);
                self.model.move(index);
            }
        },

        // renders draw
        renderDraw: function() {
            this.showMessage('draw!', "alert-block");

            // use local storage to keep track of draws
            if (Modernizr.localstorage) {
                // window.localStorage is available!
                var draw_count = Number(localStorage.getItem("draws")) + 1;
                localStorage.setItem("draws", draw_count);
                this.updateStatistics();
            } else {
                // no native support for HTML5 storage :(
                // maybe try dojox.storage or a third-party solution
            }
        },

        // renders winner
        renderWinner: function(winner) {
            var xo = (winner == 1) ? 'X' : 'O';
            this.showMessage(xo + ' wins!', "alert-success");

            // use local storage to keep track of wins
            if (Modernizr.localstorage) {
                // window.localStorage is available!
                var win_count = Number(localStorage.getItem(xo + "_wins")) + 1;
                localStorage.setItem(xo + "_wins", win_count);
                this.updateStatistics();
            } else {
                // no native support for HTML5 storage :(
                // maybe try dojox.storage or a third-party solution
            }
        },

        showMessage: function(m, msg_type) {
            //this.messageEl.addClass("alert " + msg_type);
            $("#tictactoe .message").addClass("alert " + msg_type);
            //this.messageEl.html(m);
            $("#tictactoe .message").html(m);
            $(".start").removeClass("disabled");
            $('.start').one('click', this.start);
        },

        hideMessage: function() {
            //this.messageEl.removeClass().addClass("message").text("");
            $("#tictactoe .message").removeClass().addClass("message").text("");
        },

        updateStatistics: function() {
            $('#draw_count').text(Number(localStorage.getItem("draws")));
            $('#X_wins_count').text(Number(localStorage.getItem("X_wins")));
            $('#O_wins_count').text(Number(localStorage.getItem("O_wins")));
        },

        clearStatistics: function() {
            localStorage.setItem("X_wins", 0);
            localStorage.setItem("O_wins", 0);
            localStorage.setItem("draws", 0);
            this.updateStatistics();
        }
    });
    return AppView;
});
