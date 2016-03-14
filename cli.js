#!/usr/bin/env node
'use strict';
require('colorful').toxic();
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package');
const imageCli = require('./');
updateNotifier({pkg}).notify();

const cli = meow([
  'Usage:'.bold,
  '',
  '  $ image <path to image>',
  '',
  'Options',
  '  -v/--version      Print version',
  '  -h/--help         Print docs',
  ''
], {
  alias: {
    v: 'version',
    h: 'help'
  }
});

if (cli.flags.version) {
  console.log(pkg.name.cyan, '~', pkg.version.magenta);
  process.exit();
}

imageCli(cli);
