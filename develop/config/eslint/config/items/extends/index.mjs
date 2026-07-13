/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

import { extendCollection as extendEmbedPlugins } from './embed.mjs';
import { extendCollection as extendCustomPlugins } from './custom.mjs';

export const extendCollection = [...extendEmbedPlugins, ...extendCustomPlugins];
