let req;

/**
 * 注入请求器
 * @param {Object} requestor 
 * @param {Object} options
 * @param {array} options.responseSuccessInterceptors 响应拦截器-成功
 * @param {array} options.responseErrorInterceptors 响应拦截器-失败
 */
export function inject(requestor, options = {}) {
  req = requestor;

  const _options = {
    responseSuccessInterceptors: [],
    responseErrorInterceptors: [],
    ...options
  }
  req.useResponseInterceptors(_options.responseSuccessInterceptors, _options.responseErrorInterceptors)
}

export function useRequestor() {
  return req
}

export function GET(url, params) {
  const req = useRequestor();
  return req.get(url, { params })
}

export function POST(url, data) {
  const req = useRequestor();
  return req.post(url, data)
}

export function PUT(url, data) {
  const req = useRequestor();
  return req.put(url, data)
}

export function DELETE(url, params) {
  const req = useRequestor();
  return req.delete(url, { params })
}
