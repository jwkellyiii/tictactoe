define(['tictactoe'], function(TicTacToe) {

    return describe('A TicTacToe Game', function() {
        var that = this;
        var game;

        beforeEach(function () {
            game = TicTacToe.init({});
        });

        afterEach(function() {
            game = null;
        });

        describe('new game', function() {
            it('contains functions to interact with the new game', function() {
                expect(game.move).toBeDefined();
                expect(game.start).toBeDefined();
                expect(game.switchPlayer).toBeDefined();
            });
        });

        describe('starting a new game', function() {
            beforeEach(function() {
                game.start();
            });

            it('creates a new board', function() {
                expect(game.board).toBeDefined();
                expect(game.board).toEqual(jasmine.any(Object));
            });

            it('creates two players', function() {
                expect(game.players).toBeDefined();
                expect(game.players.length).toEqual(2);
            });

            it('sets the current player', function() {
                expect(game.cur).toBeDefined();
                expect(game.cur).toEqual(game.players[0]);
            });
        });

        describe('switching player turns', function() {
            var current;

            beforeEach(function() {
                game.start();
                current = game.cur;

                game.switchPlayer();
            });

            it('changes current players', function() {
                expect(game.cur).not.toEqual(current);
                expect(game.cur).toEqual(game.players[1]);
            });
        });

        describe('making a move', function() {
            var square;

            beforeEach(function() {
                game.start();

                square = Math.floor((Math.random()*8)+1);

                spyOn(game, 'move').andCallThrough();
                spyOn(game.board, 'move');
                spyOn(game, 'trigger');
                game.move(square, {});
            });

            it('ensures game move was called', function() {
                expect(game.move).toHaveBeenCalledWith(square, {});
            });

            it('calls board.move', function() {
                expect(game.board.move).toHaveBeenCalledWith(square, game.cur);
            });

            it('triggers a game move', function() {
                expect(game.trigger).toHaveBeenCalledWith('game:move', square, game.cur);
            });
        });

    });

});