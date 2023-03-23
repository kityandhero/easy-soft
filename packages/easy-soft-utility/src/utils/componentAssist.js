import { isUndefined } from './checkAssist';
import { assign, assignWith } from './lodashTools';

function customizer(objectValue, sourceValue) {
  return isUndefined(sourceValue) ? objectValue : sourceValue;
}

/**
 * Merge props
 * @param {*} items iterated value -> the items will be merged
 */
export function mergeProperties(...items) {
  let returnValue = assign({}, items[0]);

  for (let index = 1; index < items.length; index++) {
    returnValue = assignWith(returnValue, items[index], customizer);
  }

  return returnValue;
}

/**
 * Build style data to string
 * @param {Object|string} style the style will be builded
 */
export function buildStringStyle(style) {
  if (style && typeof style === 'object') {
    let result = '';

    for (const key of Object.keys(style)) {
      const lowerCaseKey = (key.replace(/([A-Z])/g, '-$1') ?? '').toLowerCase();
      result += `${lowerCaseKey}:${style[key]};`;
    }

    return result;
  } else if (style && typeof style === 'string') {
    return style;
  }

  return '';
}

/**
 * Merge style
 * @param {Object|string} target the target style will be merged
 * @param {Object|string} style the other style will be merged
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
  const returnValue = component;

  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      returnValue[key] = properties[key];
    }
  }

  return returnValue;
}
