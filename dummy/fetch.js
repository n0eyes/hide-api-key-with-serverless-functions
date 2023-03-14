const data = require('./data.js');

module.exports = () => {
  return Promise.resolve(data.results[0]);
};
