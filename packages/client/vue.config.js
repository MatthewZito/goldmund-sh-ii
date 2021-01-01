const path = require('path');

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 3000
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@config': path.join(__dirname, './config')
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = require('./package.json').customName;
        return args;
      });
  }
};
