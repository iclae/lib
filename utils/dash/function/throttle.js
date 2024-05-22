/**
 * 节流函数，确保在指定的时间间隔内只调用一次。
 * @param {Function} func - 要节流的函数。
 * @param {Number} delay - 节流的时间间隔。
 * @returns {Function} - 节流后的函数。
 */
export function throttle(func, delay) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime > delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}