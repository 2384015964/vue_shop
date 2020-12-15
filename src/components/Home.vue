<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img
          src="../assets/images/icon1.jpg"
          style="width:60px;height:60px; border-radius:15px;"
        />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="infohome">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 左侧页面 -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <div class="toggle" @click="tocollapse">|||</div>
        <el-menu
          background-color="#1E90FF"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="icon[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + submenu.path"
              v-for="submenu in item.children"
              :key="submenu.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ submenu.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menulist: [],
      icon: {
        "125": "iconfont ei-icon-zCustomermanagement-fill",
        "103": "iconfont ei-icon-zproduct",
        "101": "iconfont ei-icon-zshangpin",
        "102": "iconfont ei-icon-zicon-test",
        "145": "iconfont ei-icon-zshuffling-banner-fill",
      },
      //默认不折叠
      iscollapse: false,
    };
  },
  created() {
    this.getMenulist();
  },
  methods: {
    infohome() {
      window.sessionStorage.clear("token");
      this.$router.push("./login");
    },
    async getMenulist() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.error(res.meta.msg);
      this.menulist = res.data;
      // console.log(res, "结果");
    },
    tocollapse() {
      this.iscollapse = !this.iscollapse;
    },
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background-image: linear-gradient(135deg, #3b4ffffa, #00fde8, #90ee90);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;
  color: white;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    > span {
      margin-left: 15px;
      background-image: linear-gradient(135deg, #1b028b, #ff00ff);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}
.el-header button:hover {
  background-color: red;
}
.el-aside {
  background-color: #1e90ff;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #f0f8ff;
}
.home-container {
  height: 100%;
}
.toggle {
  background-color: #63b8ff;
  height: 25px;
  color: white;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  line-height: 24px;
  letter-spacing: 0.2em;
}
</style>
