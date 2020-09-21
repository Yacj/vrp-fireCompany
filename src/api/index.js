import axios from 'axios'
import qs from 'qs'
import {BaseUrl, storage} from "@/utils/utils";
// 请求响应时间
axios.defaults.timeout = 50000;
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;multipart/form-data'
// 请求代理
axios.defaults.baseURL = BaseUrl + 'api'
// axios.defaults.baseURL = '/api';

//  axios.interceptors.request.use(config => {
//     config.headers.Authorization = getStorage("token")
//     return config
// })

// /**
//  * 封装get方法
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        const token = storage.get('token')

        axios.get(url, {
            params: params,
            headers: {
                'Authorization': token
            },
            /* 请求头加上特定数据如token等 如不需要可以删除 */
        })
            .then(response => {
                resolve(response.data);
                // console.log(response.data.errcode)
                // console.log(JSON.stringify(response))
            })
            .catch(err => {
                reject(err)
            })
    })
}


// /**
//  * 封装post请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        const token = storage.get('token')
        axios.post(url, JSON.stringify(params), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
export function Upload(url, params = {}) {
    return new Promise((resolve, reject) => {
        const token = storage.get('token')
        axios.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        })
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}