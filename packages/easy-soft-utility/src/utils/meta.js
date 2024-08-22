/**
 * Calculate the value of the expression
 * @param {Function} functionExpression
 */
export function evil(functionExpression) {
  // 一个变量指向Function, 防止有些前端编译工具报错
  const Function_ = Function;

  return new Function_(`return ${functionExpression}`)();
}

export function isBrowser() {
  return (
    typeof window !== 'undefined' &&
    window.document !== undefined &&
    window.document.createElement !== undefined
  );
}

/**
 * check current is dark mode
 */
export function checkDarkMode() {
  return (
    window &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

/**
 * Get browser version
 */
export function getBrowserVersion() {
  const u = navigator.userAgent;

  return {
    // 移动终端浏览器版本信息
    trident: u.includes('Trident'), // IE内核
    presto: u.includes('Presto'), // opera内核
    webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
    gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
    mobile: !!/AppleWebKit.*Mobile.*/.test(u), // 是否为移动终端
    ios: !!/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(u), // ios终端
    android: u.includes('Android') || u.includes('Linux'), // android 终端或uc浏览器
    iPhone: u.includes('iPhone'), // 是否为 iPhone 或者 QQHD 浏览器
    iPad: u.includes('iPad'), // 是否iPad
    webApp: !u.includes('Safari'), // 是否web应该程序, 没有头部与底部
  };
}

/**
 * Get browser info
 */
export function getBrowserInfo() {
  return {
    versions: getBrowserVersion(),
    language: (
      (navigator.browserLanguage || navigator.language) ??
      ''
    ).toLowerCase(),
  };
}

/**
 * stringify Json ignore circular
 */
export function stringifyJson(jsonData) {
  let cache = [];

  const result = JSON.stringify(jsonData, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.includes(value)) {
        return;
      }

      cache.push(value);
    }

    return value;
  });

  cache = null;

  return result;
}

/**
 * Get random seed
 */
export function seededRandom({ seed, min, max }) {
  const maxValue = max || 1;
  const minValue = min || 0;
  const seedValue = (seed * 9301 + 49_297) % 233_280;
  const rnd = seedValue / 233_280;

  return minValue + rnd * (maxValue - minValue);
}

export function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(stringifyJson(value));
}

/**
 * Refit common data
 */
export function refitCommonData(listData, empty, otherListData) {
  let result = [];

  if (listData !== undefined && listData !== null) {
    result = [...listData];
  }

  if (otherListData !== undefined && otherListData !== null) {
    result = [...result, ...otherListData];
  }

  if (empty !== undefined && empty !== null) {
    result = [empty, ...result];
  }

  return result;
}

/**
 * Refit field decorator option
 */
export function refitFieldDecoratorOption(
  v,
  justice,
  defaultValue,
  originalOption,
  convertCallback,
) {
  const result = originalOption;
  const justiceV = justice !== undefined && justice !== null;
  const defaultV = defaultValue === undefined ? null : defaultValue;

  if (justiceV) {
    result.initialValue =
      typeof convertValue === 'function'
        ? convertCallback(v) || defaultV
        : v || defaultV;
  }

  return result;
}

/**
 * Search from list
 */
export function searchFromList(itemKey, itemValue, sourceData) {
  const d = sourceData || [];
  let result = null;

  if (itemValue == null) {
    return result;
  }

  for (const o of d) {
    if (o[itemKey] === itemValue) {
      result = o;
    }
  }

  return result;
}

function generateGuid(a) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replaceAll(/[018]/g, generateGuid);
}

/**
 * get GUID string, eg like "a975c91c-2118-44bb-998b-992ece11f666"
 */
export function getGuid() {
  return generateGuid() + '';
}

/**
 * Check if more data is available for paging scenarios
 */
export function checkHasMore({ pageNo, pageSize, total }) {
  if ((total || 0) <= 0) {
    return false;
  }

  return (pageNo || 0) * (pageSize || 0) < (total || 0);
}

/**
 * Check current runtime environment whether development environment
 */
export function checkWhetherDevelopmentEnvironment() {
  return process.env.NODE_ENV === 'development';
}

export function getValue(object) {
  return Object.keys(object)
    .map((key) => object[key])
    .join(',');
}
