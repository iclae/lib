/**
 * 从对象中提取指定属性
 * @param {object} obj - 要提取的对象
 * @param  {...string} props - 要提取的属性
 * @returns {object} - 提取后的对象
 * @eg: pick({ a: 1, b: 2, c: 3 }, 'a', 'c') => { a: 1, c: 3 }
 */
export function pick(obj, ...props) {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => props.includes(key)));
}