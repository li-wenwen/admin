//Hostname loading token 响应
import {HOSTNAME} from "../config/base";
import axios from 'axios';
import {store} from "../store";

let instance = axios.create({
    baseURL: HOSTNAME,
    timeout:5000,
});
//请求拦截
instance.interceptors.request.use(function (config) {
    store.commit('toggleIsShow',true);
    if(store.state.token){
        config.headers={
            token:store.state.token,
            'Content-type':'application/json'
        }
    }
    return config;
}, function (error) {

    store.commit('toggleIsShow',false);
    return Promise.reject(error);
});
//响应拦截
instance.interceptors.response.use(function (response) {

    store.commit('toggleIsShow',false);
    return response.data;
}, function (error) {
    // Do something with response error
    store.commit('toggleIsShow',false);
    return Promise.reject(error);
});
export default instance;