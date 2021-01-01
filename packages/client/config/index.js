const env = process.env.NODE_ENV || 'development';

const config = {
  development: require('./dev.js'),
  production: require('./prod.js'),
  staging: require('./staging.js')
};

module.exports = config[env];
