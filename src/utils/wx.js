import {isWx} from "@/utils/validation";
import {cookie, storage} from "@/utils/utils";

if (isWx) {
    let wx_body = cookie.getCookie('wx_body')
    const Split = wx_body.split("&")
    const wxInfo = {
        openid:Split[0],
        name:Split[1],
        avatar:Split[3],
    }
    storage.set('wxInfo',wxInfo)
}
