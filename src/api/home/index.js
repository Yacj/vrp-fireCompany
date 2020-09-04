import {get, post} from "@/api";

export const homeService = {
    addApply(param) {
        return post('addApply', param)
    },
    getCar(param) {
        return get('getCar', param)
    },
    getCarUser(param) {
        return get('getCarUser', param)
    },
    getUserApply(param) {
        return get('getUserApply', param)
    },
    GetOrderCheck(param){
        return post('GetOrderCheck',param)
    },
    GetOrderCheckList(param){
        return post('GetOrderCheckList',param)
    },
    GetDirectorLeader(param){
        return get('GetDirectorLeader',param)
    },
    //分管审核
    ChargeLeaderCheck(param){
        return post('ChargeLeaderCheck',param)
    },
    //主管审核
    DirectorLeaderCheck(param){
        return post('DirectorLeaderCheck',param)
    },
    //车辆审核
    CarLeaderCheck(param){
        return post('CarLeaderCheck',param)
    },
//    车辆归还
    returnUserApply(param){
        return post('returnUserApply',param)
    }
}