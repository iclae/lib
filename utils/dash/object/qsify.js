import { getParams } from "./getParams";

/**
 * @typedef {Object} GetParamsOptions
 * @property {Array} numberKeys 将这些 key 对应的值转换为数字
 * @property {Boolean} keepEmptyStr 是否保留空字符串，默认为 false
 */

/**
 * 将对象转换成 get 请求的 query string
 *
 * @param {Object} obj 注意，obj 中的值不能为对象
 * @param {GetParamsOptions} options
 * @returns {string}
 */
export function qsify(obj, options = {}) {
  return new URLSearchParams(getParams(obj, options)).toString();
}