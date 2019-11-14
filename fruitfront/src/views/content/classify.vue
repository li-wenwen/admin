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

        <div class="list-box">

            <div class="list-left">
                <van-sidebar class="classify-left-bottom" v-model="activeKey">
                    <van-sidebar-item title="全部" class="left-bottom-item" @click="catechange(0)"/>
                    <van-sidebar-item class="left-bottom-item" v-for="cate in category" :key="cate.id" @click="catechange(cate.id)" :title="cate.cname"/>
                </van-sidebar>
            </div>

            <div class="list-right">
                <div class="list-right-content">
                    <div class="classify-right-center">
                        <van-sticky :offset-top="50">
                            <div class="right-center-item abc">综合排序</div>
                            <div class="right-center-item paixv" style="position: relative">按价格
                                <div class="sort s1"><img src="./img/classify/sort1.png" alt=""></div>
                                <div class="sort s2" style='display:none'><img src="./img/classify/sort2.png" alt="">
                                </div>
                                <div class="sort s3" style='display:none'><img src="./img/classify/sort3.png" alt="">
                                </div>
                            </div>
                            <div class="right-center-item dianji">分类</div>
                        </van-sticky>
                    </div>

                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                            <van-cell v-for="item in goods" :key="item.gid">
                                <div id="item-listbox">
                                    <div class="center-bottom-item">
                                        <router-link :to="{name:'detail',query:{id:item.gid}}">
                                            <div class="center-item-img"><img v-lazy="imgHost+item.thumb" alt="">
                                            </div>
                                        </router-link>
                                        <router-link :to="{name:'detail',query:{id:item.gid}}" class="center-item-wz" href="#">{{item.gname}}{{item.norms}}</router-link>
                                        <div class="center-item-z">
                                            <div class="center-item-price">￥{{item.sale}}</div>
                                            <div class="center-item-num">
                                                <div class="jian" @click="decGoods(item)" v-show="$store.getters.goodsNumber(item.gid)"><img src="./img/classify/subtract.png" alt=""></div>
                                                <div class="shuliang">{{$store.getters.goodsNumber(item.gid)}}</div>
                                                <div class="jia" @click="addGoods(item)"><img src="./img/classify/add.png" alt=""></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </van-cell>
                        </van-list>
                    </van-pull-refresh>
                </div>
            </div>

        </div>

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
                    }
                    this.$nextTick(()=>{
                        this.isLoading = false;
                        this.loading = false;
                    });
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
                    // this.loading = false;
                    // this.finished= false;
                    // this.goods = [];
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
            addGoods(item){
                let {gid,sale,gname,thumb} = item;
                addCart('/api/cart',{gid,sale})
                    .then(res=>{
                        if(res.code == SUCCESS){
                            //修改vuex cart
                            let{cid,uid} = res.data;
                            // window.console.log(this.$store.getters);
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
                this.finished =false;
                this.onLoad();
            }
        }
    }
</script>

<style>
    .van-sticky--fixed{
        left:2.4rem;
    }
</style>

<style scoped>
    .van-sidebar-item--select {
        border-color: #ff9201;
    }
    .list-box {
        width: 100%;
        height: calc(100% - 1.9rem);
        position: absolute;
        top: 0.9rem;
        left: 0;
        overflow: hidden;
    }
    .list-left {
        width: 30%;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        border-right: 1px solid #F4F4F4;
        background: #FAFAFA;
    }
    .list-right {
        width: 70%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 30%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .list-right-content {
        width: 100%;
        height: calc(100% - 0.8rem);
        position: absolute;
        top: 0.8rem;
        /*left: 30%;*/
        left: 0;
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: auto;
        border-right: 1px solid #F4F4F4;

        text-align: justify;
        text-justify: newspaper;
        word-break: break-all;

    }

    * {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    #container {
        width: 100%;
        height: 10.6rem;
        overflow: hidden;
        position: relative;
        /* top: 1.3rem; */
    }

    #item-listbox {
        width: 100%;
         height: 100%;
    }

    html {
        height: 100%;
        width: 100%
    }

    body {
        width: 100%;
        height: 100%;
    }
    /* 分类左侧 开始 */

    .classify-left {
        width: 30%;
        float: left;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .classify-left-box {
        width: 100%;
        overflow: hidden;
    }

    .classify-left-top {
        width: 100%;
        height: 0.92rem;
        border-bottom: solid 1px #F4F4F4;
    }

    .classify-left-bottom {
        width: 100%;
        overflow: hidden;
        float: left;
        overflow-x: hidden;
        overflow-y: auto;
        border-right: 1px solid #F4F4F4;
        text-align: center;
        box-sizing: border-box;
    }
    .left-bottom-item {
        position: relative;
        display: block;
        font-weight: 600;
        width: 100%;
        font-size: 0.28rem;
        line-height: 0.8rem;
        border-bottom: solid 1px #F4F4F4;
        box-sizing: border-box;
    }
    /* 分类右侧开始 */

    .classify-right {
        position: relative;
        width: 70%;
        height: 13.34rem;
        float: right;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .classify-right-box {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        overflow: hidden;
        display: none;
    }

    .classify-right-center {
        position: fixed;
        top: 0.9rem;
        right: 0;
        width: 70%;
        height: 0.8rem;
        float: left;
        border-bottom: solid 1px #F4F4F4;
        background-color: white;
        z-index: 999;
    }

    .right-center-item {
        width: 33.333333%;
        height: 100%;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.24rem;
        /* font-weight: 600; */
        float: left;
        border-right: solid 1px #F4F4F4;
        box-sizing: border-box;
        color: black;
    }

    .sort {
        position: absolute;
        top: -0.2rem;
        right: 0.2rem;
        width: 0.3rem;
        height: 0.3rem;
        margin-top: 0.25rem;
    }

    .sort > img {
        width: 100%;
    }

    .center-bottom-item {
        /*width: 66%;*/
        height: 1.6rem;
        border-bottom: solid 1px #F4F4F4;
        box-sizing: border-box;
    }

    .center-item-img {
        width: 1.6rem;
        height: 100%;
        text-align: center;
        float: left;
    }

    .center-item-img > img {
        width: 1.2rem;
        margin-top: 0.2rem;
    }

    .center-item-wz {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        /* font-weight: 600; */
        line-height: 0.4rem;
        color: black;
        display:block;
    }

    .center-item-z {
        width: 3.26rem;
        overflow: hidden;
    }

    .center-item-price {
        font-size: 0.28rem;
        color: #FF9201;
        line-height: 0.6rem;
        margin-top: 0.2rem;
        float: left;
    }

    .center-item-num {
        float: right;
        margin-top: 0.3rem;
        margin-right: 0.1rem;
    }

    .jian {
        width: 0.4rem;
        height: 0.4rem;
        float: left;
    }

    .jia {
        width: 0.4rem;
        height: 0.4rem;
        float: left;
    }

    .jian > img {
        width: 100%;
    }

    .jia > img {
        width: 100%;
    }

    .shuliang {
        text-align: center;
        font-size: 0.28rem;
        line-height: 0.4rem;
        float: left;
        margin: 0 0.1rem;
    }
    /* 分类右侧结束 */

    /* 隐藏列表开始 */

    .hidden-list {
        position: fixed;
        left: 30%;
        top: 1.7rem;
        width: 70%;
        height: 0;
        box-sizing: border-box;
        background-color: white;
        transition: height 2s;
        overflow: hidden;
        z-index: 9999;
    }

    .hidden-item {
        width: 30%;
        height: 0.44rem;
        border: solid 1px #EFEFEF;
        box-sizing: border-box;
        border-radius: 0.06rem;
        line-height: 0.44rem;
        font-size: 0.24rem;
        text-align: center;
        margin: 0.1rem 0 0.2rem 0.1rem;
        float: left;
    }

    .hidden-item:nth-child(1) {
        border-color: #FF9201;
        color: #FF9201;
    }


    /* 隐藏列表结束 */
    /* 下拉和上拉 */
    .shangla {
        left: 0;
        bottom: 0;
    }

    .xiala {
        left: 0;
        top: 0;
    }

    .commen {
        position: absolute;
        display: none;
        width: 100%;
        height: 100px;
        background-color: rgba(0, 0, 0, 0.3);
        font-size: 50px;
        line-height: 100px;
        color: white;
        text-align: center;
    }

    /* 下拉和上拉 */
</style>