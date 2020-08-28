import {get} from "@/api";

export const goodsService ={
    goods(param){
        return get('goods',param)
    },
    category(param){
        return get('category',param)
    },
    details(param){
        return get('details',param)
    }
}