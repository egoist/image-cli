'user strict';
var pkg = require('../package');
var Config = require('configstore');

module.exports = new Config(pkg.name, {
  history: []
});
