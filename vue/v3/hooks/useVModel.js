import { computed } from "vue"

/**
 * useVModel hook (不能代理数组)
 * @param {Object} props
 * @param {String} propName
 * @param {Function} emit
 */
export default (props, propName, emit) => {
  return computed({
    set(val) {
      emit(`update:${propName}`, val)
    },
    get() {
      // modelValue 是基本类型，直接返回
      if (typeof props[propName] !== 'object' || props[propName] === null) {
        return props[propName]
      }
      // modelValue 是一个对象，需要使用 Proxy 进行代理
      const proxy = new Proxy(props[propName], {
        get(target, key) {
          return Reflect.get(target, key)
        },
        set(target, key, value) {
          emit(`update:${propName}`, {
            ...target,
            [key]: value,
          })
          return true
        },
      })
      return proxy
    },
  })
}