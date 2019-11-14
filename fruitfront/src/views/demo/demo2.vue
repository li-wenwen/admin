<template>
    <div>
        <h1>这是 demo2</h1>
        <button @click="count++">按钮{{count}}</button>
    </div>
</template>

<script>
    export default {
        name: "demo2",
        data(){
            return {
                count:1,
            }
        }
    }
</script>

<style scoped>

</style>