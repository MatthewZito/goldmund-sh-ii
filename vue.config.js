const ImageminPlugin = require('imagemin-webpack-plugin').default;
const { resolve } = require('path');

const resolveAbsolute = dir => resolve(__dirname, dir);

const isProd = process.env.NODE_ENV === 'production';
const isSSL = process.env.VUE_APP_MODE === 'SSL';

const sslConf = {
  host: 'goldmund.dev',
  port: 443,
  https: true
};

const httpConf = {
  host: 'localhost',
  port: 3000
};

module.exports = {
  devServer: {
    disableHostCheck: true,
    ...(isSSL ? sslConf : httpConf)
    // proxy: {}
  },
  outputDir: 'dist',
  lintOnSave: !isProd,
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    optimization: {
      minimize: isProd
    },
    plugins: [
      new ImageminPlugin({
        disable: !isProd
      })
    ],
    resolve: {
      alias: {
        '@pkg': resolveAbsolute('./package.json'),
      }
    }
  },
  chainWebpack: (config) => {

    if (!isProd) config.plugins.delete('friendly-errors');

    config.plugin('html')
      .tap((args) => {
        args[0].title = require('./package.json').appName;
        return args;
      });

    if (config.plugins.has('preload')) {
      // improve performance on initial render
      config.plugin('preload')
        .tap(() => [{
          // ignore runtime
          rel: 'preload',
          fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
          include: 'initial'
        }]);
    }

    // prevent request redundancy
    config.plugins.delete('prefetch');

    config.module
      .rule('fonts')
      .test(/\.(ttf|otf|eot|woff|woff2)$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        options = {
          name: 'fonts/[contenthash].[ext]'
        };
        return options;
      })
      .end();

    /* Webpack SplitChunks Plugin (built-in) Configurations */
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {

        /* Chunk Dependencies */
        vendor: {
          name (module) {
            const pkgName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${pkgName.replace('@', '')}`;
          },
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'all'
        },

        /* Chunk Vuetify */
        vuetify: {
          name: 'chunk-vuetify',
          test: /[\\/]node_modules[\\/]_?vuetify(.*)/,
          priority: 20
        },

        /* Chunk Components */
        commons: {
          name: 'chunk-commons',
          test: resolveAbsolute('src/components'),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    });
    config.optimization.runtimeChunk('single');
  }
};
