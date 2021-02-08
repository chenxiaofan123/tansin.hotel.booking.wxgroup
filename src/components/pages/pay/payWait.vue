<template>
    <div class="tansincontent">
     系统正在请求中请稍后
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
         openid:null,
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {

    goOrderDetail(){
         let that = this;
           
                   that.$router.replace({
                    path: "/ordering/orderingUndone", 
                    query:{
                         orderId:that.orderId
                    } });
    },
      

  },
  mounted() {
   
      this.openid=this.$route.query.openid;
      var success=this.$route.query.success;
     if(success)
     {
         if(this.openid!="" && this.openid!=null &&this.openid!=undefined)
         {
                 var orderNo =window.localStorage.getItem("orderNo");
                var encryptionKey =window.localStorage.getItem("encryptionKey");                
            let porderinfo = 
            {
                EncryptionKey: encryptionKey,
                OrderNo :orderNo,
                PayType : 0,
                CardNo:this.openid
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
     }
     
  }
}
</script>

<style lang='less' src='./less/paySuccess.less'>

</style>

