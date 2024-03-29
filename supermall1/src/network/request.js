import axios from "axios";

export function request(config){
    // 1.创建axios实例
  //create 本身是一个Promise,不需要再包装一个Promise
    const  instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66',
      timeout: 5000
    })
    //2.axios拦截器
  //请求拦截
      instance.interceptors.request.use(config => {
        return config
      },error => {
        // console.log(error);
      })
  //响应拦截
      instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
      },error => {
        console.log(error);
      })
    // 3.发送真正的网路请求
    return instance(config)
}

