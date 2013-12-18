'use strict';

var asyncreduce = require('asyncreduce')
  , resolveBin = require('resolve-bin')
  , spawn = require('child_process').spawn
  , format = require('util').format
  , PORT = 5557

function getZuluPort(args) {
  var local = args.indexOf('--local');

  // pick default port and insert it into zuul args if none was provided 
  if (!~local) {
    args.unshift(PORT);
    args.unshift('--local');
    return PORT;
  }
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
    , { cwd: cwd }
  )

  prog.stdout.pipe(process.stdout);
  prog.stderr.pipe(process.stderr);

  prog.on('close', function (code) {
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
 * @param {Array.<String>} args arguments passed to zuul and phantomjs
 * @param {String} cwd working directory to be used for zuul and mocha-phantomjs
 * @param {Function(Error, Number)} cb called back with eventual error and the exit code (0 if all went good)
 */
var go = module.exports = function (args, cwd, cb) {
  var port = getZuluPort(args);
  if (!port) return cb(new Error('Please provide a port for the zulu server, i.e. --local 3000'), -1);

  var route = format('http://localhost:%d/__zuul', port);

  resolveBins([ 'zuul', 'mocha-phantomjs'], function (err, bins) {
    if (err) return cb(err);

    var zuul = run(bins.zuul, args, cwd, function (err, code) {
      if (err) return cb(err, code);
    });

    // wait for zuul to start up and tell us to point our browser at the url
    zuul.stdout.once('data', function () {
      run(bins['mocha-phantomjs'], [route].concat(args), cwd, function (err, code) {
        zuul.kill();
        cb(err, code);
      });
    });
  });    
};
