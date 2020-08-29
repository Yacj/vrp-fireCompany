export const isPhone = (str) => {
    return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(str)
}

export const isPossWord = (str) =>{
    return /^[0-9A-Za-z]{8,16}$/.test(str)
}

export const isUndef = (str) =>{
    return str === undefined || str === null
}
export const isWx = /micromessenger/i.test(navigator.userAgent.toLowerCase())
