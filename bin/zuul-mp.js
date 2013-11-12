#!/usr/bin/env node

'use strict';

var args = process.argv.slice(2);

require('../')(args, process.cwd(), function (err, code) {
  if (err) console.error(err);
  process.exit(code);
});
