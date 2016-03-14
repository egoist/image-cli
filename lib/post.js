'use strict';
const fs = require('fs');
const request = require('request');
const path = require('path');
const Spin = require('io-spin');
const spin = new Spin('Box1', 'Uploading'.cyan);

module.exports = function post(url) {
  spin.start();
  var file = fs.createReadStream(path.resolve(url));
  var formData = {
    smfile: file
  };
  return new Promise((resolve, reject) => {
    request.post({
      url: 'https://sm.ms/api/upload',
      formData: formData
    }, (err, http, body) => {
      spin.stop();
      if (err) {
        return reject(new Error(err));
      }
      body = JSON.parse(body);
      if (body.code && body.code === 'error') {
        return reject(new Error(body.msg));
      }
      return resolve(body.data);
    });
  });
};
