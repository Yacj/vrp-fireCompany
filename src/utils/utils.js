export let cookie = {
    setCookie(name, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = name + "=" + cvalue + "; " + expires;
    },
    getCookie(name) {
        var name = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }

}

/*storage*/
/*
storage.set('list',''list);
storage.get('list')
*/
export let storage = {
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    get(key){
        return JSON.parse(localStorage.getItem(key))
    },
    remove(key){
        localStorage.removeItem(key)
    }
}

export  const getTime = (val) =>{
    let date = new Date(Number(val)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + "-";
    let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    let D = date.getDate() + " ";
    let h = date.getHours() + ":";
    let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() ;
    let s = (date.getSeconds() < 10 ? "0" + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m;
}

