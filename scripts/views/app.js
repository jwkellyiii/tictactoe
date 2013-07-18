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
                .bind('game:move', this.renderMark)
                .bind('game:draw', this.renderDraw)
                .bind('game:winner', this.renderWinner);

            $('.start').bind('click', this.start);
            $('.clear_stats').bind('click', this.clearStatistics);

            if (Modernizr.localstorage) {
                this.updateStatistics();
            } else {
                $("#statistics").hide();
            }

            //this.start();
        },

        render: function () {
            this.el.html(boardTemplate);
            this.start();
        },

        // starts game
        start: function() {
            this.clearBoard();
            $(".start").addClass("disabled");
            $('.square', $(this.el)).bind('click', this.makeMove);

            this.model.start();
        },

        // places mark on the board
        renderMark: function(index, player) {
            var xo = (player == this.model.board.X) ? 'X' : 'O';
            $('#square_' + index).html('<div class="mark">' + xo + '</div>');
            $('#square_' + index).unbind();
        },

        // clears board
        clearBoard: function() {
            this.el.find('.square').removeClass("winner").html('');
            this.hideMessage();
        },

        // makes move
        makeMove: function(e) {
            var square = e.currentTarget,
                self = this,
                index = $(square).attr('id').split('_')[1];
            this.renderMark(index, this.model.cur);
            self.model.move(index);
        },

        // renders draw
        renderDraw: function() {
            this.showMessage('draw!', "alert-block");
            this.el.find('.square').unbind();



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
            this.el.find('.square').unbind();

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
