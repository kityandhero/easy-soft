/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const mainContent = `/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

import { defineConfig } from 'eslint/config';

const { configCollection } = require('./develop/config/eslint/config');

export default defineConfig(configCollection);
`;

const packageContent = `/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

import { defineConfig } from 'eslint/config';

const { configCollection } = require('../../develop/config/eslint/config');

export default defineConfig(configCollection);
`;

module.exports = {
  mainContent,
  packageContent,
};
