/**
 * 比较两个数组是否相同。
 *
 * @param {Array} array1 - 第一个数组。
 * @param {Array} array2 - 第二个数组。
 * @returns {boolean} - 如果两个数组相同则返回true，否则返回false。
 */
export function compareArray(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}