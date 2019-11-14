<template>
    <div>
        <div class="top-fendaohang">
            <a href="#" @click="back">
                <div class="top-fendaohang-l" >
                    <img src="../../views/content/img/index/arrow-left.png" alt="" id="img-icon-wuauto">
                </div>
            </a>
            <a href="">
                <div class="top-fendaohang-c">
                    <span class="span-icon" id="span-icon-black"><slot></slot></span>
                </div>
            </a>
            <a href="">
                <div class="top-fendaohang-r">
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-header-list",
        props:{
            isshow:{
                type:Boolean,
                default:false,
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    @import "../../style/css/mr.css";
    @import "../../style/css/public.css";
</style>