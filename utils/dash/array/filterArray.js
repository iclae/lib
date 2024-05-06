/**
 * 取两个数组的某一个 key 来比较，返回 targetArray 中不包含在 uniqueArray 中的项。
 *
 * @param {Array} targetArray - 要过滤的数组。
 * @param {Array} uniqueArray - 包含唯一项的数组。
 * @param {string} key - 用于比较唯一性的key。
 * @returns {Array} - 过滤后的数组。
 */
export function filterArray(targetArray, uniqueArray, key) {
  const uniqueKeys = uniqueArray.map(item => item[key]);
  return targetArray.filter(item => !uniqueKeys.includes(item[key]));
}