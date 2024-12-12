import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 30000 // 后台接口超时时间
});

// request 拦截器
// 可以自定义拦截请求时对请求做一些处理
request.interceptors.request.use((config) => {
      config.headers["Content-Type"] = "application/json;charset=utf-8";
      return config;
    },(error) => {
      return Promise.reject(error);
    });

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    (response) => {
      let res = response.data;
      // 将服务器返回的字符串类型数据转换成对象
      if (typeof res === "string") {
        res = res ? JSON.parse(res):res
      }
      return res;
    },
    (error) => {
      if (error.response.status === 404) {
        ElMessage.error("未找到请求接口！");
      } else if (error.response.status === 500) {
        ElMessage.error("系统错误，请稍后重试或联系管理员！");
      } else {
        console.error(error.message);
      }
      return Promise.reject(error);
    }
  )
  
  export default request;
  
