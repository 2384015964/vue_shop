<template>
    <div class="login_container">
        <div class="login_box">
            <!-- <h1>LOGIN</h1>
             <div class="input1">
                <i class="fa fa-user"></i> 
                <input type="text" placeholder="usrname">
            </div>
              <div class="input1">
                <i class="fa fa-wrench"></i>
                <input type="text" placeholder="password">
            </div>
            <div class="btn">
                <button>登录</button> -->
            <!-- </div>
        </div> -->
       <h1 >LOGIN</h1>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" >
       <el-form-item  prop="username">
        <el-input v-model="loginForm.username"  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
     </el-form>
     <el-form :model="loginForm" :rules="loginFormRules" >
       <el-form-item  prop="password">
        <el-input v-model="loginForm.password"  prefix-icon="el-icon-key" type="password"></el-input>
      </el-form-item>
     </el-form>
     <div class="denglu">
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="info" @click="resetLoginForm">重置</el-button>
      </div>

    </div> 
</div>
</template>
<script>
export default {
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456',
            },
            loginFormRules:{
                username:[
                 { required: true, message: '请输入登录名称', trigger: 'blur' },
                  { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
                ],
                  password:[
                 { required: true, message: '请输入登录密码', trigger: 'blur' },
                 { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
                ],

            },
        }
    },
    methods:{
      resetLoginForm(){
          console.log(this)
          this.$refs.loginFormRef.resetFields();

      },
      login(){
          this.$refs.loginFormRef.validate(async valid=>{
        //    console.log(valid);
        if (!valid) return;
        //  管理员用户登录验证
         const {data:res}= await this.$http.post('login',this.loginForm);
             if (res.meta.status !==200) return this.$message.error('登录失败');
             this.$message.success('登录成功');
             window.sessionStorage.setItem("token",res.data.token);
             //把登录后的token保存到客户端
             this.$router.push('/home')
          })
      },

    }
}
</script>
<style lang="less" scoped>
.login_container{
    background-image: url(../assets/images/white.jpg);
    // background-color: #2b4b6b;
    height: 100%;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
        background-position: center;
        //使整张图片居中
        background-size:cover;
        //图片大小自适应
        height: 120vh;
        margin: 0px;
        padding: 0px;
 }
.login_box{
    width: 450px;
    height:300px;
    background:#00000080;
    justify-content: center;
    align-items: center;
    display: flex;
    position: absolute;
    box-sizing: border-box;
    flex-direction: column;
    border-radius: 25px;
    
    // background-color: #00000080;
    // border-radius: 25px;
    // text-align: center;
    box-shadow: 0 1px 5px cyan, 0 0 30px cyan ;
}
.login_box h1{
   background-image: linear-gradient(135deg,#00BFFF,#FF00FF);
   -webkit-background-clip:text;
   color: transparent;
   letter-spacing:5px;
   text-shadow: 0 1px 5px cyan, 0 0 30px cyan;
}
.denglu{
    clear: both;

}
</style>