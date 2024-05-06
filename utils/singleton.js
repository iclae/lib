// 创建单例
export function singleton(className) {
  let instance = null
  const proxy = new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args)
      }
      return instance
    }
  })
  className.prototype.constructor = proxy
  return proxy
}