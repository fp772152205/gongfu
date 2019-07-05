import axios from 'axios';
import { Message } from 'element-ui';

let token = '';
axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //配置请求头

// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function(config) {
        token = localStorage.getItem('token'); //  获取用户Token
        if (token) {
            config.headers.accessToken = token; //将token放到请求头发送给服务器
        }
        return config;
    },
    function(error) {
        Message({
            message: token,
            type: "error"
        })
        return Promise.reject(error);
    });


// 添加一个响应拦截器
axios.interceptors.response.use(function(response) {
    if (response.data && response.data.code) {
        if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109 || response.data.msg === 'TOKEN失效，请重新登录' || response.data.msg === 'TOKEN不存在') {
            //未登录
            response.data.msg = "登录信息已失效，请重新登录";
            Message({
                message: response.data.msg,
                type: "error"
            })
            Router.push('/login');
        }
        if (parseInt(response.data.code) === -1) {
            Message({
                message: "请求失败",
                type: "error"
            })
        }
    }

    return response;
}, function(error) {
    Message({
        message: error,
        type: "error"
    })
    return Promise.reject(error);
});



//基地址
let base = '';

//通用方法
export const POST = (url, params) => {
    return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
    return axios.get(`${base}${url}`, { params: params }).then(res => res.data)
}

//向指定资源位置上传其最新的内容， 用于修改某个内容。
export const PUT = (url, params) => {
    return axios.put(`${base}${url}`, params).then(res => res.data)
}


export const DELETE = (url, params) => {
    return axios.delete(`${base}${url}`, { params: params }).then(res => res.data)
}

//是对PUT方法的补充，用来对已知资源进行局部更新，PATCH是幂等的。
export const PATCH = (url, params) => {
    return axios.patch(`${base}${url}`, params).then(res => res.data)
}