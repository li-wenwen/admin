/**
 * 封装fetch
 params：
        medthod：String 必填
                请求方式 GET POST PUT DELETE
        url:地址 String 必填
        data:数据 对象
 * */

import {SUCCESS,HOSTNAME} from "./base";

function api(method,url,data) {
    method = method.toUpperCase().trim();
    let token = sessionStorage.getItem('token');
    let option={};
    let headers = {
        token
    }
    if(method === 'GET' && data && Object.keys(data).length){
        let str = '?';
        for(let i in data){
            str += `${i}=${data[i]}&`;
        }
        str = str.slice(0,-1);
        url += str;
    }
    url = HOSTNAME+"/"+url;
    if(method === 'POST' || method === 'PUT'){
        headers={
            token,
            "Content-type":"application/json",
        }
        option.body = JSON.stringify(data);
    }
    option .headers = headers;
    option.method = method;
    let promise=new Promise((resolve, reject) =>{
        fetch(url,option).then(res=>res.json())
            .then(data=>{
                let {code}=data;
                if(code==SUCCESS){
                    resolve(data);
                }else{
                    reject(data);
                }
            });
    });
    return promise;
}

export {api};