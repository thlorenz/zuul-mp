'use strict';
/*jshint asi: true */

var test = require('tap').test
var zuulmp = require('../');

// reporter picked up by mocha-phantomjs
var args = [ '--local', '3100', '-C', '--reporter', 'spec', '--', 'main.js' ];

test('\nfailing test', function (t) {
  zuulmp(args, __dirname + '/failing', function (err, code) {
    t.ok(err, 'has error')
    t.ok(code !== 0, 'returns with non-zero exit code')
    t.end();
  });
})
