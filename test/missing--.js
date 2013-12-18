'use strict';
/*jshint asi: true */

var test = require('tap').test
var zuulmp = require('../');


test('\nwhen no -- is supplied, i.e. zuul-mp main.js', function (t) {
  var args = [ 'main.js' ];
  zuulmp(args, __dirname + '/passing-qunit', function (err, code) {
    if (err) return (t.fail(err), t.end);
    t.equal(code, 0, 'exits with code 0')
    t.end();
  });
})

test('\nwhen no -- is supplied, but options are after test file, i.e. zuul-mp main.js --reporter list', function (t) {
  var args = [ 'main.js', '--reporter', 'list' ];
  zuulmp(args, __dirname + '/passing-qunit', function (err, code) {
    if (err) return (t.fail(err), t.end);
    t.equal(code, 0, 'exits with code 0')
    t.end();
  });
})

test('\nwhen no -- is supplied, but options before test file are, i.e. zuul-mp --reporter list main.js', function (t) {
  var args = [ '--reporter', 'list', 'main.js' ];
  zuulmp(args, __dirname + '/passing-qunit', function (err, code) {
    if (err) return (t.fail(err), t.end);
    t.equal(code, 0, 'exits with code 0')
    t.end();
  });
})
