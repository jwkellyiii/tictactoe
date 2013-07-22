require.config({
    baseUrl: "scripts/",
    paths: {
        jquery: 'vendor/jquery-1.9.1.min',
        underscore: 'vendor/underscore/underscore-min',
        backbone: 'vendor/backbone/backbone-min',
        jasmine: 'vendor/jasmine/jasmine',
        'jasmine-html': 'vendor/jasmine/jasmine-html',
        spec: '../spec/'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/models/game');
    /*
    specs.push('spec/views/ClearCompletedSpec');
    specs.push('spec/views/CountViewSpec');
    specs.push('spec/views/FooterViewSpec');
    specs.push('spec/views/MarkAllSpec');
    specs.push('spec/views/NewTaskSpec');
    specs.push('spec/views/TaskListSpec');
    specs.push('spec/views/TaskViewSpec');
    */


    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });

});