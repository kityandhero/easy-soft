'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('rollup-plugin-postcss');
var rollupPluginTerser = require('rollup-plugin-terser');
var typescript = require('rollup-plugin-typescript2');
var core = require('@babel/core');
var babelConfig = require('@rollup/plugin-babel');
var commonjs = require('@rollup/plugin-commonjs');
var json = require('@rollup/plugin-json');
var resolve = require('@rollup/plugin-node-resolve');
var url = require('@rollup/plugin-url');
var svgr = require('@svgr/rollup');

const externalCollection = [
  '@babel/runtime',
  '@babel/helpers',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-json',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-url',
  'rollup-plugin-typescript2',
  'rollup-plugin-postcss',
  '@svgr/rollup',
  'rollup-plugin-terser',
  '@rollup/plugin-babel',
  'autoprefixer',
  'cssnano',
  'react',
  'react-dom',
  'react/jsx-runtime',
  'lodash',
  'lodash/filter',
  'lodash/sortBy',
  'lodash/findIndex',
  'lodash/find',
  'lodash/dropRight',
  'lodash/reverse',
  'lodash/replace',
  'lodash/trim',
  'lodash/remove',
  'lodash/difference',
  'lodash/split',
  'lodash/get',
  'lodash/sortedUniq',
  'lodash/endsWith',
  'lodash/assign',
  'lodash/assignWith',
  'lodash/forEach',
  'lodash/memoize',
  'lodash/round',
  'lodash/floor',
  'lodash/gte',
  'lodash/first',
  'lodash/set',
  'lodash/size',
  'lodash/map',
  'lodash/startsWith',
  'lodash/isEqual',
  'lodash/isFunction',
  'lodash/isBoolean',
  'lodash/isUndefined',
  'lodash/isNull',
  'lodash/isDate',
  'lodash/isString',
  'lodash/isObject',
  'lodash/isNumber',
  'lodash/toNumber',
  'lodash/toString',
  'lodash/toUpper',
  'lodash/toLower',
  'lodash/uniqBy',
  'qs',
  'dayjs',
  'node-cache',
  'redux',
  'redux-logger',
  'react-redux',
  'redux-thunk',
  'classnames',
  'prismjs',
  'babel-plugin-prismjs',
  'object-hash',
  'invariant',
  'flatten',
  'mm',
  'warning',
  'global',
  'is-plain-object',
  'redux-saga',
  '@reduxjs/toolkit',
];

function buildConfig$1({
  inputFile,
  terser: whetherTerser = false,
  externalCollection: otherExternalCollection = [],
  // serve: whetherServe = false,
}) {
  const externals = [...externalCollection, ...(otherExternalCollection || [])];

  console.log({
    inputFile,
    terser: whetherTerser,
    externals,
  });

  const config = {
    external: (d) => {
      return /^react$/.test(d) || d.includes('@babel/runtime');
    },
    input: inputFile,
    plugins: [
      json(),
      url(),
      svgr(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svelte'],
        preferBuiltins: false,
      }),
      commonjs({
        include: ['node_modules/**', '../../node_modules/**'],
      }),
      typescript({
        // check: true,
        // verbosity: 3,
        tsconfig: 'tsconfig.json',
      }),
      postcss({
        plugins: [autoprefixer(), cssnano()],
        inject: { insertAt: 'top' },
        extract: true,
        // modules: true,
      }),
      babelConfig({
        extensions: [...core.DEFAULT_EXTENSIONS, ...['ts', 'tsx']],
        babelHelpers: 'runtime',
      }),
    ],
    external: externals,
    output: {
      entryFileNames: '[name].js',
      dir: 'es',
      chunkFileNames: '[name].js',
      format: 'es',
      sourcemap: process.env.NODE_ENV === 'development',
    },
  };

  if (whetherTerser) {
    config.plugins.push(rollupPluginTerser.terser());
  }

  // if (whetherServe) {
  //   config.plugins.push(livereload());

  //   config.plugins.push(serve(whetherServe));
  // }

  return config;
}

const inputFile = {
  ...{
    index: 'src/index.js',
  },
};

function buildConfig({ terser: whetherTerser = false }) {
  return buildConfig$1({ inputFile, terser: whetherTerser });
}

const config = buildConfig({ terser: true });

console.log({ message: 'rollup.config.compression.js' });

exports.default = config;
