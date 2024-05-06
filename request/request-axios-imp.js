import axios from "axios";

const instance = axios.create({
  baseURL: '/api',
  timeout: 2 * 60 * 1000,
  // withCredentials: true,
});

function request(config) {
  instance.request(config);
}

export const requestor = {
  useResponseInterceptors: (successHandlers = [], errorHandlers = []) => {
    instance.interceptors.response.use(response => {
      let res = response;
      successHandlers.forEach(handler => {
        res = handler(res);
      });
      return res;
    }, error => {
      errorHandlers.forEach(handler => handler(error, request));
      return Promise.reject(error);
    });
  },

  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
}