'use strict';

var asyncreduce = require('asyncreduce')
  , resolveBin = require('resolve-bin')
  , spawn = require('child_process').spawn
  , format = require('util').format

function getZuluPort(args) {
  var local = args.indexOf('--local');
  if (!~local) return undefined;
  return args[local + 1];
}

function resolveBins(names, cb) {
  asyncreduce(
      names
    , {}
    , function (acc, name, cb_) {
        resolveBin(name, function (err, dir) {
          if (err) return cb_(err);
          acc[name] = dir;
          cb_(null, acc);
        });
      }
    , cb
  )
}

function run(bin, args, cwd, cb) {
  var prog = spawn(
      bin
    , args
    , { stdio: 'inherit', cwd: cwd }
  )

  prog
    .on('close', function (code) {
      if (code !== 0) return cb(new Error('prog ' + args.join(' ') + ' returned with code ' + code), code);
      cb(null, code);
    })

  return prog;
}

/**
 * Starts up a zuul server and runs mocha-phantomjs against it.
 *
 * @name zuulmp
 * @function
 * @param args {Array[String]} arguments passed to zuul and phantomjs
 * @param cwd {String} working directory to be used for zuul and mocha-phantomjs
 * @param cb {Function} called back with eventual error and the exit code (0 if all went good)
 */
var go = module.exports = function (args, cwd, cb) {
  var port = getZuluPort(args);
  if (!port) return cb(new Error('Please provide a port for the zulu server, i.e. --local 3000'), -1);

  var route = format('http://localhost:%d/__zuul', port);

  resolveBins([ 'zuul', 'mocha-phantomjs'], function (err, bins) {
    var zuul, mp;

    if (err) return cb(err);

    zuul = run(bins.zuul, args, cwd, function (err, code) {
      if (err) {
        if (mp) mp.kill();
        return cb(err, code);
      }
    });

    mp = run(bins['mocha-phantomjs'], [route].concat(args), cwd, function (err, code) {
      zuul.kill();
      cb(err, code);
    });
  });    
};
