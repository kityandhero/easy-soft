/* eslint-disable import/no-commonjs */

let { generalRules, sortRules } = require('../rules');

const rules = {
  ...generalRules,
  ...sortRules,
};

console.log(rules);

// eslint-disable-next-line import/no-commonjs
module.exports = {
  generalConfig: {
    extends: ['taro/react', 'prettier', 'plugin:promise/recommended'],
    env: { es6: true },
    plugins: ['simple-import-sort', 'import', 'prettier'],
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ['@babel/preset-react'],
      },
    },
    rules: rules,
  },
};
