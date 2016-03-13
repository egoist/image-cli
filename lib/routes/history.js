'use strict';
const history = require('../history');

module.exports = function () {
  const images = history.get();
  console.log(images.join('\n').cyan);
};
