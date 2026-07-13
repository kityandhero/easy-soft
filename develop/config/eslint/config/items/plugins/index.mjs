/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

import { pluginCollection as embedPlugins } from './embed.mjs';
import { pluginCollection as customPlugins } from './custom.mjs';

export const pluginCollection = { ...embedPlugins, ...customPlugins };
