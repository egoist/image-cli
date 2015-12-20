'use strict';
var history = require('./lib/routes/history');
var defaultRoute = require('./lib/routes/index');

module.exports = function (_, opts) {
  opts = opts || {};
  var route = _[0];
  switch (route) {
    case 'history':
      return history();
    default:
      return defaultRoute(route);
  }
};
