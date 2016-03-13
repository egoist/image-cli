'user strict';
const pkg = require('../package');
const Config = require('configstore');

module.exports = new Config(pkg.name, {
  history: []
});
