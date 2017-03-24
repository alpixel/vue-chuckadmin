// Karma configuration

var webpackConf = require('../../webpack.config.js');
delete webpackConf.entry

module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    reporters: ['spec', 'coverage'],

    files: [
        '../../node_modules/babel-polyfill/dist/polyfill.js',
        './index.js'
    ],

    preprocessors: {
        './index.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConf,

    webpackMiddleware: {
      noInfo: true
    },

    coverageReporter: {
        dir: './coverage',
        reporters: [
            {
                type: 'lcov',
                subdir: '.'
            },
            {
                type: 'text-summary'
            }
        ]
    }
  })
}
