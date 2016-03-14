'use strict';
const Spin = require('io-spin');

module.exports = function (text) {
  return new Spin('Box1', text.cyan);
};
