<template>
    <div>
        <my-header-list>商品详情</my-header-list>
        <div v-if="goods">
            <!-- 轮播开始 -->
            <div class="content">
                <van-swipe :autoplay="3000" indicator-color="#1989fa">
                    <van-swipe-item v-for="(item,index) in banner" :key="index">
                        <a href="" class="banner-img">
                            <img  :src="imgpath+item" :alt="item.name">
                        </a>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 轮播结束 -->
            <!-- 内容开始 -->
            <div class="content-b">
                <div class="content-top">
                    <div class="xianjia">￥ {{goods.sale}}</div>
                    <div class="yuanjia">原价:{{goods.mprice}}</div>
                    <div class="tejia">特价</div>
                </div>
                <div class="content-bottom">{{goods.description}}</div>
            </div>
            <!-- 内容结束 -->
            <!-- 商品详情开始 -->
            <div class="goodsDetail">商品详情</div>
            <div class="goodsDetail-b">
                <div class="goodsDetail-b-f">
                    <span style="color: #8A8D93">品牌: </span>
                    <span>{{goods.brand}}</span>
                </div>
                <div class="goodsDetail-b-f">
                    <span style="color: #8A8D93">产品规格: </span>
                    <span>{{goods.norms}}</span>
                </div>
            </div>
            <!-- 商品详情结束 -->
            <!-- 图文详情开始 -->
            <div class="goodsDetail">图文详情</div>
            <div class="tuwen-img" v-for="item in detail" :key="item">
                <img style="width: 100%" :src="imgpath+item" :alt="goods.gname">
            </div>
            <!-- 图文详情结束 -->
            <!-- 隐藏页开始 -->
            <div class="hidden-bg"></div>
            <div class="hidden-bottom">
                <h2>分享</h2>
                <div class="hidden-list">
                    <div class="hidden-item">
                        <img src="" alt="">
                        <div class="qq">QQ</div>
                    </div>
                    <div class="hidden-item">
                        <img src="" alt="">
                        <div class="qq">微信</div>
                    </div>
                    <div class="hidden-item">
                        <img src="" alt="">
                        <div class="qq">QQ空间</div>
                    </div>
                    <div class="hidden-item">
                        <img src="" alt="">
                        <div class="qq">豆瓣</div>
                    </div>
                    <div class="hidden-item">
                        <img src="" alt="">
                        <div class="qq">新浪微博</div>
                    </div>
                </div>
                <div class="hidden-item bott">
                    <img src="" alt="">
                    <div class="qq">支付宝</div>
                </div>
            </div>

            <!-- 隐藏页结束 -->
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
            <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
            <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
        </van-goods-action>
    </div>
</template>

<script>
    import axios from 'axios';
    import {HOSTNAME,IMGHOSTNAME,SUCCESS} from "../../config/base";
    import MyHeaderList from '../../components/my-header/my-header-list';

    export default {
        name: "Details",
        components: {
            MyHeaderList,
        },
        data() {
            return {
                id: 0,
                goods: [],
                imgpath: IMGHOSTNAME,
                banner: [],
                detail:[],
            }
        },
        methods: {
            getgoods() {
                axios.get(HOSTNAME + '/api/goodslist/' + this.id)
                    .then(res => {
                        if(res.data.code == SUCCESS){
                            this.goods = res.data.data;
                            this.banner = res.data.data.banner.split(',');
                            this.detail = res.data.data.detail.split(',');
                            window.console.log(res.data.msg);
                        }else{
                            window.console.log(res.data.msg);
                        }
                    })
            },
            onClickIcon() {
            },
            onClickButton() {
            }
        },
        beforeMount() {
            this.id = this.$route.query.id;
            this.getgoods();
        }
    }
</script>

<style scoped>
    @import url("../../style/css/detail.css");

    .banner-img {
        width: 7.5rem;
        height: 7.5rem;
    }

    .banner-img > img {
        width: 100%;
        height: 100%;
    }
</style>