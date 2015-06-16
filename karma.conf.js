// Karma configuration
// Generated on Tue Jun 16 2015 09:18:53 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        // dependencies
        {pattern: 'public/jquery/*.js', watched: false, served: true, included: true},
        {pattern: 'test-lib/jasmine-jquery/*.js', watched: false, served: true, included: true},
        {pattern: 'test-lib/jasmine-ajax/*.js', watched: false, served: true, included: true},

        // fixtures
        {pattern: 'views/*.ejs', watched: true, served: true, included: false},
        {pattern: 'public/stylesheets/*.css', watched: true, served: true, included: false},
        {pattern: 'public/bootstrap/css/*.css', watched: true, served: true, included: false},
        {pattern: 'public/bootstrap/js/*.js', watched: true, served: true, included: false},
        {pattern: 'public/javascripts/*.js', watched: true, served: true, included: false},
      
        // tests
        'test/*.js'
    ],
      
    proxies: {
        '/bootstrap/': '/base/public/bootstrap/',
        '/jquery/': '/base/public/jquery/',
        '/javascripts/': '/base/public/javascripts/'
    },
      
      plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
      ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],   //'Firefox', 'Chrome' //PhantomJS


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
