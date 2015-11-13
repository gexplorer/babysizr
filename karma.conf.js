module.exports = function (config) {
    config.set({
        basePath: 'www',
        frameworks: ['jasmine'],
        files: [
            'lib/ionic/release/js/ionic.bundle.min.js',
            'lib/angular-mocks/angular-mocks.js',
            'js/**/*.js',
            'tests/**/*_tests.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    })
};
