import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import babelConfig from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';

const externalCollection = [
  '@babel/helpers',
  '@babel/runtime',
  '@reduxjs/toolkit',
  '@rollup/plugin-babel',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-json',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-terser',
  '@rollup/plugin-url',
  '@svgr/rollup',
  'autoprefixer',
  'babel-plugin-prismjs',
  'classnames',
  'cssnano',
  'dayjs',
  'flatten',
  'global',
  'invariant',
  'is-plain-object',
  'lodash',
  'lodash/assign',
  'lodash/assignWith',
  'lodash/difference',
  'lodash/dropRight',
  'lodash/endsWith',
  'lodash/filter',
  'lodash/find',
  'lodash/findIndex',
  'lodash/first',
  'lodash/floor',
  'lodash/forEach',
  'lodash/get',
  'lodash/gte',
  'lodash/isBoolean',
  'lodash/isDate',
  'lodash/isEqual',
  'lodash/isFunction',
  'lodash/isNull',
  'lodash/isNumber',
  'lodash/isObject',
  'lodash/isString',
  'lodash/isUndefined',
  'lodash/map',
  'lodash/memoize',
  'lodash/remove',
  'lodash/replace',
  'lodash/reverse',
  'lodash/round',
  'lodash/set',
  'lodash/size',
  'lodash/sortBy',
  'lodash/sortedUniq',
  'lodash/split',
  'lodash/startsWith',
  'lodash/toLower',
  'lodash/toNumber',
  'lodash/toString',
  'lodash/toUpper',
  'lodash/trim',
  'lodash/uniqBy',
  'mm',
  'node-cache',
  'object-hash',
  'prismjs',
  'qs',
  'react',
  'react-dom',
  'react-redux',
  'react/jsx-runtime',
  'redux',
  'redux-logger',
  'redux-saga',
  'redux-thunk',
  'rollup-plugin-postcss',
  'rollup-plugin-typescript2',
  'warning',
];

export function buildConfig({
  inputFile,
  terser: whetherTerser = false,
  externalCollection: otherExternalCollection = [],
  babelConfig: babelExtraConfig = {},
}) {
  const externals = [...externalCollection, ...(otherExternalCollection || [])];

  console.log({
    inputFile,
    terser: whetherTerser,
    externals,
  });

  const config = {
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
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          '@babel/preset-env',
        ],
        plugins: [
          '@babel/plugin-transform-react-jsx',
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-transform-private-methods', { loose: true }],
          [
            '@babel/plugin-transform-private-property-in-object',
            { loose: true },
          ],
          ['@babel/plugin-transform-class-properties', { loose: true }],
          '@babel/plugin-external-helpers',
          [
            '@babel/plugin-transform-runtime',
            {
              regenerator: true,
              helpers: true,
              version: '^7.7.7',
            },
          ],
        ],
        extensions: [...DEFAULT_EXTENSIONS, 'ts', 'tsx'],
        babelHelpers: 'runtime',
        ...babelExtraConfig,
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
    config.plugins.push(terser());
  }

  // if (whetherServe) {
  //   config.plugins.push(livereload());

  //   config.plugins.push(serve(whetherServe));
  // }

  return config;
}
