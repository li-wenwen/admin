<template>
    <div>
        <!--    标题栏制作开始-->
        <div class="top-fendaohang">
            <a href=javascript:;>
                <div class="top-fendaohang-l">

                </div>
            </a>
            <a href="">
                <div class="top-fendaohang-c">
                    <span class="span-icon span-icon-black">购物车</span>
                </div>
            </a>
            <a href="">
                <div class="top-fendaohang-r">
                    <span class="span-icon span-icon-black">编辑</span>
                </div>
            </a>
        </div>
        <div class="null" style="height: 0.9rem"></div>
        <!--    收货时间制作开始-->
        <div class="time_box" v-if="cart">
            <div class="time">
                <div class="time_left">
                    <p>收货时间</p>
                </div>
                <div class="time_right">
                    <div class="time_right_txt">
                        <p>今天30分钟可送达（可预订）</p>
                    </div>
                    <div class="time_right_icon">
                        <i class="iconfont iconzuoyoujiantou1"></i>
                    </div>
                </div>
            </div>
        </div>

        <!--商品列表开始-->
        <div class="goodCar_list" v-if="cart">
            <div class="good-card_box" v-for="goods in cart.goods" :key="goods.gid">
                <div class="good-card">
                    <div class="good-card_circle_box">
                        <div class="good-card_circle" @click="setStatus(goods)">
                            <img :style="{display:goods.status?'block':'none'}" src="./img/Car/check4.png" alt="">
                        </div>
                    </div>
                    <div class="good-card_img_box">
                        <router-link :to="{name:'detail',query:{id:goods.gid}}" class="good-card_img">
                            <img :src="imgHostName + goods.thumb" alt="">
                        </router-link>
                    </div>
                    <div class="good-card_txt_box">
                        <router-link :to="{name:'detail',query:{id:goods.gid}}" class="good-card_title">
                            <p class="gname">{{goods.gname}}</p>
                        </router-link>
                        <div class="good-card_price">
                            <span>￥</span>
                            <p>{{goods.sale}}</p>
                        </div>
                        <div class="good-card_num">
                            <div class="good-card_num_del" @click="decGoods(goods)">
                                <img src="./img/Car/subtract.png" alt="">
                            </div>
                            <div class="good-card_num_txt">{{goods.num}}</div>
                            <div class="good-card_num_add" @click="addGoods(goods)">
                                <img src="./img/Car/add.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div style="height: 2.74rem"></div>
        <!--    价格总计制作开始-->
        <div class="sum_box" v-if="cart">
            <div class="sum">
                <div class="sum_txt">
                    <p>本店总计:</p>
                </div>
                <div class="sum_price">
                    <p>{{cart.total}}</p>
                    <span>件</span>
                </div>
            </div>
        </div>
        <!--    结算 制作开始-->
        <div class="shopTotal_box" v-if="cart">
            <div class="shopTotal">
                <div class="shopTotal_left">
                    <div class="shopTotal_circle">
                        <img src="./img/Car/check4.png" :class="{active:fullSelect}" alt="">
                    </div>
                    <div class="shopTotal_txt">
                        <div>全选</div>
                        <div>合计:<span>￥</span></div>
                        <div>{{cart.price}}</div>
                    </div>
                </div>
                <div class="shopTotal_right">
                    <div class="shopTotal_btn" :class="{on:existGoods}" @click="settlement">
                        去结算
                    </div>
                </div>
            </div>
        </div>
        <div class="shopTotal_box del" style="display: none" v-if="cart">
            <div class="shopTotal">
                <div class="shopTotal_left">
                    <div class="shopTotal_circle">
                        <img src="img/Car/check4.png" alt="">
                    </div>
                    <div class="shopTotal_txt">
                        <div>全选</div>
                    </div>
                </div>
                <div class="shopTotal_right">
                    <div class="shopTotal_btn">
                        删除
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!cart"> 购物车空空如也</div>
        <my-footer :active="3"></my-footer>
    </div>
