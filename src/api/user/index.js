import {get, post, Upload} from "@/api";

export const UserService = {
    register(param) {
        return post('logon', param)
    },
    logon(param) {
        return post('login', param)
    },
    sms(param) {
        return get('sms', param)
    },
    //獲取用戶信息
    getUser(param) {
        return get('getUser', param)
    },
    //上傳頭像
    singleUploadFile(param) {
        return Upload('singleUploadFile', param)
    },
    //保存用户信息
    saveUser(param){
        return post('saveUser',param)
    }
}