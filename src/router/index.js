import Vue from 'vue'
import Router from 'vue-router'
//import getCoupon from '@/components/pages/h5Coupon/getCoupon'
import index from '@/components/pages/index/index'
//import memberCenter from '../components/pages/memberCenter/memberCenter.vue'//会员
import {pageRouters} from './pageRouters.js'

Vue.use(Router)
let routes = [];
let others = [ {
    path: '*',
    //component: getCoupon,
    component: index,
    query:{
      tenantcode:"",
      openid:""
  }
}]


routes = routes.concat(pageRouters)//授信
routes = routes.concat(others)//其他默认调到登录


export default new Router({
  //mode: 'history',
  routes
})
