/**
 * 从对象中排除指定属性
 * @param {object} obj - 要排除的对象
 * @param  {...string} props - 要排除的属性
 * @returns {object} - 排除后的对象
 * @eg: omit({ a: 1, b: 2, c: 3 }, 'a', 'c') => { b: 2 }
 */
export function omit(obj, ...props) {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !props.includes(key)));
}