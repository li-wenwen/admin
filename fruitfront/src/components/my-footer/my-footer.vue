<template>
    <div>
        <!-- 底部TAB栏(首页的颜色为橘色，可复制) 开始 -->
        <div class="footer-tab">
            <ul>
                <a href="#">
                    <li>
                        <router-link :to="{name:'index'}">
                            <img v-show="active !== 1" src="./img/public/首页 (2).png" alt="" class="img-icon">
                            <img v-show="active == 1" src="./img/public/首页 (1).png" alt="" class="img-icon">
                        <span class="span-icon" :class="{'span-icon-color':this.active == 1}">首页</span>
                        </router-link>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <router-link :to="{name:'classify'}">
                            <img v-show="active !== 2" src="./img/public/搜索.png" alt="" class="img-icon">
                            <img v-show="active == 2" src="./img/public/搜索 (1).png" alt="" class="img-icon">
                            <span class="span-icon" :class="{'span-icon-color':this.active == 2}">分类</span>
                        </router-link>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <router-link :to="{name:'car'}">
                            <img v-show="active !== 3" src="./img/public/购物车.png" alt="" class="img-icon">
                            <img v-show="active == 3" src="./img/public/购物车 (2).png" alt="" class="img-icon">
                            <span class="span-icon" :class="{'span-icon-color':this.active == 3}">购物车</span>
                        </router-link>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <router-link :to="{name:'mine'}">
                        <img v-show="active == 4" src="./img/public/我的 (1).png" alt="" class="img-icon">
                        <img v-show="active !== 4" src="./img/public/我的.png" alt="" class="img-icon">
                        <span class="span-icon" :class="{'span-icon-color':this.active == 4}">我的</span>
                        </router-link>
                    </li>
                </a>
            </ul>
        </div>
        <!-- 底部TAB栏 结束 -->
    </div>
</template>

<script>
    export default {
        name: "my-footer",
        props:{
            active:{
                type:Number,
                default:1,
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
    @import "../../style/css/public.css";
</style>