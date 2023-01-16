// eslint-disable-next-line import/no-commonjs
const rollup = require('rollup');

// eslint-disable-next-line import/no-commonjs
const builder = require('../easy-soft-rollup/rollupAssist/configBuilder.js');

const inputFile = {
  ...{
    index: 'src/index.js',
  },
};

const config = builder.buildConfig({
  terser: false,
  inputFile,
  terser: false,
});

console.log({ message: 'rollup.config.skipCompression.js' });

const watcher = rollup.watch(config);

watcher.on('event', (event) => {
  // event.code 会是下面其中一个：
  //   START        — 监听器正在启动（重启）
  //   BUNDLE_START — 构建单个文件束
  //   BUNDLE_END   — 完成文件束构建
  //   END          — 完成所有文件束构建
  //   ERROR        — 构建时遇到错误
  //   FATAL        — 遇到无可修复的错误

  if (event.code === 'BUNDLE_END') {
    console.log('BUNDLE_END');
  }
});

// 停止监听
watcher.close();
