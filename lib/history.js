'user strict';
const config = require('./config');

exports.add = function (item) {
  const history = config.get('history');
  if (history.length === 10) {
    history.pop();
  }
  history.unshift(item);
  config.set('history', history);
};

exports.get = function () {
  return config.get('history');
};
