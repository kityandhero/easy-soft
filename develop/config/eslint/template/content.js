/** generate by easy-soft-develop */

/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const mainContent = `/** generate by easy-soft-develop */

import { defineConfig } from 'eslint/config';

import { configCollection } from './develop/config/eslint/config/index.mjs';

export default defineConfig(configCollection);
`;

const packageContent = `/** generate by easy-soft-develop */

import { defineConfig } from 'eslint/config';

import { configCollection } from '../../develop/config/eslint/config/index.mjs';

export default defineConfig(configCollection);
`;

module.exports = {
  mainContent,
  packageContent,
};
