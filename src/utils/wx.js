// export  const wxLogin = (appId,url) => {
//     let redirect_uri = encodeURIComponent(url)
//     window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`
// }
import {isWx} from "@/utils/validation";
import {cookie} from "@/utils/utils";
import axios from 'axios'
if (isWx) {
    let wx_body = cookie.getCookie('wx_body')
    const Split = wx_body.split("&")

    const openid = Split[0]
    const access_token = Split[1]

    axios.get('https://api.weixin.qq.com/cgi-bin/user/info',{
        params:{
            access_token,
            openid
        }
    }).then(res=>{
        console.log(res)
    })
}
