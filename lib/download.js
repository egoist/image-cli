'use strict';
const fs = require('fs');
const path = require('path');
const got = require('got');
const tempfile = require('tempfile');
const spin = require('./spin');
const downloadSpin = spin('Downloading');

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    downloadSpin.start();
    const ext = cli.flags.ext || path.extname(url);
    const filePath = tempfile(ext);
    const write = got.stream(url).pipe(fs.createWriteStream(filePath));
    write.on('finish', () => {
      downloadSpin.stop();
      resolve(filePath);
    });
    write.on('error', err => {
      downloadSpin.stop();
      reject(new Error(err));
    });
  });
};
