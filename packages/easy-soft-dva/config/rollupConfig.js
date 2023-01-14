import { buildConfig as buildConfigCore } from '../../easy-soft-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    'dva-core/index': 'src/dva-core/index.js',
  },
  ...{
    'dva-loading/index': 'src/dva-loading/index.js',
  },
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: [],
    // serve: {
    //   open: true,
    //   port: 8082,
    // },
  });
}
