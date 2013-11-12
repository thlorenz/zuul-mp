'use strict';
/*jshint asi: true */

var test = require('tap').test
var zuulmp = require('../');

// reporter picked up by mocha-phantomjs
var args = [ '--local', '3100', '-C', '--reporter', 'spec', '--', 'main.js' ];

test('\npassing test authored in qunit style with ui: qunit in .zuul.yml -- using spec reporter', function (t) {
  zuulmp(args, __dirname + '/passing-qunit', function (err, code) {
    if (err) return t.fail(err);
    t.equal(code, 0, 'exits with code 0')
    t.end();
  });
})
