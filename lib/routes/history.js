'use strict';
var history = require('../history');

module.exports = function () {
  var images = history.get();
  console.log(images.join('\n').cyan);
};
