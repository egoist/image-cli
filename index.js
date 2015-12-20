'use strict';
var log = require('typelog');
var clip = require('cliparoo');
var post = require('./post');

module.exports = function (_, opts) {
  opts = opts || {};
  var url = _[0];

  if (typeof url !== 'string' || !url) {
    return log.error('Expected a string');
  }

  post(url)
    .then(function (data) {
      log.success('Ctrl + Click ' + data.url.cyan + ' to visit...');
      clip(data.url, function (err) {
        if (err) {
          throw err;
        }
        log.info('The URL is also in your clipboard now! Paste it in address bar to visit...');
      });
    })
    .catch(function (err) {
      console.log(err.stack);
    });
};
