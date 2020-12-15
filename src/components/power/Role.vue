<template>
    <div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>角色管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
</el-breadcrumb>
       <el-card>
           <el-button type="primary" @click="dialogVisible=true">添加角色</el-button>
           <el-table :data="roleslist" border stripe>
             <el-table-column type="expand" >
               <template slot-scope="scope">
               <el-row v-for="(item1) in scope.row.children" :key="item1.id">
                 <el-col :span="5">
                   <el-tag>{{item1.authName}}</el-tag>
                 </el-col>
                 <el-col :span="19"></el-col>
               </el-row>
               </template>
             </el-table-column>
             <el-table-column type="index" label="#"></el-table-column>
             <el-table-column label="角色名称" prop="roleName"></el-table-column>
             <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
             <el-table-column label="id" prop="id"></el-table-column>
             <el-table-column label="操作" width="340px">
                 <template slot-scope="scope" >
                 <el-button type="primary" icon="el-icon-edit"  @click="showeditroledialog(scope.row.id)">编辑</el-button>
                 <el-button type="danger" icon="el-icon-delete" @click="deleteroles(scope.row.id)" >删除</el-button>
                 <el-button type="warning" icon="el-icon-setting" >分配权限</el-button>
                 </template>
             </el-table-column>
           </el-table>
       </el-card>
<el-dialog
  title="添加角色"
  :visible.sync="dialogVisible"
  width="60%"
  center
  >
  <el-form  label-width="80px" :model="addroles" :rules="addrolerules" ref="addroleRef">
      <el-form-item label="角色名称" prop="roleName" >
          <el-input v-model="addroles.roleName" ></el-input>
      </el-form-item>
       <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addroles.roleDesc"></el-input>
      </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addrole">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="添加角色"
  :visible.sync="editdialogVisible"
  width="60%"
  center=""
  >
  <el-form  label-width="80px" :model="editroles" :rules="addrolerules" ref="editrolesref">
      <el-form-item label="角色名称" prop="roleName" >
          <el-input v-model="editroles.roleName" ></el-input>
      </el-form-item>
       <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editroles.roleDesc"></el-input>
      </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editrolesinfo" >确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
export default {
    data(){
     return{
       roleslist:[],
       dialogVisible:false,
       editdialogVisible:false,
       editroles:{ 
       },
        addroles:{
        roleName:'',
        roleDesc:'',
        id:''
      },
      addrolerules:{
        roleName:[
         {
            required:true,
            message:'请输入用户名',
            trigger:'blur'
            },
          {
            min:3,
            max:10,
            message:'请输入3到10个字符',
            trigger:'blur'
          }  
        ],
         roleDesc:[
          {
            required:true,
            message:'请输入密码',
            trigger:'blur'
            },
          {
            min:6,
            max:12,
            message:'请输入6到12个字符',
            trigger:'blur'
          }  
        ],
      }
     }
    },
       created(){
       this.getrolelist()
     },
    methods:{
       async getrolelist(){
        const {data:res} = await this.$http.get('roles')
        if (res.meta.status !==200){
          return this.$message.console.error("获取用户列表失败");
       } 
       this.roleslist=res.data
       console.log(res)
       },
      addrole(){
         this.$refs.addroleRef.validate(async valid =>{
            if(!valid) return
            const {data:res}= await this.$http.post('roles',this.addroles)
            console.log(res.data)
            if (res.meta.status !==201){
              this.$message.error('添加角色失败')
            }
              this.$message.success('添加角色成功')
              this.dialogVisible=false
              this.getrolelist()
         })
        },
       async showeditroledialog(id){
          console.log(id)
          const {data :res}=await this.$http.get('roles/'+id)
          if (res.meta.status!==200){
             return this.$message.error('查询角色信息失败')
          }
          this.$message.success('查询角色成功')
              this.editroles=res.data
             this.editdialogVisible=true
             console.log(res.data)

        }, 
         editrolesinfo(){
            this.$refs.editrolesref.validate(async valid=>{
                if(!valid)return
                const {data:res}=await this.$http.put('roles/' + this.editroles.roleId,{
                    roleName : this.editroles.roleName,
                    roleDesc : this.editroles.roleDesc
            })
             if(res.meta.status !==200){
               this.$message.error('更新角色信息失败')
             }
               this.$message.success('更新角色信息成功')
               this.editdialogVisible=false
               this.getrolelist()
              
              

          })  
        }, 
        async deleteroles(id){
        const confirm= await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).catch(err => err)
        if (confirm!=='confirm'){
          return this.$message.info('取消了操作')
        } 
        const {data :res}=await this.$http.delete('roles/'+id)
        if (res.meta.status!==200){
          return this.message.error('删除用户失败')
        }
           this.$message.success('删除用户成功')
           this.getrolelist()
      }
    }
}
</script>
<style lang="less" scoped>
.el-card{
    margin-top: 20px;
}
.el-button{
   margin-bottom: 20px;
}
.el-tag{
  margin: 7px;
}
</style>