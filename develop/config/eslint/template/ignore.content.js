/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */

const content = `**/public
**/lib
**/es
**/.history
**/.vs
**/.swc

*.d.ts
*.log
*.zip
*.txt
*.7z
*.min.js
rollup.config-*.cjs
`;

module.exports = {
  content,
};
