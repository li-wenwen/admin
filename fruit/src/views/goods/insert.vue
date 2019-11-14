<template>
    <div id="cateinsert">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
            <el-form-item label="分类名称" prop="cname">
                <el-input v-model="form.cname" placeholder="请输入商品分类名称" clearable prefix-icon="el-icon-cherry"></el-input>
            </el-form-item>
            <el-form-item label="分类排序" prop="sort">
                <el-input v-model="form.sort" placeholder="请输入商品分类排序" clearable prefix-icon="el-icon-s-promotion"></el-input>
            </el-form-item>
            <el-form-item label="分类模板" prop="ctpl">
                <el-input v-model="form.ctpl" placeholder="请输入商品分类排序" clearable prefix-icon="el-icon-watermelon"></el-input>
            </el-form-item>
            <el-form-item label="缩略图" prop="thumb">
                <el-upload :action="uploadUrl" :on-success="uploadSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS,FAIL,TOKENFAIL,HOSTNAME} from "../../config/base";
    export default {
        name: "insert",
        data(){
            return {
                uploadUrl:HOSTNAME+'/api/upload',
                imageUrl:'',
                form:{
                    cname:'',
                    sort:'',
                    thumb:'',
                    ctpl:'',
                },
                rules: {
                    cname: [
                        { required: true, message: '请输入商品分类名称', trigger: 'blur' },
                        { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                    ],
                    sort:[
                        { required: true, message: '请输入商品分类排序', trigger: 'blur' },
                    ],
                    thumb:[
                        { required: true, message: '请添加商品分类缩略图', trigger: 'blur' }
                    ],
                    ctpl:[
                        { required: true, message: '请添加商品分类模板', trigger: 'blur' }
                    ],

                },
            }
        },
        methods:{
            uploadSuccess(res){
                this.imageUrl = 'http://localhost'+res.data.src;
                this.form.thumb = res.data.src;
                console.log(res);
            },
            submit(){
                this.$refs.form.validate(valid=>{
                    if(valid){
                        let token = sessionStorage.getItem('token');
                        let data = this.form;
                        fetch(HOSTNAME+'/api/category',{
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'token':token,
                                'Content-type': 'application/json',
                            }
                        })
                            .then(res=>res.json())
                            .then(data=>{
                                if(data.code == TOKENFAIL){
                                    this.$message({
                                        type:'warning',
                                        message:data.msg
                                    });
                                    if(data.code == SUCCESS){
                                        this.$refs['form'].resetFields();
                                        this.$message.success(data.msg);
                                    }else if(data.code == FAIL){
                                        this.$message.error(data.msg);
                                    }
                                }
                            })
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }

    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px #DCDFE6 solid;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-form{
        margin:50px 0 0 0;
        width: 500px;
    }
</style>