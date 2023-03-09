/**
 * 计算数组平均值
 * @param {Array} array
 * @returns
 */
export function averageArray(array) {
  return array.reduce((a, b) => a + b) / array.length;
}
