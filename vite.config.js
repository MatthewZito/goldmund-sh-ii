import { resolve } from 'path';
import { defineConfig } from 'vite';

import { extractor } from './scripts/resolveFrontMatter';

/* Plugins */
import Vue from '@vitejs/plugin-vue';
import Legacy from '@vitejs/plugin-legacy';
import Builtins from 'rollup-plugin-node-builtins';
import Markdown from 'vite-plugin-md';
import Pages from 'vite-plugin-pages';
import Prism from 'markdown-it-prism';

// import eslint from '@rollup/plugin-eslint';

const resolveAbsolute = dir => resolve(__dirname, dir);

// import { readFileSync } from 'fs';
// const ssl = {
//   https: {
//     key: readFileSync('./certs/localhost.key'),
//     cert: readFileSync('./certs/localhost.crt'),
//     ca: readFileSync('./certs/RootCA.crt')
//   }
// };

export default defineConfig({
  base: '/',

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
    Legacy({
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
        Prism
      ]
    }),

    /* Route Generator */
    Pages({
      pagesDir: [
        { dir: 'src/pages', baseRoute: '' }
      ],
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
    })

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
        ...Builtins({
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
