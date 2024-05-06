/**
 * @typedef {Object} GetParamsOptions
 * @property {Array} numberKeys 将这些 key 对应的值转换为数字
 * @property {Boolean} keepEmptyStr 是否保留空字符串，默认为 false
 */

/**
 * 去除 params 中值为 undefined 或 null 或 '' 或 NaN 的参数
 * ps: 顺序是 numberKeys -> keepEmptyStr
 * 注意：如果同时传入了 numberKeys 和 keepEmptyStr，会先转换 numberKeys 对应的值为数字, 如果 numberKeys 对应的值为空字符串，会被转换成 NaN 而去除，想保留数字的空字符串，需要设置 keepEmptyStr 为 true
 * @param {Object} params 
 * @param {GetParamsOptions} options
 * @returns 
 */
export function getParams(params, options = {}) {
  const _options = {
    numberKeys: [],
    keepEmptyStr: false,
    ...options,
  }
  let obj = { ...params };
  Object.keys(obj).forEach(key => {
    // 将 numberKeys 中的 key 对应的值转换为数字
    if (_options.numberKeys.includes(key)) {
      let numberValue = parseFloat(obj[key]);
      if (_options.keepEmptyStr && obj[key] === '') { }
      else {
        obj[key] = numberValue
      }
    }
    if (obj[key] === undefined || obj[key] === null || (typeof obj[key] === 'number' && isNaN(obj[key])) || (obj[key] === '' && !_options.keepEmptyStr)) {
      delete obj[key];
    }
  });
  return obj;
}