<template>
    <div>
        <!-- 头部开始 -->
        <my-header-list>
            {{category.cname}}
        </my-header-list>
        <!-- 头部结束 -->
        <van-pull-refresh v-model="isLoading" @refresh="getGoods">
            <div class="box">
                <div class="banner">
                    <img :src="imgHostName + category.thumb" alt="">
                </div>
                <div class="top" v-for="item in goods" :key="item.gid">
                    <div class="toptupian">
                        <img v-lazy="imgHostName + item.thumb" :alt="item.gname" :title="item.gname">
                    </div>
                    <div class="hezi">
                        <div class="zi">{{item.gname}}{{item.norms}}</div>
                        <span class="qianshu">￥{{item.sale}}</span>
                        <span class="qwe">原价 <del>{{item.mprice}}</del></span>
                        <div class="goumai">立即购买</div>
                    </div>
                </div>
            </div>
            <div class="title">活动规则</div>
            <div class="title1">
                <p>1.秒杀商品同一设备同一用户仅有1次抢购机会，不及时支付订单导致订单取消等于放弃抢购，机会有限先到先得</p>
                <p>2.商品数量有限，售完即止。需及时在线支付，请以订单支付成功时间为准；</p>
                <p>3.若发现用户恶意刷单，爱鲜蜂有权拒绝送货。</p>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
    import MyHeaderList from '../../components/my-header/my-header-list';
    import axios from 'axios';
    import {HOSTNAME,IMGHOSTNAME,SUCCESS} from "../../config/base";


    export default {
        name: "list",
        components:{
            MyHeaderList,
        },
        data(){
            return{
                imgHostName:IMGHOSTNAME,
                isLoading:false,
                category:[],
                goods:[],
                id:0,
                currentPage:0,
                limit:4,
                total:0,
            }
        },
        methods:{
            getGoods(){
                // setTimeout(() => {
                //     this.$toast('刷新成功');
                //     this.isLoading = false;
                // }, 500);
                this.isLoading = true;
                this.currentPage++;
                if(this.currentPage > 1 && this.currentPage > this.total){
                    this.isLoading = false;
                    this.$toast('暂时没有商品');
                    return;
                }
                axios.get(HOSTNAME + '/api/goodslist',{
                    params:{
                        page:this.currentPage,
                        limit:this.limit,
                        cid:this.id
                    }
                }).then(res=>{
                    if(res.data.code == SUCCESS){
                        let total = res.data.total;
                        let goods = res.data.data;
                        !this.total && (this.total = Math.ceil(total / this.limit));
                        this.goods.unshift(...goods);
                        this.$nextTick(()=>{
                            this.isLoading = false;
                        })
                        window.console.log(res.data.msg);
                    }else{
                        window.console.log(res.data.msg);
                    }
                    }
                )
            },
            getCurrentCategory(){
                axios.get(HOSTNAME+'/api/catelist/'+this.id)
                    .then(res=>{
                        let data = res.data;
                        if(data.code == SUCCESS){
                            this.category = data.data;
                            window.console.log(data.msg);
                        }else{
                            window.console.log(data.msg);
                        }
                    })
            }
        },
        beforeMount() {
            this.id = this.$route.query.id;
            this.getCurrentCategory();
            this.getGoods();
        }
    }
</script>

<style scoped>
    @import "../../style/css/mr.css";
</style>