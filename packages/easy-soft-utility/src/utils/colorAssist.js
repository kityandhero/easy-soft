import { isNumber } from './checkAssist';
import { logError } from './loggerAssist';
import { seededRandom } from './meta';

/**
 * Build random hex color through configuration such as seeds
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function buildRandomHexColor({ seed }) {
  return `#${`00000${((seededRandom({ seed }) * 0x1000000) << 0).toString(
    16,
  )}`.substring(-6)}`;
}

/**
 * convert hex color  to RGB color
 * @param {*} color string -> hex color
 * @param {*} symbol string -> default is 'RGB'
 * @param {*} arrayMode bool -> whether return array type color like [255,255,255]
 */
export function buildRGBColorFromHexColor(
  color,
  symbol = 'RGB',
  arrayMode = false,
) {
  // full hex regular
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  let c = (color ?? '').toLowerCase();

  if (reg.test(c)) {
    // change to full hex color value, eg: #fff => #ffffff
    if (c.length === 4) {
      let colorNew = '#';

      for (let i = 1; i < 4; i += 1) {
        colorNew += c.slice(i, i + 1).concat(c.slice(i, i + 1));
      }
      c = colorNew;
    }

    const colorChange = [];

    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + c.slice(i, i + 2)));
    }

    if (symbol) {
      return `${symbol}(${colorChange.join(',')})`;
    }

    if (arrayMode) {
      return colorChange;
    }

    return colorChange.join(',');
  } else {
    logError(`Invalid hex color -> ${color}`);

    return c;
  }
}

/**
 * Build hex color like '#E564F2'
 * @param {*} param0
 * @returns
 */
export function buildHexColor({ progress, startColor, endColor }) {
  const start = buildRGBColorFromHexColor(startColor, null, true);
  const end = buildRGBColorFromHexColor(endColor, null, true);

  const [startRed, startBlue, startGreen] = start;

  const [endRed, endBlue, endGreen] = end;

  const result = [
    (startRed + Math.round((endRed - startRed) * progress)).toString(16),
    (startBlue + Math.round((endBlue - startBlue) * progress)).toString(16),
    (startGreen + Math.round((endGreen - startGreen) * progress)).toString(16),
  ];

  return `#${result.join('').toUpperCase()}`;
}

/**
 * Build linear gradient css color, direct number value will be converted like '15deg'
 */
export function buildLinearGradient({ direct, list = [] }) {
  const d = isNumber(direct) ? `${direct}deg` : direct;

  return `linear-gradient(${d}, ${list.join()})`;
}
