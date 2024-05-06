/**
 * 防抖函数，确保在最后一次调用之后经过指定的延迟后才调用。
 *
 * @param {Function} func - 要防抖的函数。
 * @param {number} delay - 延迟的毫秒数。
 * @returns {Function} - 防抖后的函数。
 */
export function debounce(func, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}