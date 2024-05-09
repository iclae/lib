/**
 * 根据某个字段对数组去重
 * @param {Array} arr 
 * @param {String} key 
 * @returns 
 */
export function uniqueBy(arr, key) {
  const map = new Map();
  return Array.from(arr.reduce((acc, curr) => {
    if (!map.has(curr[key])) {
      map.set(curr[key], curr);
      acc.add(curr);
    }
    return acc;
  }, new Set()));
}