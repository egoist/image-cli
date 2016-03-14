'use strict';
const history = require('../lib/history');

module.exports = function () {
  const images = history.get();
  console.log(images.join('\n').cyan);
};
