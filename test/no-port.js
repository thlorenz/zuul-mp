'use strict';
/*jshint asi: true */

var test = require('tap').test
var zuulmp = require('../');

// reporter picked up by mocha-phantomjs
var args = [ '-C', '--reporter', 'spec', '--', 'main.js' ];

test('\nwhen no port provided, it picks a default port and runs the tests', function (t) {
  zuulmp(args, __dirname + '/passing-qunit', function (err, code) {
    if (err) { t.fail(err); return t.end() }
    t.equal(code, 0, 'exits with code 0')
    t.end();
  });
})
