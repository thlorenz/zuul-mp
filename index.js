'use strict';

var asyncreduce = require('asyncreduce')
  , resolveBin = require('resolve-bin')
  , spawn = require('child_process').spawn

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

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

function run(bin, args, cb) {
  var prog = spawn(
      bin
    , args
    , { stdio: 'inherit' }
  )

  inspect(prog);
  prog
    .on('close', function (code) {
      if (code !== 0) return cb(new Error('prog ' + args.join(' ') + ' returned with code ' + code));
      cb();
    })

  return prog;
}

var go = module.exports = function (argv, env, cb) {
  var args = argv.slice(2);
  resolveBins([ 'zuul', 'mocha-phantomjs'], function (err, bins) {
    if (err) return cb(err);
    var zuul = run(bins.zuul, args, function (err) {
      if (err) return cb(err);
      console.log('zuul finished');
    });

    console.log('started zuul');
    process.kill(zuul);
  });    
};


// Test
if (!module.parent && typeof window === 'undefined') {
  go(process.argv, process.env, function (err) {
    if (err) return console.error(err);
  });
}
