const newLocal='warning'
<template>
    <div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card class="card">
  <el-row :gutter="20">  
    <el-col :span="8">
      <el-input 
      placeholder="请输入内容"
      v-model="queryinfo.query"
      clearable
      @clear="getUserlist()"
       >
      <el-button @click="getUserlist()" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4"> 
      <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
    </el-col>
  </el-row>
<el-table :data="userlist" border>
  <el-table-column type="index" label="id"></el-table-column>
  <el-table-column label="姓名" prop="username" ></el-table-column>
  <el-table-column label="邮箱" prop="email" ></el-table-column>
  <el-table-column label="电话" prop="create_time" ></el-table-column>
  <el-table-column label="角色" prop="role_name" ></el-table-column>
  <el-table-column label="状态" >
    <template slot-scope="scope">
   <el-switch v-model="scope.row.mg_state" @change="userstatuschange(scope.row)">
     </el-switch> 
    </template>
  </el-table-column>
  <el-table-column label="操作" width="180px">
     <template slot-scope="scope">
     <el-button type="primary" icon="el-icon-edit" size="mini" @click="showeditformdialog(scope.row.id)"></el-button>
     <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteuser(scope.row.id)"></el-button>
     <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
     </template>
  </el-table-column>
</el-table>
   <!-- 这里是分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryinfo.pagenum"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="queryinfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
  <!-- 添加用户弹出对话框 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="60%"
  @close="addformclose"
  >
  <el-form :model="addform" :rules="addformrules" ref="addFormRef" label-width="70px" >
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addform.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addform.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addform.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="addform.mobile"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible=false">取 消</el-button>
    <el-button type="primary" @click="adduser">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改用户信息的对话框 -->
<el-dialog
  title="提示"
  :visible.sync="editformdialog"
  width="60%"
  >
  <span>修改用户信息</span>
  <el-form :model="editform" :rules="addformrules" ref="editformRef" label-width="70px" >
  <el-form-item label="用户名" >
    <el-input v-model="editform.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="editform.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="editform.mobile"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editformdialog=false">取 消</el-button>
    <el-button type="primary" @click="edituserinfo">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
export default {
  data(){
    //邮箱校验规则
    var checkEmail=(rule,value,cuowu)=>{
      const regEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if(regEmail.test(value)){
         return cuowu()
      }
      cuowu(new Error('请输入合法的邮箱'))
    }
    //手机号校验规则
        var checkMobile=(rule,value,cuowu)=>{
      const regMobile=/^1[3|4|5|8][0-9]\d{4,8}$/; 
      if(regMobile.test(value)){
         return cuowu()
      }
      cuowu(new Error('请输入合法的手机号'))
    }
    return {
      //用户信息
      queryinfo:{
        query:'',
        pagenum : 1,
        pagesize:2
      },
      userlist:[],
      total:0,
      //消息框隐藏
      dialogVisible:false,
      editformdialog:false,
      //查询的用户信息
      editform:{},
      //表单规则的制订
      addform:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      addformrules:{
        username:[
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
         password:[
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
         email:[
          {
            required:true,
            message:'请输入邮箱',
            trigger:'blur'
            },
          {
            min:6,
            max:10,
            message:'请输入6到10个字符',
            trigger:'blur'
          },
          {validator:checkEmail,trigger:'blur'}  
        ],
         mobile:[
          {
            required:true,
            message:'请输入手机号',
            trigger:'blur'
            },
          {
            min:8,
            max:11,
            message:'请输入8到10个字符',
            trigger:'blur'
          },
          {validator:checkMobile,trigger:'blur'}   
        ]
      }

    }
},
    created(){
     this.getUserlist()
    },
    methods:{
      //获取api接口用户数据
      async getUserlist(){
       const {data:res}= await this.$http.get('users',{params:this.queryinfo})
       if (res.meta.status !==200){
          return this.$message.console.error("获取用户列表失败");
       } 
       this.userlist=res.data.users
       this.total=res.data.total
       console.log(res)
      },
      //页码大小
      handleSizeChange(newsize){
         console.log(newsize)
         this.queryinfo.pagesize=newsize
         this.getUserlist()
      },
      //页码数字
      handleCurrentChange(newpage){
        console.log(newpage)
        this.queryinfo.pagenum=newpage
        this.getUserlist()
      },
      //用户状态的更新
      async userstatuschange(userinfo){
         console.log(userinfo)
         const {data:res}=await this.$http.put(
           `users/${userinfo.id}/state/${userinfo.mg_state}`
           )
          if(res.meta.status!==200){
            userinfo.mg_state=!userinfo.mg_state
            return this.$message.error('更新用户状态失败')
          }
           this.$message.success('更新用户状态成功')
      },
       //页面表单重置
      addformclose(){
         this.$refs.addFormRef.resetFields()
       },
      //添加用户
      adduser(){
         this.$refs.addFormRef.validate(async valid =>{
            if(!valid) return
            const {data:res}= await this.$http.post('users',this.addform)
            if (res.meta.status !==201){
              this.$message.error('添加用户失败')
            }
              this.$message.success('添加用户成功')
              this.dialogVisible=false
              this.getUserlist()
              console.log()
         })
        },
      //渲染用户信息
      async showeditformdialog(id){
          // console.log(id)
          const {data :res}=await this.$http.get('users/'+id)
          if (res.meta.status!==200){
             return this.$message.error('查询用户信息失败')
          }
          this.$message.success('查询用户成功')
             this.editform=res.data
             this.editformdialog=true

        },
      //发起的修改请求
      edituserinfo(){
          this.$refs.editformRef.validate(async valid=>{
            if(!valid)return
            const {data:res}= await this.$http.put('users/'+ this.editform.id,{
              email: this.editform.email,
              mobile: this.editform.mobile
            })
            console.log(this.editform.mobile)
             if(res.meta.status !==200){
               this.$message.error('更新用户信息失败')
             }
               this.$message.success('更新用户信息成功')
               this.editformdialog=false
               this.getUserlist()
              

          })  
        },
       async deleteuser(id){
        const confirm= await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).catch(err => err)
        if (confirm!=='confirm'){
          return this.$message.info('取消了操作')
        } 
        const {data :res}=await this.$http.delete('users/'+id)
        if (res.meta.status!==200){
          return this.message.error('删除用户失败')
        }
           this.$message.success('删除用户成功')
           this.getUserlist()
      }

    },

  }
</script>
<style lang="less" scoped>
.card{
  margin-top: 20px;
  .el-table{
    margin-top: 20px;
  }
  .el-pagination{
    margin-top: 20px;
  }
}

</style>