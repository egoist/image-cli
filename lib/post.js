'use strict';
var request = require('request');
var fs = require('fs');
var path = require('path');
var Spin = require('io-spin');
var Promise = require('pinkie-promise');
var spin = new Spin('Box1', 'Uploading'.cyan);

module.exports = function post(url) {
  spin.start();
  var file = fs.createReadStream(path.resolve(url));
  var formData = {
    smfile: file
  };
  return new Promise(function (resolve, reject) {
    request.post({
      url: 'https://sm.ms/api/upload',
      formData: formData
    }, function (err, http, body) {
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
