'use strict';
const co = require('co');
const clip = require('cliparoo');
const pify = require('pify');
const boxen = require('boxen');
const post = require('../lib/post');
const history = require('../lib/history');

const main = co.wrap(function* (filePath) {
  if (typeof filePath !== 'string' || !filePath) {
    return console.log(`Expected a string`.red);
  }

  // the data to be logged
  let result = [];

  const data = yield post(filePath);
  const url = data.url;

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

  result.push(`To delete, click ${data.delete.red}`);

  // print result in box
  console.log(boxen(result.join('\n'), {borderStyle: 'classic', padding: 1}));
});

module.exports = main;
