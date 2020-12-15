import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import User from "../components/users/User.vue";
import Right from "../components/power/Right.vue";
import Role from "../components/power/Role.vue";
import Reports from "../components/reports/Reports.vue";
import GoodsList from "../components/goods/Goodlist.vue";
import Add from "../components/goods/Add.vue";
import Params from "../components/goods/Params.vue";
import Cate from "../components/goods/Cate.vue";
import Order from "../components/order/Order.vue";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    //默认路径是login 用rediret
    { path: "/login", component: Login },
    {
      //默认路径下面/home
      path: "/home",
      //选择的组件是Home.vue
      component: Home,
      //定向到/welcome
      redirect: "/welcome",
      //子路由路径定向到Welcom.Vue
      children: [
        { path: "/welcome", component: Welcome },
        { path: "/users", component: User },
        { path: "/rights", component: Right },
        { path: "/roles", component: Role },
        { path: "/reports", component: Reports },
        { path: "/categories", component: Cate },
        { path: "/params", component: Params },
        { path: "/goods", component: GoodsList },
        { path: "/goods/add", component: Add },
        { path: "/orders", component: Order },
      ],
    },
  ],
});
// 挂载导航守卫，就是在后台验证token的key是否存在，使用户不能通过url地址
//直接进入后台home界面自动跳转到home界面
router.beforeEach((to, from, next) => {
  // to是即将访问的路径
  //from是从那个路径跳转
  //next是一个函数
  //next()放行 next('/login')强制跳转
  if (to.path === "/login") return next();
  const tokenstr = window.sessionStorage.getItem("token");
  if (!tokenstr) return next("/login");
  //!tokenstr是指有无token存在客户端
  next();
});
export default router;
