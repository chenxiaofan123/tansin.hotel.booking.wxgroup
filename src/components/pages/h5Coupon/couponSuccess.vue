<template>
    <div class="couponSuccess" style='height:100%'>
        <div class="couponIndex">
            <img class="imgTitle" src="./images/titleImg.png"/>
            <div class="couponDiv">
                <div class="couponMoney">
                    <div style="width:42%">
                      <span class="number">￥</span>
                      <span>{{copInfo.couponAmt}}</span>
                    </div>
                    <div class="couponText">
                        <p>{{copInfo.limitInfo}}</p>
                        <div>有效期至：{{copInfo.effDate}}</div>
                    </div>
                </div>
                <img class="imgText" src="./images/text.png" />
            </div>
        </div>
        <div class="applyBtn" @click="gotourl()">马上使用</div>
    </div>
</template>

<script>
import Vue from "vue";
import axiosurlService from "../../../resource/axiosurlService";
  export default {
    data() {
      return {
        id:"",
        copInfo:{
          limitInfo:"",
          couponAmt:0,
          effDate:""
        }
      };
    },
    created() {
        this.id = this.$route.query.id;
        this.getMyCop();
    },
    mounted() {

    },
    methods: {
     async getMyCop(){
        var {data} =await axiosurlService.myCop({id:this.id});
        if(data.data){
          this.copInfo=data.data;
        }
      }
      ,
      gotourl(){
         var t = window.localStorage.getItem("tenantcode"); 
        document.location.href="/pmopage/redirectwx?hotelCode="+t;
      }
    }
  };
</script>

<style lang='less' src='./less/success.less'>
</style>