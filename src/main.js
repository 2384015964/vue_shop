import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./plugins/day.js";
import "./assets/css/golobal.css";
// import './assets/font-awesome/css/font-awesome.min.css'
import "./assets/font/iconfont.css";
import axios from "axios";
import TreeTable from "vue-table-with-tree-grid";

axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/";
// axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$http = axios;
axios.interceptors.request.use((config) => {
  // console.log(config, "menus");
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
Vue.config.productionTip = false;
Vue.component("tree-table", TreeTable);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
