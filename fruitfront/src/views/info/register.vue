<template>
    <div class="register">
        <router-link :to="{name:'login'}">
        <div class="loging">登录</div>
        </router-link>
        <div class="word">注册账号</div>
        <div class="content">
            <van-cell-group class="input-box">
                <van-field v-model="form.nickname" left-icon="contact" clearable placeholder="请输入用户名"/>
                <van-divider />
                <van-field v-model="form.password" type="password" left-icon="bag-o" clearable placeholder="请输入密码"/>
                <van-divider />
                <van-field v-model="form.tel" left-icon="phone-o" placeholder="请输入手机号" clearable />
                <van-divider />
                <van-field v-model="form.sms" center clearable left-icon="comment-o" placeholder="请输入短信验证码" >
                    <van-button class="yuanjiao" slot="button" size="small" type="warning">发送验证码</van-button>
                </van-field>
            </van-cell-group>
            <van-divider />
            <van-button class="btn yuanjiao" slot="button" size="small" type="warning" @click="handleRrgister">立即注册</van-button>
        </div>
    </div>
</template>

<script>
    import {register} from "../../api/users";
    import {SUCCESS} from "../../config/base";
    import Vue from 'vue';
    import { Toast } from 'vant';

    Vue.use(Toast);

    export default {
        name: "register",
        data() {
            return {
                form:{
                    tel:'',
                    nickname:'',
                    password:'',
                    sms:'',
                }
            }
        },
        methods:{
            handleRrgister(){
                register('/api/users',this.form)
                    .then(res=>{
                        if(res.data.code == SUCCESS){
                            Toast.success(res.data.msg);
                        }else{
                            Toast.fail(res.data.msg);
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
    .register{
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
        height: 8rem;
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
</style>