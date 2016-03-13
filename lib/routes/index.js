'use strict';
const co = require('co');
const clip = require('cliparoo');
const imgcat = require('term-img');
const pify = require('pify');
const boxen = require('boxen');
const post = require('../post');
const history = require('../history');

module.exports = co.wrap(function* (filePath) {
  if (typeof filePath !== 'string' || !filePath) {
    return console.log(`Expected a string`.red);
  }

  // the data to be logged
  let result = [];

  const data = yield post(filePath);
  const url = ensureHttps(data.url);

  // print image info after success
  result.push(url.cyan);

  // add to history
  history.add(url);

  // copy to clipboard
  try {
    yield pify(clip)(url);
    result.push('The URL is also in your clipboard now!'.bold);
  } catch (e) {
    console.log(e.stack.red);
    process.exit(1);
  }

  // print result in box
  console.log(boxen(result.join('\n'), {borderStyle: 'classic', padding: 1}));

  // get image base64 and encoded data to print in iTerm
  try {
    yield imgcat(filePath);
  } catch (_) {
    // do nothing
  }
});

function ensureHttps(url) {
  return url.replace(/^http/, 'https');
}
