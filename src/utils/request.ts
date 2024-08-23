import axios from 'axios';

//创建axios实例
const service = axios.create({
    baseURL: '/api',
    timeout: 60000
});

//请求拦截器
service.interceptors.request.use((config) => {
    //config配置对象，headers属性请求头，经常给服务器端携带公共参数
    return config;
});
//响应拦截器
service.interceptors.response.use(
    (response) => {
        //response响应对象，data属性是服务器端返回的数据
        return response.data;
    },
    (error) => {
        //失败的回调函数：处理http状态码不是200的情况
        //error对象中包含的信息：config请求配置对象，response响应对象，request请求对象
        //定义一个变量用于存储错误信息
        let message = '';
        //http状态码：400 401 403 404 500 501 502 503 504
        const status = error.response.status;
        switch (status) {
            case 400:
                message = '请求参数错误';
                break;
            case 401:
                message = '身份信息无效';
                break;
            case 403:
                message = '没有操作权限';
                break;
            case 404:
                message = '请求资源不存在';
                break;
            case 500:
                message = '服务器内部错误';
                break;
            case 503:
                message = '服务器正在维护';
                break;
            case 504:
                message = '服务器超时';
                break;
            default:
                message = '未知错误';
                break;
        }
        //利用element-ui Message做消息提示
        ElMessage.error(message);
        //创建一个失败的promise对象
        return Promise.reject(error);
    }
);

//对外暴露一个service对象
export default service;
