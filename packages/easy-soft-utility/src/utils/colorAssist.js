import { isNumber } from './checkAssist';
import { logError } from './loggerAssist';

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
 * Build linear gradient css color, direct number value will be converted like '15deg'
 */
export function buildLinearGradient({ direct, list = [] }) {
  const d = isNumber(direct) ? `${direct}deg` : direct;

  return `linear-gradient(${d}, ${list.join()})`;
}
