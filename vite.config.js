import { resolve } from 'path';
import { defineConfig } from 'vite';

import { resolver } from './resolveFrontMatter';

/* Plugins */
import Vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import eslint from '@rollup/plugin-eslint';
import builtins from 'rollup-plugin-node-builtins';
import Markdown from 'vite-plugin-md';
import Pages from 'vite-plugin-pages';

import prism from 'markdown-it-prism';

const builtinsPlugin = {
  ...builtins({
    /* nodejs stdlib polyfills */
    process: true,
    util: true
  }),
  name: 'rollup-plugin-node-builtins'
};

const resolveAbsolute = dir => resolve(__dirname, dir);

let v;
export default defineConfig({
  v: null,
  plugins: [

    /* Vue */
    Vue({
      include: [
        /\.vue$/,
        /\.md$/
      ]
    }),

    /* dynamic legacy environment support */
    legacy({
      targets: [
        'defaults'
      ]
    }),

    /* Markdown Renderer */
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      wrapperComponent: 'Container',
      markdownItUses: [
        prism
      ]
    }),

    /* Route Generator */
    Pages({
      pagesDir: 'src/pages',
      importMode () {
        return 'async';
      },
      extendRoute (route) {
        if (route.component.endsWith('.md')) {

          return {
            ...route,
            meta: { frontmatter: resolver(route.component) }
          }
        }
      },
      extensions: [
        'vue',
        'md'
      ],
      syncIndex: true,
      replaceSquareBrackets: true
    }),

    /* runtime eslint parsing */
    // {
    //   ...eslint({
    //     include: 'src/**/*.+(js)'
    //   }),
    //   enforce: 'pre'
    // }
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
