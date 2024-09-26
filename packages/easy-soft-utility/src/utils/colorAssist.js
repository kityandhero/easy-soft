import { isNumber } from './checkAssist';
import { logException } from './loggerAssist';
import { seededRandom } from './meta';

/**
 * Build random hex color through configuration such as seeds
 * @param {*} seed
 */
export function buildRandomHexColor({ seed }) {
  return `#${(
    '00000' + Math.trunc(seededRandom({ seed }) * 0x1_00_00_00).toString(16)
  ).slice(-6)}`;
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
  const reg = /^#([\dA-f]{3}|[\dA-f]{6})$/;

  let c = (color ?? '').toLowerCase();

  if (reg.test(c)) {
    // change to full hex color value, eg: #fff => #ffffff
    if (c.length === 4) {
      c = `#${c.charAt(1)}${c.charAt(1)}${c.charAt(2)}${c.charAt(2)}${c.charAt(3)}${c.charAt(3)}`;
    }

    const colorChange = [];

    for (let index = 1; index < 7; index += 2) {
      colorChange.push(Number.parseInt('0x' + c.slice(index, index + 2)));
    }

    if (symbol) {
      return `${symbol}(${colorChange.join(',')})`;
    }

    if (arrayMode) {
      return colorChange;
    }

    return colorChange.join(',');
  } else {
    logException(`Invalid hex color -> ${color}`);

    return c;
  }
}

/**
 * Build hex color like '#E564F2'
 * @param {Object} options options
 * @param {number} options.progress progress
 * @param {string} options.startColor start color like "#11A612"
 * @param {string} options.endColor end color like "#4F5612"
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

  return `linear-gradient(${d}, ${list.join(',')})`;
}
