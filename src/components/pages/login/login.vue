<template>
  <div class="loginContent" style='background:#fff;height:100%'>
    <div class="loginTop">
      <div class="topBg"></div>
      <div class="logo"></div>
      <div class="loginTitle">账号登录</div>
    </div>
    <div class="loginForm">
      <!-- 密码登录 -->
      <div class="tel clearfix">
        <span class="iocn">
          <img src="./images//user.png">
        </span>
        <input type="tel" v-model="phone" placeholder="手机号" maxlength="11" style='background:none'>
      </div>
      <div class="password clearfix" v-if='withPassword'>
        <span class="iocn">
          <img src="./images/iocn.png">
        </span>
        <input type="password"  v-model="psw" placeholder="密码" style='background:none'>
      </div>
      <!-- 短信验证码登录 -->
      <div class="note clearfix" v-if='withSms'>
        <span class="iocn">
          <img src="./images/iocn.png">
        </span>
        <input type="number" v-model="sms" placeholder="短信动态码">
        <span class="getCode" @click="getCode()">获取验证码</span>
      </div>
    </div>
    <div class="useCode" v-if='withPassword'  @click='loginWithSms()'>短信验证码登录</div>
    <div class="useCode" v-if='withSms'  @click='loginWithPassword()'>手机号密码登录</div>
    <div class="loginButton"  @click="loginclick">登录</div>
    <div class="register" @click="goRegister()">注册</div>
    <!-- <div class="bottomBg"></div> -->
  </div>
</template>

<script>
import Vue from "vue";
import axiosurlService from "../../../resource/axiosurlService";
export default {
  name: "login",
  data() {
    return {
      withSms:false,
      withPassword:true,
      phone: null,
      sms: null,
      psw:null,
      openid: "",
      money: "",
      goOrder: 0,
      foodNumber: -1,
      rateCode: "",
      dts: "",
      dte: "",
      typecode:0
     
    };
  },
  components: {},
  watch: {},
  methods: {
    loginWithSms(){ //短信验证码登录
      this.withSms= true;
      this.withPassword = false;
      this.typecode = 1

    },
    loginWithPassword(){ //密码登录
      this.withPassword = true;
      this.withSms = false;
      this.typecode = 0
    },
    goRegister(){
      this.$router.push({
          path: "/register/register",
          query: {
          }
      });
    },
    loginclick() {
      if(this.typecode==0){ //0 密码登录
        this.sms=null;
      }else if(this.typecode==1){
        this.psw=null;
      }
      let param = {
        mobile: this.phone,
        code: this.sms,
        pwd: this.psw,
        mode:this.typecode //0是密码登录  1短信登录
      }; //请求参数
      axiosurlService.memberlogin(param).then(response => {
        let responseData = response.data;
        if (responseData != undefined) {
          if (responseData.success == true) {
            var usertoken=responseData.data;
             if(usertoken){ //如果存在usertoken
      window.localStorage.setItem("usertoken", usertoken); //存入usertoken
    };
            var isgroup =window.localStorage.getItem("isgroup");
            if(isgroup==0){
              this.$router.replace({
                  path: "/houseReservation/houseReservation",
                 query: {
                    isgroup: 0
                  }
              });
              return;
            }
             this.$router.replace({
                path: "/myCenter/myCenter",
             });
          } else {
            this.$toast(responseData.message);
          }
        } else {
          this.$toast("网络错误");
        }
      });
    },
    getCode() {
      if (this.phone == "" || this.phone == undefined) {
        this.$toast("请先输入手机号");
        return;
      }
      let param = {
        mobile: this.phone,
        type: 2
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
    },
 
  },
  mounted() {
    this.openid = window.localStorage.getItem("openid");
  }
};
</script>

<style lang='less' src='./less/login.less'>
</style>

