module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    'vue'
  ],
  ignorePatterns: [
    'api/*'
  ],
  rules: {
    'no-console': 'warn',
    semi: [
      2,
      'always'
    ],
    'vue/html-closing-bracket-newline': 'off'
  }
}