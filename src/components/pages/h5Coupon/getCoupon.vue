<template>
    <div class="couponContent" style='height:100%'>
        <!--直接领取-->
        <div v-if="isLogin" style="min-width:100%;display:flex;justify-content:center;position:absolute;top:63%">
            <div class="couponTitle">
                <div class="titles">{{pmoInfo.title}}</div>
                <div class="receiveBtn" @click="getCoupon">领取优惠券</div>
                <div class="call">联系方式：{{pmoInfo.tel}}</div>
            </div>
            
        </div>
        
        <!--登录领取-->
        <div class="loginForm" v-else>
            <div class="loginInput">
                <img src="./images/user.png"/>
                <input type="tel" v-model="phone" placeholder="请输入手机号" maxlength="11" style='background:none'>
            </div>
            <div class="loginInput">
                <img src="./images/card.png"/>
                <input class="code" type="number" v-model="sms" placeholder="请输入短信动态码">
                <span class="getCode" @click="getCode()">获取验证码</span>
            </div>
            <div class="receiveBtn" @click="loginBtn">登录</div>
            <div class="tips">
                <!-- <div class="checkbox">
                    <van-checkbox type="checkbox" checked name=""></van-checkbox>
                    <label for=""></label>
                </div> -->
               <input type="checkbox" checked onclick="return false;" /> 
                <span>非会员登录后会自动创建会员账号</span>
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
import Vue from "vue";
import axiosurlService from "../../../resource/axiosurlService";
  export default {
    name:"h5Coupon",
    data() {
      return {
          openid: "",
          phone:null,
          sms:null,
          isLogin:false,
          pmoInfo:{title:"",tel:"",remark:""},
          pmoId:"",
          show:false
      };
    },
    created() {
        var tenantcode = this.$route.query.hotelcode;
        var usertoken=this.$route.query.usertoken;
        var openid =this.$route.query.openid;
        var pmoId =this.$route.query.pmoid;
        let mycmp=this.$route.query.mycmp;
        if(!tenantcode||!openid){
            //提示错误
            tenantcode = window.localStorage.getItem("tenantcode");
            openid = window.localStorage.getItem("openid");
            this.$toast("信息不匹配");
        }else{
            window.localStorage.setItem("tenantcode", tenantcode); //存入tenantcode
            window.localStorage.setItem("openid", openid); //存入openid
        }
        //window.localStorage.setItem("tenantcode",tenantcode);
        if(!usertoken){ //未登录
            this.isLogin=false;
            // this.$dialog.confirm({
            //     title: '操作提示',
            //     message: '需要登录才能领取优惠券，立即登录？'
            // })
        }else{
            this.isLogin=true;
            window.localStorage.setItem("usertoken",usertoken);
        }
        this.pmoId=pmoId;
        if(mycmp&&mycmp!=''){
            this.$router.push({
                    path: "/h5Coupon/couponSuccess?id="+mycmp,
                });
        }
     
        this.getPmoInfo(pmoId);
        
    },
    mounted() {
        this.openid = window.localStorage.getItem("openid");
        
    },
    methods: {
        async getPmoInfo(pmoid){
            const {data}=await axiosurlService.couponId({id:pmoid});
            var d =data.data;
            if(data.success){
                this.pmoInfo=d;
                document.title=d.title;
                document.tel=d.tel;
            }else{
                this.$toast(message);

            }
        },

        getCode(){
            if (this.phone == "" || this.phone == undefined) {
                this.$toast("请先输入手机号");
                return;
            }
         
             let param = {
                    mobile: this.phone,
                    type: 3
                }; //请求参数
            axiosurlService.getSmsCode(param).then(response => {
                let responseData = response.data;
                console.log(responseData);
                if (responseData != undefined) {
                if (responseData.success == true) {
                    this.$toast("验证码发送成功");
                } else {
                    this.$toast(responseData.message);
                }
                } else {
                this.$toast("系统繁忙，请重新请求");
                }
            });
            // axiosurlService.couponLogin(param).then(response => {
            //     let responseData = response.data;
            //     console.log(responseData);
            //     if (responseData != undefined) {
            //         if (responseData.success == true) {
            //             this.$toast("验证码发送成功");
            //         } else {
            //             this.$toast(responseData.message);
            //         }
            //     } else {
            //         this.$toast("系统繁忙，请重新请求");
            //     }
            // });
        },
        loginBtn(){
             if (this.phone == "" || this.phone == undefined) {
                this.$toast("请先输入手机号");
                return;
            }
            let param = {
                mobile: this.phone,
                code: this.sms,
                openId:this.openid
            };
            axiosurlService.couponLogin(param).then(response => {
                let responseData = response.data;
                if (responseData != undefined) {
                    if (responseData.success == true) {
                        var usertoken=responseData.data;
                        if(usertoken){ //如果存在usertoken
                            window.localStorage.setItem("usertoken", usertoken); //存入usertoken
                            this.isLogin=true;
                        };
                    } else {
                        this.$toast(responseData.message);
                    }
                } else {
                    this.$toast("网络错误");
                }
            });
        },
       async  getCoupon(){
            //debugger;
               debugger;
            let that = this;
            var d ={
                pmoId:this.pmoId
            };
            this.show=true;
            const {data}=await axiosurlService.couponOpen(d);
               this.show=false;
            if(data.success){
                that.$router.push({
                    path: "/h5Coupon/couponSuccess?id="+data.data.id,
                });
            }else{
                this.$toast(data.message);
            }
           
        },
    }
};
</script>

<style lang='less' src='./less/getCoupon.less'>
</style>