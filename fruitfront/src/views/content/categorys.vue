<template>
    <div>
        <!-- 顶部导航栏:派送至：北京石景山 开始 -->
        <div class="top-fendaohang" style="padding: 0.25rem 0">
            <a href="">
                <div class="top-fendaohang-l">
                </div>
            </a>
            <a href="">
                <div class="top-fendaohang-c">
                    <span class="span-icon">派送至：北京石景山</span>
                    <img src="./img/public/下箭头.png" alt="">
                </div>
            </a>
            <a href="">
                <div class="top-fendaohang-r">
                    <img src="./img/public/sousuo.png" alt="" class="img-icon">
                </div>
            </a>
        </div>
        <!-- 顶部导航栏:派送至：北京石景山 结束 -->
        <div class="null" style="height: 0.9rem"></div>
        <main class="main">
            <ul class="list">
                <div class="list-box">
                    <van-list>
                        <div class="van-cell" style="display: none"></div>
                        <van-cell @click="catechange(0)"><li>全部</li></van-cell>
                        <van-cell v-for="item in category" :key="'category'+item.id"
                                  @click="catechange(item.id)" :class="{active:item.id==currentCate}">
                            <li>  {{item.cname}} </li>
                        </van-cell>
                    </van-list>
                </div>

                <!-- <li class="item pitch" v-for="item in categorys" :key="'category'+item.id">
                      {{item.cname}}
                 </li>-->
            </ul>
            <ul class="list-right" ref="container" >
                <div class="list-right-box">
                    <van-sticky :offset-top="50">
                        <div class="content-top">
                            <span class="heise">综合排序</span>
                            <span class="price">按价格
                                <img src="./img/classify/sort1.png" alt="">
                                <img src="./img/classify/sort2.png" class="topy" style="display:none;" alt="">
                                <img src="./img/classify/sort3.png" class="downy" style="display:none;" alt="">
                        </span>
                            <span class="top-sort">分类</span>
                        </div>
                    </van-sticky>

                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check ="false">
                            <van-cell v-for="item in goods" :key="'goods'+item.id">
                                <li class="content-item">
                                    <router-link :to="{name:'detail',query:{id:item.id}}" class="tupian">
                                        <img  v-lazy="imgHostName+item.thumb" :alt="item.gname" :title="item.gname">
                                    </router-link>
                                    <div class="chanpin-information">
                                        <a href="" class="infor-top">{{item.gname}}</a>
                                        <div class="infor-bottom">
                                            <div class="infor-bottom-left">
                                                ￥{{item.sale}}
                                            </div>
                                            <div class="infor-bottom-right">
                                                <span class="jian"></span>
                                                <span class="num">0</span>
                                                <span class="jia"></span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </van-cell>
                        </van-list>
                    </van-pull-refresh>
                </div>
            </ul>
        </main>

        <my-footer :active="2"></my-footer>
    </div>
</template>

<script>
    import MyFooter from '../../components/my-footer/my-footer';
    import axios from 'axios';
    import {SUCCESS,HOSTNAME,IMGHOSTNAME} from "../../config/base";
    import {addCart} from "../../api/cart";

    export default {
        name: "classify",
        components:{
            MyFooter,
        },
        data() {
            return {
                activeKey: 0,
                category: [],
                goods: [],
                imgHost: IMGHOSTNAME,
                currentid: 0,
                isLoading: false,
                loading: false,
                finished: false,
                currentpage:0,
                limit:6,
                total:0,
            };
        },
        methods:{
            onLoad() {
                this.currentpage++;
                axios.get(HOSTNAME + '/api/goodslist',{
                    params:{
                        cid:this.currentid,
                        page:this.currentpage,
                        limit:this.limit,
                    }
                }).then(res=>{
                    if (res.data.code == SUCCESS) {
                        this.goods.push(...res.data.data);
                        !this.total && (this.total = Math.ceil(res.data.total/res.data.limit));
                        window.console.log(res.data.msg);
                        this.$nextTick(()=>{
                            this.isLoading = false;
                            this.loading = false;
                        });
                    }
                    if(this.currentpage >= this.total){
                        this.finished = true;
                    }else{
                        this.isLoading=false;
                        this.finished=true;
                    }
                })
            },
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.loading = false;
                    this.finished= false;
                    this.goods = [];
                }, 500);
            },
            catechange(id) {
                this.currentid = id;
            },
            getCategory(){
                axios.get(HOSTNAME+'/api/catelist')
                    .then(res=>{
                        let data = res.data;
                        if(data.code == SUCCESS){
                            this.category = data.data;
                            window.console.log(data.msg);
                        }else{
                            window.console.log(data.msg);
                        }
                    })
            },
            addCart(gid,sale){
                addCart('/api/cart',{gid,sale})
                    .then(res=>{
                        window.console.log(res);
                    })
            }
        },
        beforeMount() {
            this.getCategory();
        },
        watch:{
            currentid(){
                this.currentpage = 0;
                this.total = 0;
                this.goods = [];
                this.onLoad();
            }
        }
    }
