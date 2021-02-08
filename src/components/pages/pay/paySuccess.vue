<template>
    <div class="tansincontent">
        <!-- <v-header titles='优惠券' isshow='yes'></v-header> -->
        <div class="payPassword">
            <div class="icon"><img src="./images/iconSuccess.png"/></div>
            <div class="title">{{payMsg}}</div>
            <div class="status">
                {{payMsg}}
            </div>
            <div class="money">￥<span>{{amount}}</span></div>
           <van-row type="flex" justify="space-around">
              <van-button plain  class="submit1"  @click="goOrderDetail()">查看订单</van-button> 
              <van-button plain  class="submit2" @click="goHotel()">返回酒店</van-button>
            </van-row>
        </div>
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
       checked1:false,
       checked2:true,
       orderNo:null,

        orderId:null,
       amount:0,
       payMsg:"",
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
    getSuccessInfo(){
        let that = this;
            let param = {
                orderNo:that.orderNo
            };
            axiosurlService.getsuccessinfo(param).then(response => {
                let responseData = response.data;
                if (responseData.success == true) {
                    var returnData=responseData.data;
                    that.amount=returnData.actualAmount;
                   that.orderId=returnData.id;    

                    let payMethod=returnData.payMethod;
                    switch (payMethod) {
                        case 0:
                            that.payMsg="微信支付成功!";
                            break;
                       case 1:
                            that.payMsg="会员支付成功!";
                            break;
                           case 2:
                            that.payMsg="在线预订成功!";
                            break;    
                        default:
                            break;
                    }
                         
                 
                } else {
                this.$toast(responseData.message);
                }
            });
    },

    goOrderDetail(){
         let that = this;
           
                   that.$router.replace({
                    path: "/ordering/orderingUndone", 
                    query:{
                         orderId:that.orderId
                    } });
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
   
      this.orderNo=this.$route.query.orderNo;

      var success=this.$route.query.success;
     if(success)
     {
          this.getSuccessInfo();
     }
     
  }
}
</script>

<style lang='less' src='./less/paySuccess.less'>

</style>

