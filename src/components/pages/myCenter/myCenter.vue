<template>
    <div class="tansincontent">
        <!-- <v-header titles='会员中心' isshow='yes'></v-header> -->
        <div class="myCenter" v-if='userInfo'>
            <div class="topBox">
                <div class="topBoxImg">
                    <div class="cardBox" >
                        <div class="detailBox">
                            <img class="head" src="./images/user.png" />
                            <span>尊敬的用户：【{{userInfo.userName}}】</span>
                            <div class="edit" @click="changeName()">
                                <img src="./images/edit.png" />
                            </div>
                        </div>
                        <div class="vipName">
                            <span class="type" >{{userInfo.isVip?userInfo.vipName:'非会员'}}</span>
                            <img src="./images/vip.png" alt="" v-if='userInfo.isVip'>
                            <div class="wordTip" v-if='userInfo.isVip'>卡号：{{userInfo.cardNo}}</div>
                            <div class="wrong">
                                <div class="wordTip" v-if='!userInfo.isVip'>登录即可享受尊贵特权</div>
                                <div v-if='!userInfo.isVip' class='register' @click="register"> 注册会员</div>
                            </div>
                        </div>
                        
                        <!-- <p class="wordTip">再住<span class="day">5</span>夜间可升级为金会员</p> -->
                    </div>
                    <div v-if="userInfo.isVip" class="equityBox">
                        <div class="topTitle">
                            <span></span>
                            <h2>您的权益</h2>
                            <span></span>
                        </div>
                        <ul>
                            <li v-for="(item,index) in userInfo.rights" :key='index'><span>{{item}}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="iconAll">
                <div class="topTitle">
                    <span></span>
                    <h2>我的订单</h2>
                    <span></span>
                </div>
                <ul>
                    <li @click="goOrder(0)">
                        <img src="./images/icon-1.png" />
                        <div>全部订单</div>
                    </li>
                    <li @click="goOrderActivity()">
                        <img src="./images/icon-10.png" />
                        <div>活动订单</div>
                    </li>
                    <li @click="goOrder(102)">
                        <img src="./images/icon-2.png" />
                        <div>待评论</div>
                    </li>
                    <li @click="goOrder(11)">
                        <img src="./images/icon-3.png" />
                        <div>待入住</div>
                    </li>
                </ul>
            </div>
            <div class="wallet iconAll">
                <div class="topTitle">
                    <span></span>
                    <h2>我的钱包</h2>
                    <span></span>
                </div>
                <ul v-show="isMember">
                    <li>
                        <div @click='goRecharge()'>
                            <img src="./images/icon-4.png" />
                            <span>储值</span>
                        </div>
                        <div class="bigSize"><span>￥</span>{{userInfo.balance}}</div>
                    </li>
                    <li>
                        <div>
                            <img src="./images/icon-5.png" />
                            <span>积分</span>
                        </div>
                        <div class="bigSize">{{userInfo.score}}<span> 分</span></div>
                    </li>
                    <li>
                        <div @click='goCupon()'>
                            <img src="./images/icon-6.png" />
                            <span>优惠券</span>
                        </div>
                        <div class="bigSize">{{userInfo.couponQty}}<span> 张</span></div>
                    </li>
                </ul>
            </div>
            <!-- <div class="line"></div> -->
            <!-- <div class="wallet">
                <h2 class="title"><span>我的券包</span></h2>
                <div class="iconAll">
                    <div>
                        <div>
                            <img src="./images/icon-7.png" />
                        </div>
                        <div>优惠券</div>
                        <div class="bigSize">0￥</div>
                    </div>
                    <div>
                        <div>
                            <img src="./images/icon-8.png" />
                        </div>
                        <div>早餐券</div>
                        <div class="bigSize">0￥</div>
                    </div>
                    <div>
                        <div>
                            <img src="./images/icon-9.png" />
                        </div>
                        <div>促销券</div>
                        <div class="bigSize">0￥</div>
                    </div>
                </div>
            </div> -->
            <van-button  v-show="isRecharge"  class="logOUt" @click='goRecharge()'>充值</van-button>
           
            <van-button class="logOUt" @click='loginOut'>退出当前账户</van-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Icon,Button } from 'vant'
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'ordering',
   data () {
    return {
       userInfo:null,
       isMember:false,
       isRecharge:false
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
      goCupon(){
         let that = this;
         that.$router.push({
            path: "/coupon/coupon",
            query:{
                isShowAll:true
            }
        });
      },
      goRecharge(){
         let that = this;
         if(that.isRecharge)
         {
           that.$router.push({
            path: "/pay/memberRecharge",
            query:{
                
            }
        });

         }
       
      },
   
      changeName(){
           let that = this;
            that.$router.push({
                path: "/my/my",
            });
      },
      loginOut(){
            let that = this;
            that.$router.push({
                path: "/login/login",
            });
      },
      register(){
           let that = this;
            that.$router.push({
                path: "/register/register",
            });
      },
      goOrder(state){
           let that = this;
            that.$router.push({
                path: "/orderList/orderList",
                query:{
                    state:state
                }
            });
      },
      goOrderActivity(){
           let that = this;
            that.$router.push({
                path: "/orderList/activityOrder",
                query:{
                    
                }
            });
      },
    userdetail(){
      let that = this;
      let param = {} //请求参数
     	axiosurlService.userdetail(param).then(response => {
            let responseData = response.data;
                if(responseData.success == true) {
                   that.userInfo = responseData.data //个人中心
                   that.isMember= responseData.data.isVip;
                    if(response.statusCode==100)
                    {
                       that.isRecharge=true;

                    }
                   console.log(that.userInfo)
                   console.log(that.isMember)
                } else {
                    this.$toast(responseData.message);
                }
			 })
    },
             forbidback(){
         this.goHotel();
},
   goHotel(){
         let that = this;
         var router="";
                   var isgroup =  window.localStorage.getItem("isgroup");
			  console.log(isgroup);
			  if(isgroup==0){
				  router="/houseReservation/houseReservation"
			  }else{
			  router = '/index'

			  }
     that.$router.replace({
                    path: router, query: {
                    isgroup: isgroup
                  }});
   }
  },
  mounted() {
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', this.forbidback);
      this.userdetail()
    
  }
}
</script>

<style lang='less' src='./less/myCenter.less'>

</style>

