import { resolve } from 'path';
import { defineConfig } from 'vite';

/* Plugins */
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import eslint from '@rollup/plugin-eslint';
import builtins from 'rollup-plugin-node-builtins';

const builtinsPlugin = {
  ...builtins({
    /* nodejs stdlib polyfills */
    process: true,
    util: true
  }),
  name: 'rollup-plugin-node-builtins'
};

const resolveAbsolute = dir => resolve(__dirname, dir);

export default defineConfig({
  plugins: [
    vue(),

    /* dynamic legacy environment support */
    legacy({
      targets: [
        'defaults'
      ]
    }),

    /* runtime eslint parsing */
    {
      ...eslint({
        include: 'src/**/*.+(js|vue)'
      }),
      enforce: 'pre'
    }
  ],

  /* alias resolution */
  resolve: {
    alias: {
      '@': resolveAbsolute('src'),
      '@pkg': resolveAbsolute('./package.json')
    }
  },

  /* rollup overrides */
  rollupInputOptions: {
    preserveEntrySignatures: 'strict',
    plugins: [
      builtinsPlugin
    ]
  },

  /* auto-import */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/index';`
      }
    }
  },

  /* build configurations */
  build: {
    // < limit to base64 string
    assetsInlineLimit: 10000
  }

});
