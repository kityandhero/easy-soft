/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

export const parserJsOptions = {
  requireConfigFile: false,
  babelOptions: {
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
      ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
      ['@babel/plugin-transform-class-properties', { loose: true }],
    ],
  },
};

export const parserTsOptions = {
  ecmaFeatures: {
    jsx: true,
  },
};
