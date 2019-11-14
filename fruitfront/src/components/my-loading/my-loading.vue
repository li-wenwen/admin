<template>
    <div class="loading" v-show="isShow">
        <div class="loading-box">
           <van-icon name="ellipsis" color="#fff" size="30"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Icon } from 'vant';

    Vue.use(Icon);
    export default {
        name: "my-loading",
        computed:{
            isShow(){
                return this.$store.state.isShow;
            }
        }
    }
</script>

<style scoped>
.loading{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
}
    .loading>.loading-box{
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>