'use strict';
/*jshint asi: true */

var test = require('tap').test
var zuulmp = require('../');

// reporter picked up by mocha-phantomjs
var args = [ '--local', '3100', '-C', '--reporter', 'list', '--', 'main.js' ];

test('\npassing test authored in bdd style with ui: bdd in .zuul.yml using list reporte', function (t) {
  zuulmp(args, __dirname + '/passing-bdd', function (err, code) {
    if (err) return t.fail(err);
    t.equal(code, 0, 'exits with code 0')
    t.end();
  });
})
