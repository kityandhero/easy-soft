/** generate by easy-soft-develop */

import { rules as embedRules, rulesX as embedRulesX } from './embed.mjs';
import { rules as customRules, rulesX as customRulesX } from './custom.mjs';

export const rules = {
  ...embedRules,
  ...customRules,
};

export const rulesX = {
  ...embedRulesX,
  ...customRulesX,
};
