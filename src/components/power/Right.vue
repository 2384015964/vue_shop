<template>
 <div>
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
 <el-card>
    <el-table :data="rightlist" border stripe>
     <el-table-column  type="index" label="#"></el-table-column>
     <el-table-column label="权限名称" prop="authName"></el-table-column>
     <el-table-column label="路径" prop="path"></el-table-column>
     <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
             <!-- 这里使用了vue的if语句 -->
         <el-tag v-if="scope.row.level ==='0'">一级</el-tag>
             <!-- 如果等级为0则显示一级标签 -->
         <el-tag type="success" v-else-if="scope.row.level ==='1'">二级</el-tag>
             <!-- 如果等级为1则显示一级标签 -->
         <el-tag type="warning" v-else>三级</el-tag>
              <!-- 否则显示三级标签 -->
          </template>
         </el-table-column>
    </el-table> 
  </el-card> 
 </div>

</template>
<script>
export default {
    data(){
     return{
       rightlist:[]
     }
    },
       created(){
       this.getrightlist()
     },
    methods:{
       async getrightlist(){
        const {data:res} = await this.$http.get('rights/list')
        if(res.meta.status !==200){
            return this.$message.error('获取权限列表失败')
        }
            this.rightlist=res.data
            this.$message.success('获取权限列表成功')
      }
    }
    
}
</script>
<style lang="less" scoped>
 .el-card{
     margin-top: 20px;
 }
</style>