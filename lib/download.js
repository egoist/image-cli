'use strict';
const fs = require('fs');
const path = require('path');
const got = require('got');
const tempfile = require('tempfile');
const tunnel = require('tunnel');
const spin = require('./spin');
const downloadSpin = spin('Downloading');

module.exports = function (url, cli) {
  return new Promise((resolve, reject) => {
    downloadSpin.start();
    const ext = cli.flags.ext || path.extname(url.replace(/\?[^.]+$/, ''));
    const filePath = tempfile(ext);
    const opt = {};
    let proxy = process.env.http_proxy || process.env.https_proxy || cli.flags.proxy;
    if (proxy) {
      proxy = proxy.match(/(?:(?:http|https)\:\/\/)?([^~]+)\:([0-9]{1,5})/);
      opt.agent = tunnel.httpOverHttp({
        proxy: {
          host: proxy[1],
          port: proxy[2]
        }
      });
    }
    const request = got.stream(url, opt);
    const write = request.pipe(fs.createWriteStream(filePath));
    request.on('error', error => {
      if (error.statusCode !== 200) {
        downloadSpin.stop();
        reject(error);
      }
    });
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
