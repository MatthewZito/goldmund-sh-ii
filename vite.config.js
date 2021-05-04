import { resolve } from 'path';
import { defineConfig } from 'vite';

import { extractor } from './scripts/resolveFrontMatter';

/* Plugins */
import Vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
// import eslint from '@rollup/plugin-eslint';
import builtins from 'rollup-plugin-node-builtins';
import Markdown from 'vite-plugin-md';
import Pages from 'vite-plugin-pages';

import prism from 'markdown-it-prism';

const resolveAbsolute = dir => resolve(__dirname, dir);

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/goldmund-sh-ii/' : './',

  server: {
    open: true
  },

  /* Plugins */
  plugins: [

    /* Vue */
    Vue({
      include: [
        /\.vue$/,
        /\.md$/
      ]
    }),

    /* Legacy Environment Support */
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
      wrapperComponent: 'BlogContainer',
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
            meta: {
              frontmatter: extractor(route.component)
            }
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

  /* Alias Resolution */
  resolve: {
    alias: {
      '@': resolveAbsolute('./src'),
      '@pkg': resolveAbsolute('./package.json')
    }
  },

  /* Rollup Overrides */
  rollupInputOptions: {
    preserveEntrySignatures: 'strict',
    plugins: [
      {
        ...builtins({
          /* nodejs stdlib polyfills */
          process: true,
          util: true
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
  }

});
