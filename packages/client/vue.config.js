module.exports = {
  devServer: {
    disableHostCheck: true
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
    resolve: {}
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = require('./package.json').customName;
        return args;
      });
  }
};
