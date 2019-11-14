<template>
    <div id="catequery">
        <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>查看商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-table :data="category" >
            <el-table-column prop="cname" label="分类名称" ></el-table-column>
            <el-table-column prop="sort" label="分类排序"></el-table-column>
            <el-table-column prop="thumb" label="缩略图">
                <template slot-scope="scope">
                    <img :src="imgHost + scope.row.thumb" alt="" width="100px">
                </template>
            </el-table-column>
            <el-table-column prop="ctpl" label="分类模板"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="update_time" label="更新时间"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <router-link :to="{name:'cateedit',query:{id:scope.row.id}}" tag="el-button">编辑</router-link>
                    <el-button @click="deletecate(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {SUCCESS,FAIL,IMGHOSTNAME,HOSTNAME} from "../../config/base";
    export default {
        name: "query",
        data(){
            return{
                category:[],
                imgHost:IMGHOSTNAME,
            }
        },
        methods:{
            getdata(){
                let token = sessionStorage.getItem('token');
                fetch(HOSTNAME+'/api/category',{
                    headers: {
                        'token':token,
                        'Content-type':'application/json',
                    }
                })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.code == SUCCESS){
                            this.category = data.data;
                            // this.total = data.count;
                        }else if(data.code == FAIL){
                            console.log(data);
                        }
                    })
            },
            deletecate(id){
                let token = sessionStorage.getItem('token');
                fetch(HOSTNAME+'/api/category/'+id,{
                    method:'DELETE',
                    headers: {
                        'token':token,
                    }
                }).then(res=>res.json())
                    .then(data=>{
                        if(data.code == SUCCESS){
                            // let index=this.category.findIndex(ele=>ele.id==id);
                            // this.category.splice(index,1);
                            this.category = this.category.filter(ele=>ele.id!=id);
                            console.log(data);
                        }else if(data.code == FAIL){
                            console.log(data);
                        }
                    })
            },
        },
        beforeMount(){
            this.getdata();
        }
    }
</script>

<style scoped>

</style>