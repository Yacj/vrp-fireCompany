import {post} from "@/api";

export const homeService = {
    addApply(param) {
        return post('addApply', param)
    }
}