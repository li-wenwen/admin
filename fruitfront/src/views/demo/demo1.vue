<template>
    <div>
        <h1>这是 demo1</h1>
        <button @click="count++">按钮{{count}}</button>
        {{names}}{{$store.state.sex}}{{$store.getters.names}}
    </div>
</template>

<script>
    export default {
        name: "demo1",
        data(){
            return {
                count:1,
            }
        },
        computed:{
            names(){
                return this.$store.state.name;
            }
        },
        beforeMount(){
           window.console.log(this);
        },
    }
</script>

<style scoped>

</style>