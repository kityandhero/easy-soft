import { isUndefined } from './checkAssist';
import { assign, assignWith } from './lodashTools';

/**
 * Merge props
 * @param {*} items iterated value -> the items will be merged
 */
export function mergeProps(...items) {
  function customizer(objValue, srcValue) {
    return isUndefined(srcValue) ? objValue : srcValue;
  }

  let ret = assign({}, items[0]);

  for (let i = 1; i < items.length; i++) {
    ret = assignWith(ret, items[i], customizer);
  }

  return ret;
}

/**
 * Build style data to string
 * @param {Object|String} style the style will be builded
 */
export function buildStringStyle(style) {
  if (style && typeof style === 'object') {
    let result = '';

    Object.keys(style).forEach((key) => {
      const lowerCaseKey = (key.replace(/([A-Z])/g, '-$1') ?? '').toLowerCase();
      result += `${lowerCaseKey}:${style[key]};`;
    });

    return result;
  } else if (style && typeof style === 'string') {
    return style;
  }

  return '';
}

/**
 * Merge style
 * @param {Object|String} target the target style will be merged
 * @param {Object|String} style the other style will be merged
 */
export function mergeStyle(target, style) {
  if (
    target &&
    typeof target === 'object' &&
    style &&
    typeof style === 'object'
  ) {
    return Object.assign({}, target, style);
  }

  return buildStringStyle(target) + buildStringStyle(style);
}

export function attachPropertiesToComponent(component, properties) {
  const ret = component;

  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      ret[key] = properties[key];
    }
  }

  return ret;
}
