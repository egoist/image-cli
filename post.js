'use strict';
var request = require('request');
var fs = require('fs');
var path = require('path');
var spin = require('io-spin');
var Promise = require('pinkie-promise');

module.exports = function post (url) {
  spin.start('Uploading:', 'Box1');
  var file = fs.createReadStream(path.resolve(url));
  var formData = {
    smfile: file,
  };
  return new Promise(function (resolve, reject) {
    request.post({
      url: 'https://sm.ms/api/upload',
      formData: formData,
    }, function (err, http, body) {
      spin.destroy();
      if (err) {
        return console.log(err.stack);
      }
      body = JSON.parse(body);
      if (body.code && body.code === 'error') {
        return reject(new Error(body.msg));
      }
      return resolve(body.data);
    });
  });
};
