/* eslint-disable unicorn/prefer-module */

module.exports = {
  generalConfig: {
    tags: {
      allowUnknownTags: false,
      dictionaries: ['jsdoc', 'closure'],
    },
    source: {
      include: './src',
    },
    plugins: ['plugins/markdown'],
    opts: {
      template: 'node_modules/docdash',
      encoding: 'utf8',
      destination: 'docs/',
      recurse: true,
      verbose: true,
    },
    templates: {
      cleverLinks: false,
      monospaceLinks: false,
    },
  },
};
