import assignLodash from 'lodash/assign';
import assignWithLodash from 'lodash/assignWith';
import differenceLodash from 'lodash/difference';
import dropRightLodash from 'lodash/dropRight';
import endsWithLodash from 'lodash/endsWith';
import filterLodash from 'lodash/filter';
import findLodash from 'lodash/find';
import findIndexLodash from 'lodash/findIndex';
import firstLodash from 'lodash/first';
import floorLodash from 'lodash/floor';
import forEachLodash from 'lodash/forEach';
import getLodash from 'lodash/get';
import gteLodash from 'lodash/gte';
import mapLodash from 'lodash/map';
import memoizeLodash from 'lodash/memoize';
import removeLodash from 'lodash/remove';
import replaceLodash from 'lodash/replace';
import reverseLodash from 'lodash/reverse';
import roundLodash from 'lodash/round';
import setLodash from 'lodash/set';
import sizeLodash from 'lodash/size';
import sortByLodash from 'lodash/sortBy';
import sortedUniqLodash from 'lodash/sortedUniq';
import splitLodash from 'lodash/split';
import startsWithLodash from 'lodash/startsWith';
import trimLodash from 'lodash/trim';
import uniqByLodash from 'lodash/uniqBy';

export function get(target, path, defaultValue = null) {
  return getLodash(target, path, defaultValue);
}

export function round(target, decimalPlace) {
  return roundLodash(target, decimalPlace);
}

/**
 * 检查字符串string是否以给定的target字符串结尾
 */
export function endsWith(source, target, position) {
  return endsWithLodash(source, target, position);
}

/**
 * Remove duplicate data and sort (ascending order).
 */
export function sortedUnique(array) {
  return sortedUniqLodash(array);
}

export function split(source, separator, limit = 1000) {
  return splitLodash(source, separator, limit);
}

export function assign(target, source) {
  return assignLodash(target, source);
}

export function assignWith(target, sources, customizer) {
  return assignWithLodash(target, sources, customizer);
}

export function reverse(array) {
  return reverseLodash(array);
}

export function forEach(collection, iteratee) {
  return forEachLodash(collection, iteratee);
}

export function gte(value, other) {
  return gteLodash(value, other);
}

export function memoize(fn) {
  return memoizeLodash(fn);
}

export function floor(v, len) {
  return floorLodash(v, len);
}

export function first(array) {
  return firstLodash(array);
}

export function startsWith(source, target) {
  return startsWithLodash(source, target);
}

export function dropRight(array, n = 1) {
  return dropRightLodash(array, n);
}

export function uniqBy(array, iterate) {
  return uniqByLodash(array, iterate);
}

/**
 * Trim value.
 * @param {*} target the value will be trimmed
 * @returns result
 */
export function trim(target) {
  return trimLodash(target);
}

/**
 * Replace value.
 * @param {*} target the target value will be replaced
 * @param {*} pattern pattern mode
 * @param {*} value replace value
 * @returns result
 */
export function replace(target, pattern, value) {
  return replaceLodash(target, pattern, value);
}

/**
 * 移除数组中predicate（断言）返回为真值的所有元素, 并返回移除元素组成的数组. predicate（断言） 会传入3个参数:  (value, index, array).
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */
export function removeFromArray(array, predicate) {
  return removeLodash(array, predicate);
}

export function map(collection, iteratee) {
  return mapLodash(collection, iteratee);
}

export function set(object, path, value) {
  return setLodash(object, path, value);
}

export function size(collection) {
  return sizeLodash(collection);
}

export function difference(array, values) {
  return differenceLodash(array, values);
}

/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象, 例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */
export function filter(collection, predicateFunction) {
  return filterLodash(collection, predicateFunction);
}

/**
 * 创建一个元素数组.  以 iteratee 处理的结果升序排序.  这个方法执行稳定排序, 也就是说相同元素会保持原始排序.  iteratees 调用1个参数:  (value).
 * @param {collection}  (Array|Object), 用来迭代的集合.
 * @param {predicateFunction} 这个函数决定排序
 */
export function sortBy(collection, predicateFunction) {
  return sortByLodash(collection, predicateFunction);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index）, 而不是元素本身.
 * @param {array} (Array): 要搜索的数组.
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array, predicateFunction, fromIndex = 0) {
  return findIndexLodash(array, predicateFunction, fromIndex);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index）, 而不是元素本身,返回匹配元素, 否则返回 undefined. .
 * @param {array} (Array): 要搜索的数组.
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function find(array, predicateFunction, fromIndex = 0) {
  return findLodash(array, predicateFunction, fromIndex);
}
