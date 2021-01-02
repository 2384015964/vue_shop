import Vue from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);
console.log(dayjs().format("YYYY-MM-DD"));
Vue.filter("dateFormat", (value) => {
  return dayjs(value).from(dayjs());
});
Vue.filter("Day", (value) => {
  return new Date(parseInt(value) * 1000)
    .toLocaleString()
    .replace(/:\d{1,2}$/, " ");
});
