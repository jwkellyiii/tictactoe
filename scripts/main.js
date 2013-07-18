requirejs.config({
    paths: {
        // Major libraries
        jquery: 'vendor/jquery-1.9.1.min',
        modernizr: 'vendor/modernizr/modernizr-2.6.2.min',
        underscore: 'vendor/underscore/underscore-min',
        backbone: 'vendor/backbone/backbone-min',

        // Require.js plugins
        text: 'vendor/require/text'
    },
    useStrict: true,
    shim: {
        "jquery": {
            exports: '$'
        },
        "modernizr": {
            exports: 'Modernizr'
        },
        "underscore": {
            exports: '_'
        },
        "backbone": {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

// Start the main app logic.
requirejs(['jquery', 'tictactoe', 'views/app'],
    function ($, TicTacToe, AppView) {
        //jQuery, canvas and the app/sub module are all loaded and can be used here now.
        var game = TicTacToe.init({});
        var appview = new AppView({model: game});
        appview.render();
    }
);