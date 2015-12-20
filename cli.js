#!/usr/bin/env node

'use strict';
require('colorful').toxic();
var meow = require('meow');
var updateNotifier = require('update-notifier');
var pkg = require('./package');
var imageCli = require('./');
updateNotifier({pkg: pkg}).notify();

var cli = meow([
  'Usage',
  '  $ image-cli [path to image]',
  '',
  'Options',
  '  --version      Print version',
  '  --help         Print docs',
  '',
]);

if (cli.flags.v || cli.flags.version) {
  console.log(pkg.name.cyan, '~', pkg.version.magenta)
  process.exit()
}

imageCli(cli.input, cli.flags);
