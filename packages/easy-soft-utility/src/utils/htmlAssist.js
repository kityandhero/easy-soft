import { isNumber } from './checkAssist';
import { toNumber } from './convertAssist';

/**
 * convert px to rem
 * @param {*} pixel number -> px will be converted
 * @param {*} rootValue number -> the root value
 * @param {*} unitPrecision number -> unit precision， default is 5
 * @param {*} minPixelValue number -> min pixel ignore convert, default is 0
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
      `${modulePackageName}::${moduleName}::pxToRem -> root value must be number and greater than 0, current root value [${rootValue}] is invalid.`,
    );
  }

  const pixels = parseFloat(pixel);

  if (pixels < minPixelValue) {
    return pixel;
  }

  const fixedVal = toNumber(pixels / rootValue, unitPrecision);

  return fixedVal === 0 ? '0' : fixedVal + 'rem';
}
