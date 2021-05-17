import { resolve } from 'path';
import { defineConfig } from 'vite';

/* Plugins */
import Vue from '@vitejs/plugin-vue';
import Legacy from '@vitejs/plugin-legacy';
import Builtins from 'rollup-plugin-node-builtins';
import SvgLoader from 'vite-plugin-svg-icons';

// import eslint from '@rollup/plugin-eslint';

const resolveAbsolute = dir => resolve(__dirname, dir);

export default defineConfig({
  base: '/',

  server: {
    open: true
  },

  /* Plugins */
  plugins: [

    /* Vue */
    Vue(),

    /* Legacy Environment Support */
    // Legacy({
    //   targets: [
    //     'defaults'
    //   ]
    // }),

    SvgLoader({
      iconDirs: [resolve(process.cwd(), 'src/data/icons')],
      symbolId: 'icon-[dir]-[name]'
    })

  ],

  /* Alias Resolution */
  resolve: {
    alias: {
      '@': resolveAbsolute('./src'),
      '@pkg': resolveAbsolute('./package.json')
    }
  },

  /* Rollup Overrides */
  rollupInputOptions: {
    external: [
      // ha, um no
      // https://github.com/apollographql/apollo-client/issues/8190
      'react'
    ],
    preserveEntrySignatures: 'strict',
    plugins: [
      {
        ...Builtins({
          /* nodejs stdlib polyfills */
          process: true,
          util: true,
          require: true
        }),
        name: 'rollup-plugin-node-builtins'
      }
    ]
  },

  /* Auto-Import */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/index';`
      }
    }
  },

  /* Build Configurations */
  build: {
    // < limit to base64 string
    assetsInlineLimit: 10000
  },

  optimizeDeps: {
    include: [
      '@apollo/client/core',
      '@apollo/client/cache'
    ]
  }

});
