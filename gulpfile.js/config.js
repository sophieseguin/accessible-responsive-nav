'use strict';

var join = require('path').join;
var util = require('gulp-util');

module.exports = {
    autoprefixer: {
        browsers: [
            'last 2 versions',
            'Android 4',
            'IE 8',
            'IE 9',
            'iOS >= 6'
        ]
    },
    browserify: {
        entry: 'app.js'
    },
    browserSync: {
        server: {
            baseDir: './',
            proxy: 'zonebpgulp.dev'
        }
    },
    jshint: {
        'bitwise': true,
        'browser': true,
        'camelcase': true,
        'curly': true,
        'devel': true,
        'eqeqeq': true,
        'esnext': true,
        'globals': {
            'define': true,
            'jQuery': false,
            'Modernizr': true,
            'require': true
        },
        'immed': true,
        'indent': 4,
        'jquery': false,
        'latedef': true,
        'newcap': true,
        'noarg': true,
        'node': true,
        'quotmark': 'single',
        'regexp': true,
        'smarttabs': true,
        'strict': true,
        'trailing': true,
        'undef': true,
        'unused': true
    },
    production: !!util.env.production,
    sass: {
        errLogToConsole: true
    },
    scripts: {
        dist: join('dist', 'scripts'),
        src: join('src', 'scripts')
    },
    styles: {
        dist: join('dist', 'styles'),
        src: join('src', 'styles')
    }
};
