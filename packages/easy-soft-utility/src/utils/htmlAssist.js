import { isNumber } from './checkAssist';
import { toNumber } from './convertAssist';
import { modulePackageName } from './definition';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name
 */
const moduleName = 'htmlAssist';

/**
 * Convert pixel to rem string like '0.25rem', default unit precision is 5, default min pixel is 0, it mean ignore convert less than min pixel
 */
export function convertPixelToRem(
  pixel,
  rootValue,
  unitPrecision = 5,
  minPixelValue = 0,
) {
  if (!isNumber(pixel)) {
    return pixel;
  }

  if (!isNumber(rootValue) || rootValue <= 0) {
    throw new Error(
      buildPromptModuleInfo(
        modulePackageName,
        `pxToRem -> root value must be number and greater than 0, current root value [${rootValue}] is invalid`,
        moduleName,
      ),
    );
  }

  const pixels = parseFloat(pixel);

  if (pixels < minPixelValue) {
    return pixel;
  }

  const fixedValue = toNumber(pixels / rootValue, unitPrecision);

  return fixedValue === 0 ? '0' : fixedValue + 'rem';
}
