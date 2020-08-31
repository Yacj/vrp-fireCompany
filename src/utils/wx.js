// export  const wxLogin = (appId,url) => {
//     let redirect_uri = encodeURIComponent(url)
//     window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`
// }
import {isWx} from "@/utils/validation";
import {cookie, storage} from "@/utils/utils";

if (isWx) {
    let wx_body = cookie.getCookie('wx_body')
    // let wx_body = 'oCFpqwmnc4aJppns2qduNxwltI2s&hexo&1&http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep20npJuzTPickTBOoaYeEzzKgKRLAtfHsInz4MS9wzkcNjgjf1LhPjwV6PLeTEAiaMNriamicFWUhF8Q/132'
    const Split = wx_body.split("&")

    const wxInfo = {
        openid:Split[0],
        name:Split[1],
        avatar:Split[3],
    }
    storage.set('wxInfo',wxInfo)
}
