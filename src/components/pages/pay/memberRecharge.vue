<template>
    <div class="tansincontent" style='background:#fff'>
        <!-- <v-header titles='优惠券' isshow='yes'></v-header> -->
        <div class="payPassword">
            <div class="title">会员卡储值</div>
            <div class="card">
                <div  class="cardTitle">会员卡</div>
                <div>卡号：{{carNO}}</div>
                <div>余额：{{balance}}</div>
                <div>积分：{{score}}</div>
            </div>
            <div class="status">
                选择充值金额
            </div>        
           <div class="payBottom" >            
               <van-radio-group class="cellBox" v-model="radio">                  
                    <van-cell-group  v-for="(item,index) in ruleList" :key='index'>
                        <van-cell >
                           充¥{{item.limitMoney}}送¥{{item.givingMoney}}
                           <van-radio slot="right-icon"  :name="index"  @click="selectThis(item)"  />
                        </van-cell>
                     </van-cell-group>           
                 </van-radio-group>
               
                <van-button class="submit" @click="memberPay()">立即充值</van-button>
            </div>
           
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
       amount:0,
       giveamount:0,
       balance:0,
       packageId:'',
       ifSubmit:false,
        show:false,
        ruleList:[],
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
      getCrmRechargeInfo(){
          debugger;
    let that = this;
          
            axiosurlService.getRechargeDisplay().then(response => {
                let responseData = response.data;
                if (responseData.success == true) {
                    var returnData=responseData.data;
                    that.carNO=returnData.cardNo;
                    that.balance=returnData.balance;
                    that.score=returnData.score;
                    that.ruleList=returnData.ruleList;                 
                } else {
                this.$toast(responseData.message);
                that.$router.push({
                        path:'/myCenter/myCenter',
                    })
                }
            });
      },
        selectThis(item) {
            debugger;
        let that = this;
        that.amount = item.limitMoney;
        that.giveamount = item.givingMoney;
        that.packageId=item.savingRuleId;
    },
      memberPay()
      {
          let that = this;
          if(that.ifSubmit) return;
          if(that.packageId=="" || that.packageId==undefined || that.packageId==null)
          {

                that.$toast("请选择充值项！！！");
                return;
          }
         that.ifSubmit=true;
         that.show=true;
           let data = {
                amount:that.amount, 
                giveamount:that.giveamount, 
               packageI:that.packageId
            };
          
          axiosurlService.crmrecharge(data).then(response => {
    
                 if(response.data!=undefined)
                 {

  let responseData = response.data;
                 if (responseData.success == true) {

                        window.location.href=responseData.data;
                } else {
                   
                      that.$toast(responseData.message);
                }
                 }
             
                    that.ifSubmit=false;
                    that.show=false;
             });
      }
  },
  mounted() {
        
    
      this.getCrmRechargeInfo()
  }
}
</script>

<style lang='less' src='./less/memberRecharge.less'>

</style>

