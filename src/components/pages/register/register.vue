<template>
  <div class="loginContent" style='background:#fff;height:100%' >
        <div class="loginTop">
            <div class="topBg"></div>
            <div class="logo"></div>
            <div class="loginTitle">注册账号</div>
            <!-- <div class="loginTitle">输入密码</div> -->
        </div>
        <div class="loginForm">
          <!-- 注册 -->
          <div class="tel clearfix"  v-if="!isNext">
             <span class="iocn"><img src="./images//user.png"/></span>
             <input type="tel" placeholder="手机号" maxlength="11" v-model='phone'  style='background:none'/>
          </div>
             <div class="note clearfix"  v-if="!isNext">
            <span class="iocn"><img src="./images/iocn.png"/></span>
            <input type="number" v-model='sms' placeholder="短信动态码" style='background:none' />
            <span class="getCode" @click="getCode()">获取验证码</span>
          </div>
      
          <div class="password clearfix" v-if="isNext">
            <span class="iocn"><img src="./images/iocn.png"/></span>
            <input type="password" v-model="psw" placeholder="输入密码"  style='background:none'/>
          </div>
          <div class="password clearfix"  v-if="isNext">
            <span class="iocn"><img src="./images/iocn.png"/></span>
            <input type="password" v-model="newPsw" placeholder="重复密码" style='background:none' />
          </div> 

        </div>
        <div class="loginButton"  v-if="!isNext" @click="goNext()">下一步设置密码</div>
        <div style="margin: 0px auto;text-align: center;margin-top: 20px;text-decoration: underline; color:blue;margin: 0 auto;" v-if="!isNext" @click="goLogin()">已是会员，马上登陆</div>
        <div class="loginButton"  v-if="isNext" @click="registerClick" >确定</div>
        <div  class="bottomBg"></div>
       
  </div>
</template>

<script>
import Vue from "vue";
import axiosurlService from "../../../resource/axiosurlService";
export default {
  name: "login",
  data() {
    return {
      isNext:false,
      phone: null,
      sms: null,
      psw:null,
      newPsw:null,
      openid: "",
      money: "",
      goOrder: 0,
      foodNumber: -1,
      rateCode: "",
      dts: "",
      dte: "",
      typecode: ""
    };
  },
  components: {},
  watch: {},
  methods: {
    goLogin(){
              this.$router.replace({
                path: "/login/login",
              });

    },
    goNext(){
      if(!this.phone){
        this.$toast("请输入手机号");
        return;
      }else if(!this.sms){
         this.$toast("请输入短信验证码");
          return;
      }else{
         this.isNext = true;
      }
    },
    getCode() {
      if (this.phone == "" || this.phone == undefined) {
        this.$toast("请先输入手机号");
        return;
      }
      let param = {
        mobile: this.phone,
        type: 1
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
    registerClick(){
      if(!this.psw||!this.newPsw){
         this.$toast("请输入密码");
          return;
      }else if(this.psw!=this.newPsw){
          this.$toast("两次密码输入不一致，请重新输入！");
          return;
      }
      let param = {
        Mobile: this.phone,
        Account	: this.sms,
        Pwd: this.psw
      }; //请求参数
      axiosurlService.registerMember(param).then(response => {
        let responseData = response.data;
        if (responseData != undefined) {
          if (responseData.success == true) {
              this.$router.replace({
                path: "/houseReservation/houseReservation",
              });
          } else {
            this.$toast(responseData.message);
          }
        } else {
          this.$toast("网络错误");
        }
      });
    }
  },
  mounted() {
    
  }
};
</script>

<style lang='less' src='./less/register.less'>
</style>

