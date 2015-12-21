'use strict';
var log = require('typelog');
var clip = require('cliparoo');
var post = require('../post');
var history = require('../history');

module.exports = function (url) {
  if (typeof url !== 'string' || !url) {
    return log.error('Expected a string');
  }

  post(url)
    .then(function (data) {
      var ctrlKey = process.platform === 'darwin' ? 'CMD' : 'Ctrl';
      log.success(ctrlKey + ' + Click ' + data.url.cyan + ' to visit...');
      history.add(data.url);
      clip(data.url, function (err) {
        if (err) {
          return console.log(err);
        }
        log.info('The URL is also in your clipboard now! Paste it in address bar to visit...');
      });
    })
    .catch(function (err) {
      console.log(err.stack);
    });
};
