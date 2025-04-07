import axios from 'axios';
// import { ElLoading } from 'element-plus'

let loadingInstance = null
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
})
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log("请求发出之前");
  // loadingInstance = ElLoading.service({ fullscreen: true })//开启加载

  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // loadingInstance.close()//关闭loading

  const {authorization} = response.headers;
  authorization && localStorage.setItem('token',authorization);
  // console.log("请求成功", response.headers);
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const {status} = error.response;
  if(status === 401){
    localStorage.removeItem('token');
    window.location.href = '#/login';
  }
  return Promise.reject(error);
});
export default service;