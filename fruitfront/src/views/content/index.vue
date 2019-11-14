<template>
    <div class="index">
        <my-header></my-header>
        <div class="null"> </div>
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item>
                <a href="">
                    <img src="./img/index/bear-img1.jpg" alt="">
                </a>
            </van-swipe-item>
            <van-swipe-item>
                <a href="">
                    <img src="./img/index/banner-img2.jpg" alt="">
                </a>
            </van-swipe-item>
            <van-swipe-item>
                <a href="">
                    <img src="./img/index/banner-img3.jpg" alt="">
                </a>
            </van-swipe-item>
        </van-swipe>
        <!-- 金刚区开始 -->
        <div class="jingang">
            <ul class="jingang-list">
                <li class="jingang-item">
                    <a href="sg.html">
                        <div class="img">
                            <img src="./img/index/foot.png" alt="">
                        </div>
                        <div class="jingang-text">水果特惠</div>
                    </a>
                </li>
                <li class="jingang-item">
                    <a href="mr.html">
                        <div class="img" style="background-color: #E6C3BD">
                            <img src="./img/index/today.png" alt="">
                        </div>
                        <div class="jingang-text">每日必抢</div>
                    </a>
                </li>
                <li class="jingang-item">
                    <a href="hc.html">
                        <div class="img" style="background-color: #EED0B8">
                            <img src="./img/index/fuli.png" alt="">
                        </div>
                        <div class="jingang-text">嗨吃福利</div>
                    </a>
                </li>
                <li class="jingang-item">
                    <a href="xf.html">
                        <div class="img" style="background-color: #8CB2C5">
                            <img src="./img/index/good.png" alt="">
                        </div>
                        <div class="jingang-text">本店力推</div>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 金刚区结束 -->
        <!-- 优选开始 -->
        <div v-if="cateGoods.length">
            <div class="youxuan" v-for="cate in cateGoods" :key="cate.id">
                <div class="temai-text">
                    <router-link tag="span" :to="{name:'list',query:{id:cate.id}}">{{cate.cname}}</router-link>
                    <i class="iconfont icon-rightarrow"></i>
                </div>
                <div class="temai-img">
                    <div class="img-item">
                        <img :src="imgHostName + cate.thumb" :title="cate.cname" :alt="cate.name">
                    </div>
                </div>
                <ul class="furit-list">
                    <li class="fruit-item" v-for="goods in cate.goods" :key="goods.gid">
                        <!--<router-link class="fruit-router" :to="{name:'detail',query:{id:goods.gid}}">-->
                        <div class="fruit-img">
                            <img :src="imgHostName + goods.thumb" alt="">
                        </div>
                        <div class="fruit-title">{{goods.gname}}{{goods.norms}}</div>

                        <div class="fruit-price">￥{{goods.mprice}}
                            <del style="font-size: 12px;color: #979797; margin-left:0.04rem;text-decoration:line-through">￥{{goods.sale}}</del>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 优选结束 -->
        <div class="footer-null"></div>
        <my-footer :active="1"></my-footer>
    </div>
</template>

<script>
    import MyHeader from '../../components/my-header/my-header';
    import MyFooter from '../../components/my-footer/my-footer';
    import {IMGHOSTNAME,SUCCESS} from "../../config/base";
    import {api} from "../../config/api";

    export default {
        name: "index",
        components:{
            MyHeader,
            MyFooter,
        },
        data(){
            return{
                cateGoods:[],
                imgHostName:IMGHOSTNAME,
            }
        },
        methods:{
            getData(){
                api('get','/api/index/')
                    .then(res=>{
                        if(res.code == SUCCESS){
                            this.cateGoods = res.data;
                            window.console.log(res.msg);
                        }else{
                            window.console.log(res.msg);
                        }
                    })
            }
        },
        beforeMount() {
            this.getData();
        }
    }
</script>

<style scoped>
    @import "../../style/css/index.css";
    @import url("http://at.alicdn.com/t/font_1390962_brph6ejz11c.css");
    .null{
        height: 1.28rem;
    }
.van-swipe{
    width: 100%;
    height: 2.73rem;
}
.van-swipe img,a{
    width: 100%;
    height: 100%;
    display: block;
}
    .fruit-item >.fruit-title{
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .footer-null{
        width: 100%;
        height: 1rem;
    }
</style>