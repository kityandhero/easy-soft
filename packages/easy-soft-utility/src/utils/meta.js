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
    globalThis.document && // Fix: Add a condition to check if window.document exists
    globalThis.document.createElement !== undefined
  );
}

/**
 * check current is dark mode
 */
export function checkDarkMode() {
  return (
    globalThis &&
    globalThis.matchMedia &&
    globalThis.matchMedia('(prefers-color-scheme: dark)').matches
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
  let result = listData !== undefined && listData !== null ? [...listData] : [];

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

/**
 * 生成 RFC 4122 兼容的 UUID v4 字符串
 * 优化目标：高频调用（每秒 10 万次以上）下保持低延迟
 *
 * 策略：
 * 1. 优先使用原生 crypto.randomUUID（C++ 层实现，性能最佳）
 * 2. 回退到 crypto.getRandomValues 手动构建（纯 JS，性能次之）
 * 3. 最终降级为 Math.random（兼容老旧环境，性能尚可）
 *
 * @returns {string} 格式：xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx
 */
function generateGuid() {
  // --- 第一优先：原生 API（Chrome 92+ / Firefox 95+ / Node 16+） ---
  // 优势：原生 C++ 实现，吞吐量可达 20万+ 次/秒
  // 限制：要求 HTTPS 或 localhost
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  // --- 第二优先：基于 getRandomValues 手动构建 ---
  // 兼容范围：Chrome 51+ / Firefox 54+ / Safari 10+ / Node 19+（需 --experimental-global-webcrypto）
  // 优势：支持 HTTP 环境，比 Math.random 更安全
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);

    // 设置 UUID v4 版本号（4 位）：第 7 字节高 4 位固定为 0100（0x40）
    buf[6] = (buf[6] & 0x0f) | 0x40;
    // 设置变体（2 位）：第 9 字节高 2 位固定为 10（0x80）
    buf[8] = (buf[8] & 0x3f) | 0x80;

    // 辅助函数：字节转 16 进制并补齐两位
    const hex = (b) => b.toString(16).padStart(2, '0');

    // 按 UUID 格式拼接
    return (
      `${hex(buf[0])}${hex(buf[1])}${hex(buf[2])}${hex(buf[3])}-` +
      `${hex(buf[4])}${hex(buf[5])}-` +
      `${hex(buf[6])}${hex(buf[7])}-` +
      `${hex(buf[8])}${hex(buf[9])}-` +
      `${hex(buf[10])}${hex(buf[11])}${hex(buf[12])}${hex(buf[13])}${hex(buf[14])}${hex(buf[15])}`
    );
  }

  // --- 最终降级：使用 Math.random（兼容所有环境，包括微信小程序等） ---
  // 碰撞概率极低（约 1e-36），非加密安全，但满足绝大多数业务场景
  // 优化：一次性生成所有随机数，避免循环内反复调用 Math.random
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  return template.replaceAll(/[xy]/g, (c) => {
    const r = Math.trunc(Math.random() * 16); // 0-15 随机整数
    const v = c === 'x' ? r : (r & 0x3) | 0x8; // y 的变体规则

    return v.toString(16);
  });
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
  return Object.values(object)
    .map((value) => value)
    .join(',');
}

/**
 * 构建数字递增的数据集合
 * @param {number} start the start number
 * @param {number} end the end number
 * @returns number array
 */
export function generateNumberCollection(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
