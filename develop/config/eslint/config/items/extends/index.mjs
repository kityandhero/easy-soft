/** generate by easy-soft-develop */

import { extendCollection as extendEmbedPlugins } from './embed.mjs';
import { extendCollection as extendCustomPlugins } from './custom.mjs';

export const extendCollection = [...extendEmbedPlugins, ...extendCustomPlugins];
