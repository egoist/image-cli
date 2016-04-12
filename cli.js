#!/usr/bin/env node
'use strict';
require('colorful').toxic();
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package');
const imageCli = require('./');
updateNotifier({pkg}).notify();

global.cli = meow([
  'Usage:'.bold,
  '',
  '  $ image <path to image>',
  '',
  'Options',
  '  -p/--proxy        Download image via proxy host, system http_proxy by default',
  '  -e/--ext          Extenstion name for downloaded remote image',
  '  -v/--version      Print version',
  '  -h/--help         Print docs',
  ''
], {
  alias: {
    v: 'version',
    h: 'help',
    e: 'ext',
    p: 'proxy'
  }
});

if (cli.flags.version) {
  console.log(pkg.name.cyan, '~', pkg.version.magenta);
  process.exit();
}

imageCli();