</template>
        },

<script>
    import Vue from 'vue'
    import MyFooter from '../../components/my-footer/my-footer';
    import {IMGHOSTNAME,SUCCESS} from "../../config/base";
    import {mapState,mapGetters} from 'vuex'
    import {addCart,setStatus} from "../../api/cart";
    import {Toast} from 'vant';

    Vue.use(Toast);
    export default {
        name: "car",
        components: {
            MyFooter,
        },
        data(){
            return {
                // cart:{id:1, total:5, price:100, goods:[{gid:1,num:2,}, {gid:2,num:2,}, {gid:3,num:2,},],}
                imgHostName:IMGHOSTNAME,
                status:null,
            }
        },
        computed:{
            ...mapState({
                cart:'cart',
            }),
            ...mapGetters({
                fullSelect:"fullSelect",
                existGoods:'existGoods',
            })
        },
        methods:{
            addGoods(item){
                let {gid,sale,gname,thumb} = item;
                addCart('/api/cart',{gid,sale})
                    .then(res=>{
                        if(res.code == SUCCESS){
                            //修改vuex cart
                            let{cid,uid} = res.data;
                            this.$store.commit('incGoods',{uid,cid,gid,sale,gname,thumb});
                            this.$store.commit('calcTotal');
                            this.$store.commit('calcPrice');
                            window.console.log(res.msg);
                        }
                    })
            },
            decGoods(item){
                let {gid,sale} = item;
                addCart('/api/deccart',{gid,sale})
                    .then(res=>{
                        if(res.code == SUCCESS){
                            //修改vuex cart
                            // window.console.log(this.$store.getters);
                            this.$store.commit('decGoods',gid);
                            this.$store.commit('calcTotal');
                            this.$store.commit('calcPrice');
                            window.console.log(res.msg);
                        }
                    })
            },
            setStatus(goods){
                let{gid,sale} = goods;
                setStatus('/api/deccart/1',{gid,sale})
                    .then(res=>{
                        if(res.code == SUCCESS) {
                            this.$store.commit('toggleStatus', {gid});
                            this.$store.commit('calcTotal');
                            this.$store.commit('calcPrice');
                            window.console.log(res.msg);
                        }else{
                            window.console.log(res.msg);
                        }
                    })
            },
            settlement(){
                if(!this.existGoods){
                    Toast('请至少选择一件商品');
                    return;
                }else {
                    this.$router.push({name:'orders'});
                }

            }
        }
    }
</script>

<style scoped>
    @import "../../style/css/Car.css";
    .active{
        display: block;
    }
    .on{
        background-color:#ff9201;
    }
    .gname{
        height: 0.96rem;
        font-size: 0.3rem;
        line-height: 1.5;
        color: #232326;
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;

    }
    .shop-cart-listbox1 {
        width: 100%;
        float: left;
        margin-bottom: 5px;
    }
    .index-goods {
        width: 94%;
        padding: 5px 3%;
        float: left;
        background-color: #FFFFFF;
        border-top: 1px solid #F9F9F9;
    }
    .shop-cart-check2 {
        width: 30px;
        height: 120px;
        float: left;
    }
    .index-goods-img {
        width: 100px;
        height: 100px;
        padding: 10px 0px;
        float: left;
    }
    .index-goods-textbox {
        display: block;
        margin-left: 140px;
        height: 110px;
    }
    .index-goods-img img {
        width: 100px;
        height: 100px;
    }
    .index-goods-text1 {
        width: 100%;
        height: 40px;
        float: left;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 20px;
        color: #333;
        font-size: 15px;
        margin-top: 10px;
    }
    .index-goods-text2 {
        width: 100%;
        color: #FF9201;
        float: left;
        margin-top: 5px;
        font-size: 18px;
    }
    .shop-cart-box3 {
        width: 100%;
        float: left;
        margin-top: 5px;
    }
</style>