/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

import { settings as embedSettings } from './embed.mjs';
import { settings as customSettings } from './custom.mjs';

export const settings = {
  ...embedSettings,
  ...customSettings,
};
