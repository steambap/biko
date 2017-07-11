const path = require('path');

module.exports = {
  webpack(config) {
    config.output.path = path.join(__dirname, './app/dist');
    config.target = 'electron-renderer';
    return config;
  },
  homepage: './',
  autoprefixer: false
};
