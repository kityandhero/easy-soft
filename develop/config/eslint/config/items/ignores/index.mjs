import { ignoreCollection as ignoreEmbedPlugins } from './embed.mjs';
import { ignoreCollection as ignoreCustomPlugins } from './custom.mjs';

export const ignoreCollection = [...ignoreEmbedPlugins, ...ignoreCustomPlugins];
