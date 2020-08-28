export  const wxLogin = (appId,url) => {
    let redirect_uri = encodeURIComponent(url)
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`
}