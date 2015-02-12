'use strict';
// modify default nodejs's require to allow requiring requireJS module directly
require('node-amd-require')({
    baseUrl: './scripts/',
});

module.exports = require('dcDriver');