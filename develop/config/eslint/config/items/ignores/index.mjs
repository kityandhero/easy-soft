/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

import { ignoreCollection as ignoreEmbedPlugins } from './embed.mjs';
import { ignoreCollection as ignoreCustomPlugins } from './custom.mjs';

export const ignoreCollection = [...ignoreEmbedPlugins, ...ignoreCustomPlugins];
