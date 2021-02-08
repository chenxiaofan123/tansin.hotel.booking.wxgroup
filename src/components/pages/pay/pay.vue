<template>
    <div class="tansincontent">
        <!-- <v-header titles='优惠券' isshow='yes'></v-header> -->
        <div class="payBox">
            <div class="payTop">
                <h2>订单总价：￥{{totalamount}}</h2>
                <span>还需支付</span>
                <span><b>￥</b>{{amount}}</span>
                <span>已用优惠券抵￥{{couponamount}}，折扣￥{{discount}}</span>
               <!-- <span class="pclose" @click='goOrderList()'>关闭</span>  -->
            </div>
            <!-- <div class="payCenter">
                <div class="cenerWord">
                    <span>积分</span>
                    <span>0</span>
                </div>
                <van-switch
                v-model="checked1"
                active-color="#65708c"
                inactive-color="#65708c"
                />
                <div class="cenerWord">
                    <span>储值</span>
                    <span>￥0</span>
                </div>
                <van-switch
                v-model="checked2"
                active-color="#65708c"
                inactive-color="#65708c"
                />
            </div> -->
            <div class="payBottom" >
              
                <!-- <van-radio-group class="cellBox" v-model="radio">
                    <img class="iconP" src="./images/icon-1.png"/>
                    <van-cell value="微信支付" />
                    <van-radio checked-color="#65708c" class="radioP" icon-size="21px" name="1"></van-radio>
                </van-radio-group>
                <van-radio-group class="cellBox" v-model="radio">
                    <img class="iconP" src="./images/icon-2.png"/>
                    <van-cell value="支付宝支付" />
                    <van-radio checked-color="#65708c" class="radioP" icon-size="21px" name="2"></van-radio>
                </van-radio-group>
                <van-radio-group class="cellBox" v-model="radio">
                    <img class="iconP" src="./images/icon-3.png"/>
                    <van-cell value="银联支付" />
                    <van-radio checked-color="#65708c" class="radioP" icon-size="21px" name="3"></van-radio>
                </van-radio-group> -->
            
                      
               <van-radio-group class="cellBox" v-model="radio">
                  
                    <van-cell-group  v-for="(item,index) in Paymethods" :key='index'>
                        <van-cell >
                           {{item.type}}
                           <van-radio slot="right-icon"  :name="item.type"  @click="selectThis(item.code)"  />
                        </van-cell>
                     </van-cell-group>           
                 </van-radio-group>
               
                <van-button class="submit" @click="goPay()">立即支付</van-button>
            </div>
        </div>
           
 <van-popup v-model="show" style="width:80%;border-radius:8px">

     <div style="height:300px;align-self: center"  >
        <!-- <h2  class="EquityTips">温 馨 提 示：</h2> -->
                  <h2  class="EquityTitle">完成预付您将享受</h2>
                  <h2  class="EquityContent">● 保留房间至离店日12：00</h2>
                  <h2  class="EquityContent">● 到店无需交付押金，快速入住</h2>
        <van-row type="flex" justify="space-around">
              <van-button plain  class="submit1"  @click="popupcolse()">继续支付</van-button> 
              <van-button plain  class="submit2" @click="goHotel()">继续退出</van-button>
            </van-row>
      </div>
 </van-popup>
       <van-overlay :show="showloading"  >
             <div style="height:100%;vertical-align: middle">

               <van-loading type="spinner" class="wrapper" style="margin-top:300px; text-align: center" color="#1989fa" /> 
            
             </div>
        </van-overlay>
    
    </div>

</template>

