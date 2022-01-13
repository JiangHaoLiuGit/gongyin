import Cookie from 'js-cookie';//js-cookie是一个简单的，轻量级的处理cookies的js API

const Tokens = 'tokens';

export function getToken(){
    return Cookie.get(Tokens);
}

export function setToken(token){
    return Cookie.set(Tokens,token)
}

export function removeToken(){
    return Cookie.remove(Tokens)
}