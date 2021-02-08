// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'V1cPBLodMz5GgwGMq7jd4QyYFtDxdTHk'  //这个地方是官方提供的ak密钥
 })
 import Clipboard from "vue-clipboard2";
 Vue.use(Clipboard)
 import Divider  from 'vant';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant); 
 // 公共组件
import footer from './components/common/footer/footerNav.vue'
import headerPrompt from './components/common/headerNav/headerNav.vue'
Vue.component('v-footer', footer)
Vue.component('v-header', headerPrompt)
import moment from 'moment'//导入文件 

Vue.prototype.$moment = moment;//赋值使用

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