</script>

<style scoped>
    /* 分类选项卡开始 */
    a {
        text-decoration: none;
        color: #333;
    }
    .main{
        width: 100%;
        height: calc(100vh - 2.12rem);
    }


    ul.list {
        width: 2.4rem;
        height: 100%;
        border-right: 1px solid #F4F4F4;
        box-sizing: border-box;
        float: left;
        overflow-y: scroll;
    }

    li.item {
        position: relative;
        width: 100%;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        color: black;
        font-size: 0.28rem;
        border-top: 1px solid #F4F4F4;
    }

    li.item:nth-child(12) {
        border-bottom: 1px solid #f4f4f4;
    }

    .list-right {
        position: relative;
        float: right;
        width: 5.1rem;
        height: 100%;
        overflow-y: scroll;
    }

    .content-top {
        width: 5.1rem;
        height: 0.8rem;
        border-top: 1px solid #f4f4f4;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.24rem;
        color: black;
        background-color: white;
        border-bottom: 1px solid #f4f4f4;
        z-index: 999;
        border-left: 1px solid #f4f4f4;
    }

    .price img {
        width: 0.3rem;
        height: 0.3rem;
        display: inline-block;
        background-size: 100%;
        vertical-align: middle;
        margin-top: -3px;
        position: fixed;
        top: 1.26rem;
        left: 5.5rem;
    }

    .bianse {
        color: #FF9201;
    }

    .content-item {
        width: 5.1rem;
        height: 1.7rem;
        border-bottom: 1px solid #f4f4f4;
    }

    .content-bottom>.content-item:nth-child(1) {
        margin-top: 0.81rem;
    }

    .tupian {
        width: 1.6rem;
        height: 1.6rem;
        float: left;
    }

    .tupian img {
        width: 1.2rem;
        height: 1.2rem;
        display: inline-block;
        margin-top: 0.2rem;
    }

    .tupian img .img {
        width: 100%;
    }

    .chanpin-information {
        width: 3.5rem;
        height: 1.5rem;
        float: left;
        line-height: 0.4rem;
        text-align: left;
        font-size: 0.27rem;
        overflow: hidden;
        margin-top: 0.1rem;
    }

    .infor-top {
        width: 3.5rem;
        height: 0.8rem;
    }

    .infor-bottom {
        width: 3.5rem;
        height: 0.8rem;
    }

    .infor-bottom-left {
        float: left;
        line-height: 0.8rem;
        color: #FF9201;
        font-size: 0.28rem;
    }

    .infor-bottom-right {
        float: right;
        width: 1.2rem;
        height: 0.8rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: 5px;
    }

    .infor-bottom-right .jian {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        /*background: url(./img/thumb/-.png) no-repeat center center;*/
        background-size: 100%;
    }

    .num {
        font-size: 0.28rem;
        line-height: 0.4rem;
        width: 0.4rem;
        border: none;
        outline: none;
        text-align: center;
    }

    .infor-bottom-right .jia {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        /*background: url(./img/thumb/+.png) no-repeat center center;*/
        background-size: 100%;
    }


    /* 下拉菜单开始 */

    .classify {
        width: 5.1rem;
        height: 1.5rem;
        padding-top: 0.1rem;
        box-sizing: border-box;
        border-bottom: 0.02rem solid #EFEAEE;
        position: fixed;
        top: 1.75rem;
        right: 0;
        background-color: #fff;
        border-left: 1px solid #F4F4F4;
        display: none;
        transition: all 2s;
    }

    .classify span {
        width: 30%;
        text-align: center;
        border: 0.02rem solid #EFEFEF;
        font-size: 0.24rem;
        height: 0.44rem;
        line-height: 0.44rem;
        margin-bottom: 0.2rem;
        border-radius: 0.06rem;
        float: left;
        margin-left: 2%;
    }

    .classify>.all {
        color: #FF9201;
        border-color: #FF9201;
    }

    .pitch:after {
        content: "";
        width: 0.06rem;
        height: 0.6rem;
        background-color: #FF9201;
        position: absolute;
        top: 0.1rem;
        left: 0;
    }


    .van-cell.active::after{
        content: '';
        width: 0.06rem;
        height: 0.6rem;
        position: absolute;
        left: 0.06rem;
        top: 0.1rem;
        background: #42b983;
    }
    .van-sticky--fixed{
        left: 2.4rem;
    }

    /* 下拉菜单结束 */

    /* 分类选项卡结束 */
</style>
<style>
    .van-sticky--fixed{
        left: 2.4rem;
    }
</style>