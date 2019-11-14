<template>
    <div class="login">
        <router-link :to="{name:'register'}">
        <div class="loging">注册</div>
        </router-link>
        <div class="word">登录账号</div>
        <div class="content">
            <van-cell-group class="input-box">
                <van-field v-model="form.nickname" left-icon="contact" clearable placeholder="请输入用户名或手机号"/>
                <van-divider />
                <van-field v-model="form.password" type="password" left-icon="bag-o" clearable placeholder="请输入密码"/>
                <div class="forget">忘记密码</div>
            </van-cell-group>
            <van-button class="btn yuanjiao" slot="button" size="small" type="warning" @click="handlelogin">立即登录</van-button>
        </div>

        <div class="third">
            <span>使用第三方登录</span>
            <div class="pic-box">
                <div class="pic"><img src="./img/login/weixin.png" alt=""></div>
                <div class="pic"><img src="./img/login/qq.png" alt=""></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from "../../api/users";
    import {SUCCESS} from "../../config/base";
    import Vue from 'vue';
    import { Toast } from 'vant';

    Vue.use(Toast);


    export default {
        name: "register",
        data() {
            return {
                form:{
                    nickname:'',
                    password:'',
                }
            }
        },
        methods:{
            handlelogin(){
                login('/api/login',this.form)
                    .then(res=>{
                        if(res.code == SUCCESS){
                            res.token
                            Toast.success(res.msg);
                            let names = this.$route.query.redirect || 'index';
                            this.$store.dispatch('setCart');
                            this.$store.commit('changeToken',res.token);
                            this.$router.push({name:names});
                        }else{
                            Toast.fail(res.msg);
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .van-divider {
        border-color: #fff;
    }
    .login{
        position: relative;
        width: 7.5rem;
        height: 13.34rem;
        background: url("./img/login/bj.jpg") no-repeat 100% center;
        overflow: hidden;
    }

    .loging{
        width: 1rem;
        height: 0.5rem;
        color: #fff;
        line-height: 0.5rem;
        text-align: center;
        background: rgba(255,255,255,0.2);
        margin: 0.7rem 0 0 5.8rem;
        border-radius: 0.25rem;
    }
    .word{
        width: 2.5rem;
        height: 0.8rem;
        color: rgb(255,255,255);
        font-size: 0.6rem;
        margin: 0 auto;

    }
    .content{
        position: relative;
        width: 6rem;
        height: 5rem;
        background: #fff;
        margin: 0.5rem auto 0 ;
        border-radius: 0.5rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
    }
    .input-box{
        position: absolute;
        top:0.6rem;
        left:0;
        width: 100%;
    }
    .btn{
        position: absolute;
        bottom:0.5rem;
        left:0.5rem;
        width: 5rem;
    }
    .yuanjiao{
        border-radius: 0.32rem;
    }
    .forget{
        font-size: 0.2rem;
        color: #8D8D8D;
        float: right;
        margin-right: 0.5rem;
    }
    .third{
        position: relative;
        width: 3.1rem;
        height: 1.6rem;
        background: #fff;
        position: absolute;
        left:2.1rem;
        bottom:3rem;
        border-radius: 0.3rem;
    }
    .third span{
        display: block;
        margin: 0.2rem 0.7rem 0;
        font-size: 0.24rem;
        color: #EA4D13;
    }
    .pic-box{
        position: absolute;
        top:0.8rem;
        left: 0.5rem;
        width: 2rem;
        display: flex;
        justify-content: space-around;
    }
    .pic{
        width: 0.6rem;
        height: 0.6rem;
    }
    .pic img{
        width: 0.6rem;
    }
</style>