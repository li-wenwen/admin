<template>
    <div id="app">
        <my-loading></my-loading>
        <router-view/>
    </div>
</template>

<script>
    import MyLoading from './components/my-loading/my-loading';
    export default {
        name: "App",
        components:{
          MyLoading,
        }
    }
</script>
<style>
#app{
  overflow: hidden;
}
</style>
