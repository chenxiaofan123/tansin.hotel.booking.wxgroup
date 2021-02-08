<template>
    <div class="tansincontent" style='background:#fff'>
        <!-- <v-header titles='优惠券' isshow='yes'></v-header> -->
        <div class="payPassword">
            <div class="title">储值卡支付</div>
            <div class="card">
                <div  class="cardTitle">储值卡</div>
                <div>卡号：{{carNO}}</div>
                <div>余额：{{balance}}</div>
                <div>积分：{{score}}</div>
            </div>
            <div class="status">
                待支付
            </div>
            <div class="money">￥<span>{{amount}}</span></div>
            <div class="password">
                <input type="password"  v-model="pwd"  placeholder="请输入支付密码"/>
            </div>
            <van-button class="submit"  @click="memberPay()">确定</van-button>
           
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
       amount:0,
       pwd:"",
       balance:0,
       ifSubmit:false,
        show:false,
       score:0,
       encryptionKey:"",
       carNO:"",
       orderNo:""
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
      getOrderPayInfo(){
          debugger;
    let that = this;
            let param = {
                orderNo:that.orderNo,
                payType:1 
            };
            axiosurlService.getorderinfo(param).then(response => {
                let responseData = response.data;
                if (responseData.success == true) {
                    var returnData=responseData.data;
                    that.amount=returnData.amount;
                    that.carNO=returnData.cardNo;
                    that.balance=returnData.balance;
                    that.score=returnData.score;
                    that.encryptionKey=returnData.encryptionKey;
                 
                } else {
                this.$toast(responseData.message);
                }
            });
      },
      memberPay()
      {
          let that = this;
          if(that.ifSubmit) return;
         that.ifSubmit=true;
         that.show=true;
           let data = {
                orderNo:that.orderNo, 
                payType:1,
                pwd:that.pwd,
                amount:that.amount,
                cardNo:that.carNO,
                encryptionKey: that.encryptionKey
            };
          
          axiosurlService.orderpay(data).then(response => {

                  let responseData = response.data;

                 if (responseData.success == true) {

                         that.$toast("支付成功"); 
                          this.$router.replace({
                path: "/pay/paySuccess", 
                query:{
                         orderNo:that.orderNo,
                         success:true
                    }
             });

                } else {
                      that.ifSubmit=false;
                       that.show=false;
                      that.$toast(responseData.message);
                }
             });
      }
  },
  mounted() {
        
      this.orderNo = this.$route.query.orderNo
      this.getOrderPayInfo()
  }
}
</script>

<style lang='less' src='./less/payPassword.less'>

</style>

