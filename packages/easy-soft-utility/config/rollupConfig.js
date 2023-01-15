import { buildConfig as buildConfigCore } from '../../easy-soft-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    index: 'src/index.js',
  },
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({ inputFile, terser: whetherTerser });
}
