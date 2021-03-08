module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
    es6: true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020
  },

  plugins: [
    'vue'
  ],

  ignorePatterns: [
    'repl.js'
  ],

  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    semi: [2, 'always'],
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off'
  },

  reportUnusedDisableDirectives: true
};
