/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

import { rules as embedRules } from './embed.mjs';
import { rules as customRules } from './custom.mjs';

export const rules = {
  ...embedRules,
  ...customRules,
};
