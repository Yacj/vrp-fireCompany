import {Dialog} from "vant";
import Vue from 'vue'

Vue.prototype.$vAlert = function (title, message, successCallback) {
    return new Promise(resolve => {
        Dialog.alert({
            title,
            message,
        }).then((res) => {
            resolve(res)
        })
    })
}

Vue.prototype.$vConfirm = function (title, message, cancelButtonText = '返回', confirmButtonText = '确认', sucBack, errorBack) {
    return new Promise((resolve, reject) => {
        Dialog.confirm({
            title,
            message,
            confirmButtonColor: '#4161FF',
            confirmButtonText,
            cancelButtonText
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
