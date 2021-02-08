
// 规范路由path要求   
// 1、参考示例路径为@/components/pages/bankCard/cashWithdrawalsfrom   则path为/bankCard/cashWithdrawalsfrom



import login from '../components/pages/login/login.vue'//登录
import authen from '../components/pages/login/authen.vue'//登录验证
import register  from '../components/pages/register/register.vue'//注册
import citySerch from '../components/pages/citySerch/citySerch.vue'//城市搜索
import indexSerch from '../components/pages/indexSerch/indexSerch.vue'//首页搜索
import calender from '../components/pages/calender/calender.vue'//日历
import calenderMarket from '../components/pages/calender/calenderMarket.vue'//日历营销
import houseDetail from '../components/pages/houseDetail/houseDetail.vue'//酒店详情
import tourStrategy from '../components/pages/tourStrategy/tourStrategy.vue'//酒店详情
import map from '../components/pages/houseDetail/map.vue'//地图
import houseReservation from '../components/pages/houseReservation/houseReservation.vue'//酒店预订
import commonIndex from '../components/pages/comment/commonIndex.vue'//评论列表
import comment from '../components/pages/comment/comment.vue'//评论

import chooseRoom from '../components/pages/chooseRoom/chooseRoom.vue'//输入评论
import orderList from '../components/pages/orderList/orderList.vue'//订单列表
import my from '../components/pages/my/my.vue'//我的
import myCenter from '../components/pages/myCenter/myCenter.vue'//会员中心
import checkIn from '../components/pages/checkIn/checkIn.vue'//入住
import checkIn1 from '../components/pages/checkIn/checkIn1.vue'//入住1
import checkIn2 from '../components/pages/checkIn/checkIn2.vue'//入住2
import checkIn3 from '../components/pages/checkIn/checkIn3.vue'//入住3

import coupon from '../components/pages/coupon/coupon.vue'//优惠券
import ordering from '../components/pages/ordering/ordering.vue'//订单支付
import orderingUndone from '../components/pages/ordering/orderingUndone.vue'//订单支付未完成
import pay from '../components/pages/pay/pay.vue'//支付
import payPassword from '../components/pages/pay/payPassword.vue'//支付密码
import paySuccess from '../components/pages/pay/paySuccess.vue'//支付成功
import payWait from '../components/pages/pay/payWait.vue'//支付成功
import payResult from '../components/pages/pay/payResult.vue'//支付结果
import memberRecharge from '../components/pages/pay/memberRecharge.vue'//支付密码
import houseList from '../components/pages/houseList/houseList.vue'//酒店列表页

import saleCoupon from '../components/pages/marketing/saleCoupon.vue'//没用
import saleCoupon2 from '../components/pages/marketing/saleCoupon2.vue'//没用
import secondKill from '../components/pages/marketing/secondKill.vue'//没用
import marketing from '../components/pages/marketing/marketing.vue'//促销
import couponPay from '../components/pages/marketing/couponPay.vue'//优惠券订单
import joinGroup from '../components/pages/marketing/joinGroup.vue'//拼团
import share from '../components/pages/marketing/share.vue'//拼团

import getCoupon from '../components/pages/h5Coupon/getCoupon.vue'//优惠券
import couponSuccess from '../components/pages/h5Coupon/couponSuccess.vue'//优惠券领取成功

import couponDetail from '../components/pages/marketing/couponDetail.vue'//列表详情

import activityOrder from '../components/pages/orderList/activityOrder.vue'//活动订单

