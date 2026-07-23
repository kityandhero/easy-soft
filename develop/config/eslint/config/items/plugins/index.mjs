/** generate by easy-soft-develop */

import {
  pluginCollection as embedPlugins,
  pluginXCollection as embedPluginsX,
} from './embed.mjs';
import {
  pluginCollection as customPlugins,
  pluginXCollection as customPluginsX,
} from './custom.mjs';

export const pluginCollection = {
  ...embedPlugins,
  ...customPlugins,
};

export const pluginXCollection = {
  ...embedPluginsX,
  ...customPluginsX,
};
