'use strict';
const history = require('./lib/routes/history');
const defaultRoute = require('./lib/routes/index');

module.exports = function (cli) {
  const route = cli.input[0];
  switch (route) {
    case 'history':
      return history();
    default:
      return defaultRoute(route);
  }
};
