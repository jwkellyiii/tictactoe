define(['tictactoe'], function(TicTacToe) {

    return describe('A TicTacToe Game Board', function() {
        var that = this;
        var game, board;

        beforeEach(function () {
            game = TicTacToe.init({});
            game.start();

            board = game.board;
        });

        afterEach(function() {
            game = null;
            board = null;
        });

        describe('new board', function() {
            it('initiates a new blank playing board', function() {
                expect(game.board.isFull).toBeDefined();
                expect(board.getSquare).toBeDefined();
                expect(board.move).toBeDefined();
                expect(board.getWinner).toBeDefined();
                expect(board.highlightWinningSquares).toBeDefined();
            });

            it('defines the squares', function() {
                expect(board.board).toBeDefined();
                expect(board.board.length).toBeGreaterThan(0);
            });

            it('defines the winning combinations', function() {
                expect(board.wins).toBeDefined();
                expect(board.wins.length).toBeGreaterThan(0);
            });

            it('defines the initial square states', function() {
                expect(board.EMPTY).toBeDefined();
                expect(board.X).toBeDefined();
                expect(board.O).toBeDefined();

                expect(board.EMPTY).toEqual(0);
                expect(board.X).toEqual(1);
                expect(board.O).toEqual(2);
            });

            it('defines / resets the number of moves played', function() {
                expect(board.moves).toBeDefined();
                expect(board.moves).toEqual(0);
            });

            it('defines the number of moves needed to be played to win', function() {
                expect(board.minimum_moves).toBeDefined();
                expect(board.minimum_moves).toEqual(5);
            });
        });

        describe('check if the game board is full', function() {
            var board_full;

            beforeEach(function() {
                game.start();

                board_full = game.board.isFull();
            });

            it('validates a new board is not full', function() {
                expect(board_full).toEqual(false);
            });

            it('validates if maximum moves are not played, the board is not full', function() {
                expect(board_full).toEqual(false);

                game.board.moves = Math.floor((Math.random()*8)+1)
                board_full = game.board.isFull();

                expect(board_full).toEqual(false);
            });

            it('validates after maximum moves are played, the board is full', function() {
                expect(board_full).toEqual(false);

                game.board.moves = game.board.board.length;
                board_full = game.board.isFull();

                expect(board_full).toEqual(true);
            });
        });

    });

});