import { inject, GET, POST, PUT, DELETE } from "./request-core";
import { requestor } from './request-axios-imp'
import EventEmitter from "../utils/EventEmitter";

// 业务层

inject(requestor, {
  responseSuccessInterceptors: [handleGeneralError, handleResult],
  responseErrorInterceptors: [handleNetworkError],
});

// 处理网络请求成功后, 约定消息体中 code 非 200 的情况
function handleGeneralError(response) {
  const { data } = response;
  if (data.code !== '200') {
    EventEmitter.emit('error_message', data.message)
  }
  return data;
}

// 处理网络请求成功后的数据
function handleResult(result) {
  if (result.code !== '200') {
    return [result.message, null];
  }
  return [null, result.data]
}

// 处理网络请求错误
function handleNetworkError(err, request) {
  let errMessage = '未知错误';
  if (err.response.status) {
    switch (err.response.status) {
      case 400:
        errMessage = '错误的请求';
        break;
      case 401:
        errMessage = '登录已过期';
        EventEmitter.emit('auth_error', {
          config: err.config,
          request,
        })
        break;
      case 403:
        errMessage = '拒绝访问';
        break;
      case 404:
        errMessage = '请求错误,未找到该资源';
        break;
      case 405:
        errMessage = '请求方法未允许';
        break;
      case 408:
        errMessage = '请求超时';
        break;
      case 500:
        errMessage = '服务器端出错';
        break;
      case 501:
        errMessage = '网络未实现';
        break;
      case 502:
        errMessage = '网络错误';
        break;
      case 503:
        errMessage = '服务不可用';
        break;
      case 504:
        errMessage = '网络超时';
        break;
      case 505:
        errMessage = 'http版本不支持该请求';
        break;
      default:
        errMessage = `其他连接错误 --${errStatus}`;
    }
  } else {
    errMessage = '无法连接到服务器！';
  }
  EventEmitter.emit('message_error', errMessage)
}

export default {
  GET,
  POST,
  PUT,
  DELETE,
}