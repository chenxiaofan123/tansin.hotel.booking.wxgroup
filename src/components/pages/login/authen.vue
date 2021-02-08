<template>
 
</template>
<script>
import Vue from 'vue'
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'authen',
   data () {
    return {
      phone: null,
      sms:null,
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {

  },
  created: function() {
   debugger;
   
    var appid = this.$route.query.appid;
    var tenantcode=this.$route.query.tenantcode;
    if(!appid||!tenantcode){
      alert("appid或者租户id不能为空");
      return;
    }
    var callbackurl =axiosurlService.getauthenwechatUrl();
    var weurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+
     appid+"&redirect_uri="+callbackurl+"&response_type=code&scope=snsapi_base&&state="+tenantcode;
    location.href=weurl;
 },

  mounted() {
			
	}
}
</script>

