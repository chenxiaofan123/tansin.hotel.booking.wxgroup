<template>
  <div class="myContent" >
      <div class="inputContent clearfix">
          <div class="fl infl">姓名</div>
           <div class="fl infr">
               <input class='name' type="text" v-model="name" placeholder="请输入真实姓名"/>
           </div>
      </div>
      <div class="tip">
          <img src='./images/tip.png'/>确保与证件保持一致
      </div>
      <div class="button" @click='modifyuser'>
          保存
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'index',
   data () {
    return {
       mobile:null,
       name:null,
       sex:null,
       birthDay:null,
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
     
     getUserInfo(){
         debugger;
          let that = this;
          axiosurlService.userinfo().then(response => {
            let responseData = response.data;
                console.log(responseData)
                if(responseData.success == true) {
                    var data=responseData.data;
                  that.mobile=data.mobile,
                  that.name=data.name,
                  that.sex=data.sex,
                  that.birthDay=data.birthDay
                  
                } else {
                    this.$toast(responseData.message);
                }
			 })

     },

    modifyuser(){
         let that = this;
         if(!that.name){
              that.$toast("请输入姓名");
              return;
         }
         let param = {
             mobile:that.mobile,
             name:that.name,
             sex:that.sex,
             birthDay:that.birthDay

         } //请求参数
     	axiosurlService.modifyuser(param).then(response => {
            let responseData = response.data;
                console.log(responseData)
                if(responseData.success == true) {
                   that.$router.push({
                        path:'/myCenter/myCenter',
                    })
                } else {
                    this.$toast(responseData.message);
                }
			 })
    }
 
  },
  mounted() {
      this.getUserInfo()
			
	}
}
</script>

<style lang='less' src='./less/my.less'>
</style>

