'use strict';
const history = require('./commands/history');
const defaultRoute = require('./commands/index');

module.exports = function () {
  const route = cli.input[0];
  switch (route) {
    case 'history':
      return history();
    default:
      return defaultRoute(route).catch(e => {
        console.log(e.stack);
        process.exit(1);
      });
  }
};
