/**
 * 将字符串中的变量替换为对象中的值
 * @param {string} str - 包含变量的字符串 用{}包裹变量名
 * @param {object} obj - 用于替换的对象
 * @returns {string}
 * @example format('hello, {name}', { name: 'world' }) => 'hello, world'
 */
export function format(str, obj) {
  return str.replace(/{([^}]+)}/g, (_, key) => obj[key]);
}