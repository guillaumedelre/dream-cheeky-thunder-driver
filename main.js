'use strict';

var requirejs = require('requirejs');

requirejs.config({
    baseUrl: __dirname + '/scripts',
    nodeRequire: require
});

module.exports = requirejs('dcDriver');