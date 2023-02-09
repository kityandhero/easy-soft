/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { rules } = require('./items/rules');
const { parserOptions } = require('./items/parser');
const { pluginCollection } = require('./items/plugins');
const { extendCollection } = require('./items/extends');
const { settings } = require('./items/settings');

module.exports = {
  generalConfig: {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:unicorn/recommended',
      'plugin:promise/recommended',
      'prettier',
      ...extendCollection,
    ],
    env: {
      es6: true,
      browser: true,
      commonjs: true,
      jest: true,
      worker: true,
      shelljs: true,
      node: true,
    },
    plugins: [
      'unicorn',
      'simple-import-sort',
      'import',
      'prettier',
      ...pluginCollection,
    ],
    parser: '@babel/eslint-parser',
    parserOptions: parserOptions,
    rules: rules,
    settings: settings,
  },
};