export const pageRouters = [
    {
        path: '/login/login', 
        name: 'login/login',
        component: login,
    },
    {
        path: '/login/authen', 
        name: '/login/authen',
        component: authen,
        query:{
            tenantcode:"",
            appid:""
        }
    },
    {
        path: '/register/register', 
        name: 'register/register',
        component: register,
    },
    {
        path: '/citySerch/citySerch', 
        name: 'citySerch/citySerch',
        component: citySerch,
    },
   
    {
        path: '/indexSerch/indexSerch', 
        name: 'indexSerch/indexSerch',
        component: indexSerch,
    },
    {
        path: '/houseDetail/houseDetail', 
        name: 'houseDetail/houseDetail',
        component: houseDetail,
    },
    {
        path: '/tourStrategy/tourStrategy', 
        name: 'tourStrategy/tourStrategy',
        component: tourStrategy,
    },
    {
        path: '/map/map', 
        name: 'map/map',
        component: map,
    },
    {
        path: '/houseReservation/houseReservation', 
        name: 'houseReservation/houseReservation',
        component: houseReservation,
    },
    {
        path: '/commonIndex/commonIndex', 
        name: 'commonIndex/commonIndex',
        component: commonIndex,
    },
    {
        path: '/comment/comment', 
        name: 'comment/comment',
        component: comment,
    },
    {
        path: '/chooseRoom/chooseRoom', 
        name: 'chooseRoom/chooseRoom',
        component: chooseRoom,
    },
    {
        path: '/orderList/orderList', 
        name: 'orderList/orderList',
        component: orderList,
    },
    {
        path: '/my/my', 
        name: 'my/my',
        component: my,
    },
    {
        path: '/calender/calender', 
        name: 'calender/calender',
        component: calender,
    },
    {
        path: '/checkIn/checkIn', 
        name: 'checkIn/checkIn',
        component: checkIn,
    },
    {
        path: '/checkIn/checkIn1', 
        name: 'checkIn/checkIn1',
        component: checkIn1,
    },
    {
        path: '/checkIn/checkIn2', 
        name: 'checkIn/checkIn2',
        component: checkIn2,
    },
    {
        path: '/checkIn/checkIn3', 
        name: 'checkIn/checkIn3',
        component: checkIn3,
    },
    {
        path: '/coupon/coupon', 
        name: 'coupon/coupon',
        component: coupon,
    },
    {
        path: '/ordering/ordering', 
        name: 'ordering/ordering',
        component: ordering,
    },
    {
        path: '/ordering/orderingUndone', 
        name: 'ordering/orderingUndone',
        component: orderingUndone,
    },
    {
        path: '/pay/pay', 
        name: 'pay/pay',
        component: pay,
    },
    {
        path: '/houseList/houseList', 
        name: 'houseList/houseList',
        component: houseList,
    },
    {
        path: '/pay/payPassword', 
        name: 'pay/payPassword',
        component: payPassword,
    },
    {
        path: '/pay/paySuccess', 
        name: 'pay/paySuccess',
        component: paySuccess,
    }, {
        path: '/pay/payWait', 
        name: 'pay/payWait',
        component: payWait,
    }, {
        path: '/pay/payResult', 
        name: 'pay/payResult',
        component: payResult,
    },
    {
        path: '/myCenter/myCenter', 
        name: 'myCenter/myCenter',
        component: myCenter,
    }
    ,
    {
        path: '/pay/memberRecharge', 
        name: 'pay/memberRecharge',
        component: memberRecharge,
    }


    ,
    {
        path: '/marketing/saleCoupon', 
        name: 'marketing/saleCoupon',
        component: saleCoupon,
    }  ,
    {
        path: '/marketing/saleCoupon2', 
        name: 'marketing/saleCoupon2',
        component: saleCoupon2,
    }  ,
    {
        path: '/marketing/secondKill', 
        name: 'marketing/secondKill',
        component: secondKill,
    },
    {
        path: '/marketing/marketing', 
        name: 'marketing/marketing',
        component: marketing,
    }
    ,
    {
        path: '/marketing/couponPay', 
        name: 'marketing/couponPay',
        component: couponPay,
    } ,
    {
        path: '/marketing/joinGroup', 
        name: 'marketing/joinGroup',
        component: joinGroup,
    },
    {
        path: '/marketing/share', 
        name: 'marketing/share',
        component: share,
    },
    {
        path: '/calender/calenderMarket', 
        name: 'calender/calenderMarket',
        component: calenderMarket,
    },
    {
        path: '/marketing/couponDetail', 
        name: 'marketing/couponDetail',
        component: couponDetail,
    },
    {
        path: '/h5Coupon/getCoupon', 
        name: 'h5Coupon/getCoupon',
        component: getCoupon,
    },
    {
        path: '/h5Coupon/couponSuccess', 
        name: 'h5Coupon/couponSuccess',
        component: couponSuccess,
    },{
        path: '/orderList/activityOrder', 
        name: 'orderList/activityOrder',
        component: activityOrder,
    },
]
