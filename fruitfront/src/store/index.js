import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import {getCart} from "../api/cart";
import {SUCCESS} from "../config/base";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        isShow: false,
        cart: null,
    },
    getters: {
        goodsNumber:function (state) {
            return function (gid) {
                let num = 0;
                    if (!state.cart) {
                        return num;
                    }
                    let goods = state.cart.goods.filter(ele => ele.gid == gid)[0];
                    if (goods) {
                        num = goods.num;
                    }
                    return num;
            }
        },
        goodsTotal(state){
            if(!state.cart){
                return;
            }
            return state.cart.total;
        },
        cartPrice(state){
            if(!state.cart){
                return;
            }
            return state.cart.price;
        },
        fullSelect(state){
            return state.cart && state.cart.goods.every(ele=>ele.status);
        },
        existGoods(state){
            let flag = state.cart.goods.some(ele=>ele.status);
            return flag;
        }
    },
    mutations: {
        changeToken(state, token) {
            state.token = token;
        },
        toggleIsShow(state, bool) {
            state.isShow = bool;
        },
        setCart(state, cart) {
            state.cart = cart;
        },
        //累加
        incGoods(state,payload){
            let {gid,cid,uid,sale,thumb,gname} = payload;
            if(!state.cart){
                //初始化
                state.cart ={id:cid,total:1,price:sale,uid,goods:[]};
            }
            let goods = state.cart.goods.filter(ele=>ele.gid == gid)[0];
            if(goods){
                goods.num++;
            }else{
                //push
                state.cart.goods.push({gid,num:1,status:1,sale,thumb,gname});
            }
        },
        calcTotal(state){
            let total = 0;
            let goods = state.cart.goods.filter(ele=>ele.status);
            if(goods.length > 0){
                total = goods.map(ele=>ele.num).reduce((x,y)=>x + y);
            }
            state.cart.total = total;
        },
        calcPrice(state){
            let price = 0;
            let goods = state.cart.goods.filter(ele=>ele.status);
            if(goods.length > 0){
                price = goods.reduce(function(prev,current){
                    return prev + current.sale * current.num;
                },0)
            }
            state.cart.price = price;
        },
        //减商品
        decGoods(state,gid){
            let goods = state.cart.goods.filter(ele=>ele.gid == gid)[0];
            if(goods.num >1){
                goods.num--;
            }else {
                state.cart.goods.pop();
            }
        },
        toggleStatus(state,payload){
            let gid = payload.gid;
            let goods = state.cart.goods.filter(ele=>ele.gid == gid)[0];
            goods.status = goods.status? 0:1;
            // goods.status = (!goods.status)*1;
        },
    },
    plugins: [createPersistedState()],
    actions: {
        setCart(conmmit) {
            getCart('/api/cart/1').then(res => {
                if (res.code == SUCCESS){
                    let data = res.data?res.data:null;
                    conmmit.commit('setCart', data)
                }
            })
        }
    },

})

export {store};