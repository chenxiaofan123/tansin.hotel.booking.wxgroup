<template>
  <div style="margin:20px">
    <!-- <van-button @click="shareCopy">分享1</van-button> -->
    <!-- <div class="arrow"></div> -->
    <div style="text-align: right;margin-right: 20px;">
      <img src="./images/arrow.png" />
     <div> 点击此处分享给朋友享受优惠</div>

    </div>
    <div style="text-align:center;margin-top: 150px;">
      <van-button
      v-clipboard:copy="url"
      v-clipboard:success="copy"
      v-clipboard:error="onError"
      :type="copyBtnType"
      ref="copy"
    >{{copyWait}}</van-button>
    </div>
  </div>
</template>

<script>
import axiosurlService from "../../../resource/axiosurlService";
// import Vue from 'vue';
// import { Notify } from 'vant';
export default {
  data() {
    return {
      title: "11",
      copyContent: "asdasdas",
      url: "http://sandboxbooking.saaspms.com/wechat2/index.html#/",
      basewecharInfo: {},
      copyWait:'点击复制您的团购链接分享给朋友享受优惠',
      copyBtnType:'primary',
    };
  },
  created() {
    console.log("created");
    // this.loadBaseApp();
    this.share1();
  },
  mounted() {},
  methods: {
    copy() {
      console.log("CopySuccess");
      // console.log(this.$refs.copy.type);
      // this.$refs.copy.type="success";
      this.copyWait="复制成功！";
    
    },
    onError() {
        //  console.log("CopyError");
        this.copyWait="复制失败,请您尝试复制右上方 ··· 复制链接！";
      this.copyBtnType="danger";

    },
    shareCopy() {
      console.log("copy");
      var clipBoardContent = "";
      clipBoardContent += document.title;
      clipBoardContent += "";
      clipBoardContent += location.href;
      console.log(window.clipboardData);
      window.clipboardData.setData("Text", clipBoardContent);
      alert("复制成功，请粘贴到你的QQ/MSN上推荐给你的好友");
    },
    loadBaseApp() {
      var url = location.href.split("#")[0];
      var pars = "?url=" + url;
      axiosurlService.getBaseAppInfo(pars).then(data => {
        if (data.data.success) {
          console.log(999);
          console.log(data);
          this.basewecharInfo = data.data.data;
          console.log(this.basewecharInfo);
        }
      });
    },
    share1() {
      // const url = window.location.href.split("#")[0];
      // window.console.log(url, JSON.stringify(option));
      var option = {
        shareTitle: "王大锤正在邀请您参见团购",
        shareDesc: "团购信息******",
        shareUrl: this.url,
        shareTitle: "团够哇"
      };
      var url = location.href.split("#")[0];
      var pars = "?url=" + url;
      axiosurlService
        .getBaseAppInfo(pars)
        .then(rs => {
          console.log(rs.data.data);
          var that = this;
          wx.config({
            debug: true,
            appId: rs.data.data.appId,
            timestamp: rs.data.data.timestamp,
            nonceStr: rs.data.data.noncestr,
            signature: rs.data.data.signature,
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
          });
        })
        .catch(error => {
          window.console.log(error);
        });
      wx.ready(function() {
        wx.updateAppMessageShareData({
          title: option.shareTitle,
          desc: option.shareDesc,
          link: option.shareUrl,
          imgUrl: option.shareImg
        });
        wx.updateTimelineShareData({
          title: option.shareTitle,
          desc: option.shareDesc,
          link: option.shareUrl,
          imgUrl: option.shareImg
        });
      });
    }
  }
};
</script>

<style>
  .arrow{
    background-image: url("/static/images/arrow2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 155px;
    /* background-color: red;; */
    height: 155px;
  }
</style>
