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
              <van-button plain  class="submit1"  @click="goOrderDetail()">{{buttonText}}</van-button> 
              <van-button plain  class="submit2" @click="goHotel()">返回酒店</van-button>
            </van-row>
        </div>
         <van-overlay :show="show"  >
             <div style="height:100%;vertical-align: middle">

               <van-loading type="spinner" class="wrapper" style="margin-top:300px; text-align: center" color="#1989fa" /> 
            
             </div>
          
        </van-overlay>
    </div>
    
</template>

<script>
import Vue from 'vue'
import { Overlay } from 'vant';
import { Loading } from 'vant';
Vue.use(Overlay);
Vue.use(Loading);
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
       ifsuccess:false,
       show:true,
       encryption:"",
        orderId:null,
       amount:0,
       payMsg:"",
       buttonText:"重新支付",
       result:"",
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
                orderNo:that.orderNo,
                encryption:that.encryption
            };
            axiosurlService.getwxpayinfo(param).then(response => {
               
                let responseData = response.data;
                if (responseData.success == true) {
                    var returnData=responseData.data;
                    that.amount=returnData.actAmount;
                    that.orderId=returnData.id; 
                     that.payMsg="支付成功!";
                     if( that.orderId=="")
                     {
                       this.buttonText="我的";
                     }
                } else {
                this.$toast(responseData.message);
                 that.payMsg="支付失败!";
                }
                 this.show=false;
            });
    },

    goOrderDetail(){
         let that = this;
           if(that.buttonText=="重新支付")
           {
               that.repay();
           }
             if(that.buttonText=="我的")
           {  
               if( that.orderId=="")
                     {
                           var router="/myCenter/myCenter";
                      that.$router.replace({
                          path: router, query: {                
                          }});
                     }
           }
           if(that.buttonText=="查看订单")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
           {
                that.$router.replace({
                path: "/ordering/orderingUndone", 
                query:{
                        orderId:that.orderId
                } });
           }
                  
    },
      weixinpay1(){
       debugger;
    let that = this;
      let param = {
        orderNo: that.orderNo, //订单id
        payType: 0
      }; //请求参数
      axiosurlService.getorderinfo(param).then(response => {
          debugger;
        let responseData = response.data;
         this.show=false;
        if (responseData.success == true) {
           debugger;            
           let data = responseData.data;
           window.localStorage.removeItem("orderNo");
           window.localStorage.removeItem("encryptionKey");
            window.localStorage.setItem("orderNo", data.orderNo); //存入usertoken
            window.localStorage.setItem("encryptionKey", data.encryptionKey); 
           data.payType = that.payType;
           var orderNo =window.localStorage.getItem("orderNo");
           var encryptionKey =window.localStorage.getItem("encryptionKey");      
          if(data.statusCode==0)
           {
               window.location.href=data.data;
           }
          if(data.statusCode==1)
           {
             let porderinfo = 
            {
                EncryptionKey:data.encryptionKey,
                OrderNo:data.orderNo,
                PayType:0,
                CardNo : data.data
            };
               axiosurlService.orderpay(porderinfo).then(response => {
                  let responseData = response.data;
                   if(responseData.success)
                        {
                           window.location.href=responseData.data;
                        }
                        else
                        {
                            this.$toast(responseData.message);
                        }
                });
           }
        } else {
          that.$toast(responseData.message);
        }
      });
    
    },
      repay(){
       debugger;
    let that = this;
      this.show=true;
      let param = {
        OrderCode: that.orderNo, //订单id
       
      }; //请求参数
      axiosurlService.wxrepay(param).then(response => {
          debugger;
        let responseData = response.data;
         this.show=false;
        if (responseData.success == true) {
           debugger;            
           let data = responseData.data;    
           
            
          window.location.href=data;
         
        } else {
          that.$toast(responseData.message);
        }
      });
    
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
   goMycenter(){
         let that = this;
         var router="/myCenter/myCenter";
     that.$router.replace({
                    path: router, query: {
                
                  }});
 
  },
  mounted() {
   
      this.orderNo=this.$route.query.orderNo;
      this.encryption=this.$route.query.encryption;
      this.result=this.$route.query.result;
       switch (this.result) {
            case "ok":
            this.buttonText="查看订单";
                this.getSuccessInfo();
                break;
            case "cancel":
                this.payMsg="支付取消!";
                this.show=false;
                break;
                case "fail":              
                this.payMsg="支付失败!";
                  this.show=false;
                break;    
            default:
                break;
        }
     
  }
}
</script>

<style lang='less' src='./less/paySuccess.less'>

</style>
