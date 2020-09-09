import {get, post} from "@/api";

export const DriverServe = {
    getDriverUserApply(param) {
        return get('getDriverUserApply', param)
    },
    //获取车辆信息
    getDriverUserApplyDetails(param){
        return get('getDriverUserApplyDetails',param)
    },
    //添加汽车维修信息
    addDriverRepair(param){
        return post('addDriverRepair ',param)
    },
    //添加汽车加油信
    addDriverGasoline(param){
        return post('addDriverGasoline ',param)
    }
}