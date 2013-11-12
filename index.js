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

function run(bin, args, env, cb) {
  var prog = spawn(
      bin
    , args
    , { env: env }
  )
  prog.stdout.pipe(process.stdout);
  prog.stderr.pipe(process.stderr);

  prog
    .on('close', function (code) {
      if (code !== 0) return cb(new Error('prog ' + args.join(' ') + ' returned with code ' + code), code);
      cb();
    })

  return prog;
}

var go = module.exports = function (argv, env, cb) {
  var args = argv.slice(2);
  var port = getZuluPort(args);
  if (!port) return cb(new Error('Please provide a port for the zulu server, i.e. --local 3000'), -1);

  resolveBins([ 'zuul', 'mocha-phantomjs'], function (err, bins) {
    var zuul;

    if (err) return cb(err);

    zuul = run(bins.zuul, args, env, function (err, code) {
      if (err) return cb(err, code);
    });

    zuul.stdout.once('data', function (d) {
      var route = format('http://localhost:%d/__zuul', port);

      var mp = run(bins['mocha-phantomjs'], [ route ], env, function (err, code) {
        process.kill(zuul);
        cb(err, code);
      });
    });
  });    
};


// Test
if (!module.parent && typeof window === 'undefined') {
  go(process.argv, process.env, function (err, code) {
    if (err) console.error(err);
    process.exit(code);
  });
}
