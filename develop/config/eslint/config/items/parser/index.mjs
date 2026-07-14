import {
  parserJsOptions as embedParserJsOptions,
  parserTsOptions as embedParserTsOptions,
} from './embed.mjs';
import {
  parserJsOptions as customParserJsOptions,
  parserTsOptions as customParserTsOptions,
} from './custom.mjs';

export const parserJsOptions = {
  ...embedParserJsOptions,
  ...customParserJsOptions,
};

export const parserTsOptions = {
  ...embedParserTsOptions,
  ...customParserTsOptions,
};
