import { buildConfig as buildConfigCore } from '../../../developConfig/rollupAssist/configBuilder';

const inputFile = {
  ...{
    index: 'src/index.js',
  },
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
    externalCollection: ['easy-soft-utility'],
  });
}
