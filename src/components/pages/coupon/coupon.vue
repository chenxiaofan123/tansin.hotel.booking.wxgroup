<template>
    <div class="tansincontent">
        <van-radio-group v-model="radio" class="couponList" v-if='cuponList' v-for='(item,index) in cuponList.validCoupons' :key = 'index'>
            <div class="list blue"  @click="getCopunId(item.couponId,item.type,item.validCodes[0].code,item.value)" >
                <!-- <van-radio :name="index" icon-size="25" checked-color="#fff" ></van-radio> -->
                <span class="discount">{{item.title}}</span>
                <span class="money"><span>￥</span>{{item.value}}</span>
                <div class="detail">
                    <span>有效期：{{item.startDate}}-{{item.validCodes[0].endDate}}</span>
                    <span v-if="item.threshold>0">满:{{item.threshold}}可用</span>
                     <span v-if="item.threshold<=0">无限制</span>
                    <!-- <span>仅限APP、微信、微信小程序使用</span> -->
                </div>
                <!-- 背景 -->
                <!-- <span class="oneCircle"></span>
                <span class="twoCircle"></span>
                <span class="threeCircle"></span> -->
            </div>
            <!-- <div class="list orange">
                <van-radio name="2" icon-size="25" checked-color="#fff"></van-radio>
                <span class="discount">优惠券</span>
                <span class="money"><span>￥</span>20</span>
                <div class="detail">
                    <span>有效期：2019/08/06</span>
                    <span>仅限APP、微信、微信小程序使用</span>
                </div> 
                <span class="oneCircle"></span>
                <span class="twoCircle"></span>
                <span class="threeCircle"></span>
            </div> 
            <div class="list purple">
                <van-radio name="3" icon-size="25" checked-color="#fff"></van-radio>
                <span class="discount">优惠券</span>
                <span class="money"><span>￥</span>20</span>
                <div class="detail">
                    <span>有效期：2019/08/06</span>
                    <span>仅限APP、微信、微信小程序使用</span>
                </div>
                <span class="oneCircle"></span>
                <span class="twoCircle"></span>
                <span class="threeCircle"></span>
            </div>
            <div class="list">
                <span class="discount">优惠券</span>
                <span class="money"><span>￥</span>20</span>
                <div class="detail">
                    <span>有效期：2019/08/06</span>
                    <span>仅限APP、微信、微信小程序使用</span>
                </div>
                <span class="oneCircle"></span>
                <span class="twoCircle"></span>
                <span class="threeCircle"></span>
            </div>
            -->
        </van-radio-group>
    <div v-if='!cuponList.validCoupons||cuponList.validCoupons.length==0' style="
    margin: auto;
    text-align: center;
    margin-top: 20px;
    color: #999;
">无可用优惠券</div>
    </div>
</template>

<script>
import Vue from 'vue'
import { RadioGroup, Radio } from 'vant';
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'coupon',
   data () {
    return {
       radio: '1',
       cuponList:{
           validCoupons:null
       },
       allMoney:null,
       roomTypeCode:null,
       rateCode:null,
       checkIn:null,
       checkOut:null,
       orderInfo:null,
       isShowAll:null,
       isHourRoom:null
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
      getCopunId(couponId,type,code,buyMoney){
           this.$router.replace({
                 path: "/ordering/ordering",
            query:{
                roomTypeCode:this.roomTypeCode,
                rateCode:this.rateCode,
                checkIn:this.checkIn,
                checkOut:this.checkOut,
                couponType:type,
                couponId:couponId,
                couponCode:code,
                couponUseMoney:buyMoney,
                isHourRoom:this.isHourRoom
            }
         });
          console.log(couponId+'优惠券id',type,code+'券吗')
      },
    getCupon(){
      let that = this;
      let param = {
        isShowAll: this.isShowAll,
        allMoney: this.allMoney ,//订单金额
      }; //请求参数
      axiosurlService.queryCoupon(param).then(response => {
        let responseData = response.data;
          if (responseData.success == true) {
               
              that.cuponList = responseData.data;
              console.log( that.cuponList)
          } else {
            this.$toast(responseData.message);
          } 
      });
          
    },
     
    
  },
  mounted() {
        this.allMoney = this.$route.query.allMoney;
        this.roomTypeCode = this.$route.query.roomTypeCode;
        this.rateCode = this.$route.query.rateCode;
        this.checkOut = this.$route.query.checkOut;
        this.checkIn = this.$route.query.checkIn;
        this.isShowAll = this.$route.query.isShowAll;
        this.isHourRoom=this.$route.query.isHourRoom;
      this.getCupon()
  }
}
</script>

<style lang='less' src='./less/coupon.less'>

</style>