<script>
import Vue from "vue";
import { Overlay } from 'vant';
import { Loading } from 'vant';
Vue.use(Overlay);
Vue.use(Loading);
import { Dialog } from 'vant';
import { Popup } from 'vant'
import { RadioGroup, Radio } from "vant";
import axiosurlService from "../../../resource/axiosurlService";
export default {
  name: "coupon",
  data() {
    return {
      radio: "1",
      checked1: false,
      checked2: true,
      orderNo: null,
      show:false,      
      amount: 0,
      totalamount: 0,
      couponamount: 0,
      discount: 0,
      payType: -1,
      Paymethods: [],
      showloading:false,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
 
  watch: {},
  methods: {
      goOrderList(){

          let that = this;
           that.show=true;

        // let that = this;
        // that.$router.push({
        //      path: "/orderList/orderList",
        // });
      },
    getPaymethod() {
      let that = this;
      let param = {
        orderNo: that.orderNo
      };
      axiosurlService.getPaymethod(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          var returnData = responseData.data;
          that.amount = returnData.amount;
          that.totalamount = returnData.totalAmount;
          that.couponamount = returnData.couponAmount;
          that.discount = returnData.discountAmount;
          that.Paymethods = returnData.payMethod;
         
        } else {
          this.$toast(responseData.message);
        }
      });
    },
popupcolse(){
   let that = this;
           that.show=false;
              history.pushState(null, null, document.URL)
},
    goPay() {
      let that = this;

      switch (that.payType) {
        case -1:
          this.$toast("请选择正确的支付方式");
          break;
        case 0: //微信付
        that.weixinpay();
          break;

        case 1: //会员付
          that.memberPay();
          break;
        case 2: //到店付
          that.shopPay();
          break;
          case 5: //微信扫码付
          that.offlinePayInfo();      
          break;
      }
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
        that.$router.replace({path: router, query: {
                    isgroup: isgroup
                  }});
   },
   forbidback(){
    this.goOrderList();
   },
    selectThis(code) {
      let that = this;
      that.payType = code;
    },
    weixinpay(){
       debugger;

    let that = this;
    that.showloading=true;
      let param = {
        orderNo: that.orderNo, //订单id
        payType: that.payType
      }; //请求参数
      axiosurlService.getorderinfo(param).then(response => {
          debugger;
        let responseData = response.data;
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
                            that.showloading=false;
                        }
                });
           }
        } else {
          that.$toast(responseData.message);
          that.showloading=false;
        }
      });
    
    },
 offlinePayInfo(){
       debugger;
    let that = this;
    that.showloading=true;
      let param = {
        orderNo: that.orderNo, //订单id
        payType: that.payType
      }; //请求参数
      axiosurlService.getorderinfo(param).then(response => {
          debugger;
        let responseData = response.data;
        if (responseData.success == true) {
           debugger;            
           let data = responseData.data;         
           data.payType = that.payType;
          var encryptionKey =data.encryptionKey;  
          var payCode= data.paycode;
          let porderinfo = 
          {
              EncryptionKey:data.encryptionKey,
              OrderNo:data.orderNo,
              PayType:5,
              Amount:data.amount,
              Paycode:payCode
          };
          axiosurlService.orderpay(porderinfo).then(response => {
            let responseData = response.data;
              if(responseData.success)
                  {
                    var rdata=responseData.data;
                     console.log(rdata.payindex);
                      window.location.href=rdata.payindex;
                  }
                  else
                  {
                      this.$toast(responseData.message);
                      that.showloading=false;
                  }
          });
         
        } else {
          that.$toast(responseData.message);
          that.showloading=false;
        }
      });
    
    },
    memberPay() {
      debugger;
      let that = this;
      that.showloading=true;
      that.$router.push({
        path: "/pay/payPassword",
        query: {
          orderNo: that.orderNo
        }
      });
    },
   
    shopPay() {
      let that = this;
      let param = {
        orderNo: that.orderNo, //订单id
        payType: that.payType
      }; //请求参数
      that.showloading=true;
      axiosurlService.getorderinfo(param).then(response => {
          debugger;
        let responseData = response.data;
        if (responseData.success == true) {
          debugger;
          let data = responseData.data;
          data.payType = that.payType;
          axiosurlService.orderpay(data).then(response => {
            let responseData = response.data;

            if (responseData.success == true) {
              that.$toast("预订成功");
              this.$router.push({
                path: "/pay/paySuccess", 
                query:{
                         orderNo:that.orderNo,
                          success:true
                    }
              }); 
            } else {
                 that.showloading=false;
              that.$toast(responseData.message);
           
            }
          });
        } else {
             that.showloading=false;
          that.$toast(responseData.message);
        }
      });
    }
  },
    // beforeDestroy(){
    //    alert("DSDAS");
    //                   //销毁
    //                   window.removeEventListener('popstate',this.forbidback);
    //               },
  mounted() {
    this.orderNo = this.$route.query.orderNo;
    this.getPaymethod();
    this.show=false;
      history.pushState(null, null, document.URL)
       window.addEventListener('popstate', this.forbidback);
    //    window.addEventListener('popstate',  function(e) {
    //      debugger;
    //   alert("DSDAS");
   
    // });
  }
};
</script>

<style lang='less' src='./less/pay.less'>
</style>

