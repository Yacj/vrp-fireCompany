import{get,post} from "@/api";

export const UserService = {
    register(param){
        return post('logon',param)
    },
    logon(param){
        return post('login',param)
    },
    sms(param){
        return get('sms',param)
    }
}