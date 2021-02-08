<template>
    <div class="tansincontent">
        <div class="orderingUndone" v-if='orderDetail'>
            <div class="undoneTop">
                <img class="img" src="./images/bg.png"/>
                <div class="topBox">
                    <h2>{{orderDetail.hotelName}}<van-icon class="arrowR" size="12px" name="arrow" /><span class="topMoney">￥{{orderDetail.totalAmount}}</span></h2>
                    <div class="titleShare">
                      <div class="hotelTitle">
                        <p>{{orderDetail.hotelAddress}}</p>
                        <p>联系电话：{{orderDetail.hotelTel}}</p>
                      </div>
                      <div v-if="shareShow" class="shareBtn fr" @click="markShows"><img src="./images/share.png" alt=""></div>
                    </div>
                    <ul class="tabList">
                        <li v-if="(orderDetail.state==0||orderDetail.state==1)&&orderDetail.payResult==0" @click="cancleOrder()">取消订单</li>
                        <li v-if="orderDetail.payResult==0&&orderDetail.state==0" class="current" @click="goPay()">立即支付</li>
                    </ul>
                </div>
            </div>
            <div class="orderDetailOne">
                <!-- <div class="posi">
                    <img class="house" src="./images/house.png"/>
                    <van-cell title="提前选好房" label="房间数量有限，请提前选择优先入住" />
                    <van-button class="choose">去选房</van-button>
                </div> -->
                <van-cell title="房型" :value="orderDetail.roomTypeName" />
                <van-cell title="入住日期" :value="orderDetail.checkInDate" />
                <van-cell title="离店日期" :value="orderDetail.checkOutDate" />
                <van-cell v-if="orderDetail.checkInType!=1"  title="入住天数" :value="orderDetail.days" />
                <van-cell v-if="orderDetail.checkInType==1" title="入住小时" :value="orderDetail.hours" />

                <van-cell title="入住人" :value="orderDetail.revUser" />
                <van-cell title="入住人电话" :value="orderDetail.mobile" />
                <van-cell title="应付金额" :value="orderDetail.actualAmount" />
                <van-cell title="折扣金额" :value="orderDetail.discountAmount" />
                <van-cell title="已用优惠券" :value="orderDetail.usedCoupon.couponTitle" v-if="orderDetail.usedCoupon!=null" />
                <van-cell title="券抵用金额" :value="orderDetail.usedCoupon.couponUseMoney" v-if="orderDetail.usedCoupon!=null" />
            </div>
            <div class="orderDetailTwo">
                <!-- <van-cell title="到店时间" :value="orderDetail.lastTime" /> -->
                <!-- <van-cell title="房间偏好" value="无" /> -->
                <van-cell title="早餐" :value="orderDetail.breakfast!=0?orderDetail.breakfast+'份':'无'" />
                <!-- <van-cell title="发票" value="不需要" /> -->
                <!-- <van-cell title="其他要求" :value="orderDetail.remark" /> -->
                <van-cell title="预订单号" :value="orderDetail.orderNo" />
                <van-cell title="订单号" :value="orderDetail.revNo" />
            </div>
        </div>
        <div class="maskUp" v-if="markShow">
          <!-- <img src="./images/mask.png" alt=""> -->
          <div class="markHide" @click="markHide"></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Icon,Button } from 'vant'
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: '',
   data () {
    return {
        orderDetail:null,
        orderId:null,
        orderNo:null,
        groupCode: "",
        markShow:false,
        shareShow:true,
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
      cancleOrder(){
        let that = this;
        let param = {
            orderId:that.orderId, //查询条数

        }; //请求参数
        axiosurlService.cancleOrder(param).then(response => {
          let responseData = response.data;
          if (responseData.success == true) {
             that.$router.push({
                path: "/orderList/activityOrder",
            });
          } else {
            that.$toast("取消失败，请联系酒店"+responseData.message);
          }
        });
      },
      getorderdetail(){
        let that = this;
        let param = {
            orderId:that.orderId, //订单id
        }; //请求参数
        axiosurlService.getorderdetail(param).then(response => {
          let responseData = response.data;
          if (responseData.success == true) {
            
            that.orderDetail = responseData.data; //酒店banner
            that.orderNo=responseData.data.orderNo;
            var url=responseData.data.shareUrl;
            var roomTypeImage=responseData.data.roomTypeImage;
            if (roomTypeImage==null||roomTypeImage=="") {
              roomTypeImage="http://sandboxbooking.saaspms.com/home/image?id=***5da544839328a11a748d7bd8"
            }
            debugger
            that.shareSetting(url,true,roomTypeImage);
            if (responseData.data.shareUrl==null) {
              that.shareShow=false;
            }
          } else {
            that.$toast(responseData.message);
          }
        });
      },
      goPay(id){
        let that = this;
        that.$router.push({
            path: "/pay/pay",
            query:{
                orderNo:that.orderNo
            }
        });
      },
    
     forbidback(){
      let that = this;
      that.$router.push({
        path: "/orderList/getorderdetail",
      });
    },

    //分享
    shareSetting(url,showMenu,roomTypeImage) {

      // if (!url) {
      //   url = location.href.split("#")[0];
      // }
      var pars = "?url=" + location.href.split("#")[0];
      axiosurlService.getBaseAppInfo(pars).then((rs) => {
        console.log(rs.data.data);
        wx.config({
          debug: false,
          appId: rs.data.data.appId,
          timestamp: rs.data.data.timestamp,
          nonceStr: rs.data.data.noncestr,
          signature: rs.data.data.signature,
          jsApiList: [
            "updateAppMessageShareData",
            "updateTimelineShareData",
            "hideMenuItems",
            "showMenuItems",
            "hideAllNonBaseMenuItem",
          ],
        });
      })
        .catch((error) => {
          window.console.log(error);
        });
      wx.error(function (res) {
        console.log("error:" + res);
      });
      wx.ready(function () {
       
          wx.hideAllNonBaseMenuItem();
          // wx.hideMenuItems({
          //   menuList: ["menuItem:copyUrl"],
          // });
      
          wx.showMenuItems({
            menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"], // 显示分享
          });

        //微信好友
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: "天馨酒店团购活动进行中", // 分享标题
          desc: "您的朋友邀请您参加团购，点击连接参加活动~~", // 分享描述
          link: url, // 分享链接，
          imgUrl:roomTypeImage,// 分享图标
          success: function () {
            // 设置成功
          },
        });

        //朋友圈
        wx.updateTimelineShareData({
          title: "天馨酒店团购活动进行中~~", // 分享标题
          link: url, // 分享链接，
          imgUrl:roomTypeImage,// 分享图标
          success: function () {
            // 设置成功
          },
        });
      });
    },
   
    markShows(){
      this.markShow=true
    },
    markHide() {
      this.markShow = false;
    }

  },
  mounted() {
    this.orderId = this.$route.query.orderId;
    this.groupCode = this.$route.query.pid;
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', this.forbidback);
    this.getorderdetail();
  }
}
</script>

<style lang='less' src='./less/orderingUndone.less'>

</style>
<style scoped>
  .tansincontent{
    min-height: 100vh;
}
.maskUp{
    position: absolute;
    z-index: 22;
    top: 0;
    left: 0;
    /* background-color: rgba(0, 0, 0, 0.8); */
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-image: url(./images/mask.png);
    background-repeat: no-repeat;
    background-size: cover;
}
.maskUp img{
    max-width: 100%;
}
.markHide{
    /* border: 1px solid #fff; */
    width: 130px;
    height: 80px;
    margin: 0 auto;
    position: absolute;
    bottom: 13%;
    left: 33%;
}
</style>

