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
  '  $ image-cli [input]',
  '',
  'Options',
  '  --foo  Lorem ipsum. [Default: false]',
  '',
  'Examples',
  '  $ image-cli',
  '  unicorns & rainbows',
  '  $ image-cli ponies',
  '  ponies & rainbows'
]);

imageCli(cli.input, cli.flags);
