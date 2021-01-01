const pkg = require('../package.json');

module.exports = {
  title: pkg.customName,
  version: pkg.version,
  settings: {
    dark: true
  },
  logger: {
    http: true,
    errors: true,
    warnings: true
  }
};

