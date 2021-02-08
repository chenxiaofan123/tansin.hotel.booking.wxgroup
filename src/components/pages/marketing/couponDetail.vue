<template>
  <div class="detailCon" v-if="item">
    <div class="topImg">
      <img :src="item.imageUrl" alt="" />
    </div>
    <div class="bigMoney">
      ￥<span>{{ item.price }}</span>
      <div class="huy">￥{{ item.oriPrice }}</div>
    </div>
    <div class="downCon">
      <div class="detailTitle">
        <img src="./images/home.png" alt="" />
        <span>{{ item.infoName }}</span>
        <span style="font-size: 15px; color: #484848">{{
          item.roomTypeName
        }}</span>
      </div>
      <div class="posi">
        <van-cell v-model="roomNum" />
        <ul class="acount">
          <van-stepper @change="changeStep" v-model="number" :min="1" />
        </ul>
      </div>
      <div class="timePick">
        <van-cell title="入住时间" :value="revDate" is-link @click="show = true" />
        <van-calendar v-model="show" :show-confirm="false" type="range" color="#65708C" @confirm="onConfirm" :default-date="defaultDate" :formatter="formatter" :min-date="minDate" :max-date="maxDate" />
        <span class="timeDays">共<b>{{ days }}</b>晚</span>
      </div>
      <van-field v-model="name" required clearable label="预订人" placeholder="请输入预订人" />

      <van-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" required />
      <ul>
        <li v-if="saleOty">
          <img src="./images/pin.png" alt="" />
          <div>拼团最少人数：{{ item.minSaleQty }}人</div>
        </li>
        <li>
          <img src="./images/calender.png" alt="" />
          <div>可入住日期：{{ startDay }} 至 {{ revEndDates }}</div>
        </li>
        <li>
          <img src="./images/serch.png" alt="" />
          <div>天津市西青区榕苑路7号凯德大厦C层</div>
        </li>
        <!--<li style="margin-top: 15px">
          <img src="./images/moneys.png" alt="" />
          <div class="red">￥{{ item.price }}</div>
          <div class="huy">￥{{ item.oriPrice }}</div>
        </li>-->
        <li>
          <img src="./images/rules.png" alt="" />
          <div v-if="!showdiv">
            <span class="rules" id="rulesHeight" style="line-height: 20px" :class="!fold ? 'fold' : 'unfold'" v-if="item.remark !== ''">{{ item.remark }}</span>
            <a class="more" @click="handleFold" v-if="showSpan" v-show="!fold">展开<i class="el-icon-arrow-down"></i></a>
            <a class="more" @click="handleFold" v-show="fold">收起<i class="el-icon-arrow-up"></i></a>
          </div>
          <div v-else>
            <span class="rules" id="rulesHeight" style="line-height: 20px">{{
              item.remark
            }}</span>
          </div>
        </li>
      </ul>
      <!-- <button @click="shareMarket">分享</button> -->
    </div>
    <div class="handleBtns" v-if="detailData">
      <span class="money">合计:￥<span>{{ detailData.totalPrice }}</span>元</span>
      <span class="detailPop" @click="getDetail">
        明细
        <van-icon name="arrow-up" />
      </span>
      <button v-if="this.item.diffs<=0||this.activeType!='100'" @click="saveMarketOrder" id="buttonColor">{{ button }}</button>
      <van-count-down v-if="this.item.diffs>0" :time="this.item.diffs">
        <template #default="timeData">
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>

    <van-popup v-model="popDiv" class="popDiv">
      <div>
        <div class="pclose">
          <img @click="close()" src="./images/close.png" />
        </div>
        <div class="icon"></div>
        <div class="title">费用明细</div>
        <div class="table costPop" v-if="detailData">
          <ul>
            <li>入住日期</li>
            <li>优惠金额</li>
            <li>房间价格</li>
          </ul>
          <div style="max-height: 140px; overflow-y: auto">
            <ul class="detailData" v-for="(item, index) in detailData.daily" :key="index">
              <li>{{ item.revDate }}</li>
              <li>
                <span>￥</span><b>{{ item.discount }}</b>
              </li>
              <li>
                <span>￥</span><b>{{ item.price }}</b>
              </li>
            </ul>
          </div>
          <div class="totalPrice">
            总价：￥<span>{{ detailData.totalPrice }}</span>
          </div>
        </div>
      </div>
    </van-popup>
    <div class="maskUp" v-if="markShow">
      <!-- <img src="./images/mask.png" alt=""> -->
      <div class="markHide" @click="markHide"></div>
    </div>
    <van-overlay :show="showLoading">
      <div style="height:100%;vertical-align: middle">
        <van-loading type="spinner" class="wrapper" style="margin-top:300px; text-align: center" color="#1989fa" size="40px" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from "vue";
import { Overlay } from "vant";
import { Loading } from "vant";
import { Calendar } from "vant";
import moment from "moment";
Vue.use(Overlay);
Vue.use(Loading);
Vue.use(Calendar);
import { Icon, Button, Tab } from "vant";
import axiosurlService from "../../../resource/axiosurlService";
export default {
  name: "marketing",
  data() {
    return {
      item: null,
      detailData: null,
      id: null,
      activeType: "",
      number: 1,
      roomNum: "房间数量",
      name: null,
      tel: null,
      checkInType: 0,
      discountAmount: 0,
      couponAmount: 0,
      popDiv: false,
      revDate: "",
      days: 1,
      show: false,
      queryTask: 0,
      defaultDate: [],
      ifSubmit: false,
      button: "立即秒杀",

      showSpan: true,
      fold: false,
      showdiv: true,
      groupCode: "",
      markShow: false,
      saleOty: false,
      minDate: "",
      maxDate: "",
      startDay: '',
      revEndDates: "",
      showLoading: false
    };
  },
  created() { },

  updated() {
    var el = document.getElementById("rulesHeight");
    var divHeight = el.offsetHeight;
    var lineHeight = parseInt(el.style.lineHeight);
    //  console.log(lineHeight)
    var lines = divHeight / lineHeight;
    //  console.log(lines)
    if (lines <= 2) {
      this.showSpan = true;
    } else {
      this.showSpan = true;
      this.showdiv = false;
    }
  },
  methods: {
    shareSetting(url, showMenu) {
      var that = this;

      if (!url) {
        url = location.href.split("#")[0];
      }

      var pars = "?url=" + url;
      axiosurlService.getBaseAppInfo(pars).then((rs) => {
        console.log(rs.data.data);
        var that = this;
        wx.config({
          debug: false,
          appId: rs.data.data.appId,
          timestamp: rs.data.data.timestamp,
          nonceStr: rs.data.data.noncestr,
          signature: rs.data.data.signature,
          jsApiList: [
            "updateAppMessageShareData",
            "updateTimelineShareData",
            "hideMenuItems",
            "showMenuItems",
            "hideAllNonBaseMenuItem",
          ],
        });
      })
        .catch((error) => {
          window.console.log(error);
        });
      wx.error(function (res) {
        console.log("error:" + res);
      });
      wx.ready(function () {
        if (!showMenu) {
          wx.hideAllNonBaseMenuItem();
          wx.hideMenuItems({
            menuList: ["menuItem:copyUrl"],
          });

        } else {
          wx.showMenuItems({
            menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"], // 显示分享
          });
        }

        //微信好友
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: "天馨酒店团购活动进行中", // 分享标题
          desc: "您的朋友邀请您参加团购，点击连接参加活动~~", // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: roomTypeImage,
          //"http://sandboxbooking.saaspms.com/home/image?id=***5e674e776756ba32acaaf2a9", // 分享图标
          success: function () {
            // 设置成功
          },
        });

        //朋友圈
        wx.updateTimelineShareData({
          title: "天馨酒店团购活动进行中", // 分享标题
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: roomTypeImage,
          //"http://sandboxbooking.saaspms.com/home/image?id=***5e674e776756ba32acaaf2a9", // 分享图标
          success: function () {
            // 设置成功
          },
        });
      });
    },

    highVersionshare(data) {
      wx.updateTimelineShareData(data);
      wx.updateAppMessageShareData(data);
    },

    //日期
    formatDate(revDate) {
      return `${revDate.getFullYear()}/${revDate.getMonth() + 1
        }/${revDate.getDate()}`;
    },
    formatDateTwo(revDate) {
      return `${revDate.getFullYear()}-${revDate.getMonth() + 1
        }-${revDate.getDate()}`;
    },
    onConfirm(date) {
      const [beginDate, endDate] = date;
      this.beginDate = beginDate;
      this.endDate = endDate;
      this.show = false;
      this.revDate = `${moment(beginDate).format("YYYY/MM/DD")} - ${moment(endDate).format("YYYY/MM/DD")}`;
      var days = this.getDaysBetween(
        this.formatDate(beginDate),
        this.formatDate(endDate)
      );
      this.days = days;
      console.log(days);
      this.getCalcPrice();
    },
    formatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      if (day.type === "start") {
        day.bottomInfo = "入住";
      } else if (day.type === "end") {
        day.bottomInfo = "离店";
      }
      return day;
    },

    changeStep() {
      var that = this;
      if (that.queryTask > 0) {
        clearTimeout(that.queryTask);
      }
      that.queryTask = setTimeout(() => {
        that.getCalcPrice();
      }, 500);
    },
    getMarketById() {
      if (!this.id) {
        return;
      }
      let that = this;
      let param = {
        id: that.id, //id
      }; //请求参数
      axiosurlService.getMarketById(param).then((response) => {
        //debugger
        var responseData = response.data;
        if (responseData.success == true) {
          this.item = responseData.data;

          var begin = moment(responseData.data.revBeginDate).format("YYYY/MM/DD");
          var end = moment(responseData.data.revEndDate).format("YYYY/MM/DD");
          var endStart = new Date(end);//没有用
          var beginStart = new Date(begin);//返回开始时间
          var beginStartDay = new Date(begin);//返回开始时间进行赋值
          var beginAdd = new Date(beginStartDay.setDate(beginStartDay.getDate() + 1));//后一天
          var news = new Date();
          var newsDay = new Date();
          var beginAddNews = new Date(newsDay.setDate(newsDay.getDate() + 1));//后一天
          //倒计时
          var now = moment(new Date());
          var beginMoment = moment(this.item.beginDate);
          this.item.diffs = beginMoment.diff(now);
          //判断返回日期小于当前日期
          this.maxDate = endStart;
          if (beginStart < news) {
            beginStart = news;
            beginAdd = beginAddNews;
            this.minDate = news;
            this.startDay = this.$moment(news).format("YYYY/MM/DD");
          } else if (beginStart > news) {//判断返回日期大于当前日期
            beginStart = beginStart;
            this.minDate = beginStart;
            this.startDay = this.$moment(beginStart).format("YYYY/MM/DD");
          };
          this.revEndDates = this.$moment(end).format("YYYY/MM/DD");
          //TODO:限制范围
          //日历赋值
          this.defaultDate.push(beginStart);
          this.defaultDate.push(beginAdd);
          //默认显示
          this.revDate = `${moment(beginStart).format("YYYY/MM/DD")} - ${moment(beginAdd).format("YYYY/MM/DD")}`;
          //计算价格，给日期赋值
          this.beginDate = new Date(beginStart);
          this.endDate = new Date(beginAdd);

          //改变按钮文字
          if (this.activeType == 101) {
            this.button = "立即团购";
            this.saleOty = true;
          } else if (this.activeType == 103) {
            this.button = "立即预购";
          }

          //修改为null默认描述
          if (that.item.remark == null) {
            that.item.remark = "暂无规则描述";
          }

          that.getCalcPrice();
        } else {
          that.$toast(responseData.message);
        }
      });
    },
    getMarketByGroupCode() {
      if (!this.groupCode) {
        return;
      }
      var that = this;
      let param = {
        groupCode: this.groupCode,
      };
      axiosurlService.getMarketByGroupCode(param).then((response) => {
        var responseData = response.data;
        if (responseData.success == true) {
          this.item = responseData.data;
          var begin = responseData.data.revBeginDate;
          var end = responseData.data.revEndDate;
          var now = moment();
          //判断返回日期小于当前日期
          if (moment(begin) < now) {
            this.defaultDate.push(now.toDate());
            this.defaultDate.push(now.add(1, 'days').toDate());
          } else {
            this.defaultDate.push(moment(begin).toDate());
            this.defaultDate.push(moment(begin).add(1, 'days').toDate());
          };
          //可入住日期提示
          this.startDay = moment(begin).format("YYYY/MM/DD");
          this.revEndDates = moment(end).format("YYYY/MM/DD");

          this.minDate = this.defaultDate[0];
          //计算价格，给日期赋值
          this.beginDate = this.defaultDate[0];
          this.endDate = moment(this.beginDate).add(1, 'days').toDate();

          //默认显示

          this.revDate = `${moment(this.beginDate).format("YYYY/MM/DD")} - ${moment(this.endDate).format("YYYY/MM/DD")}`;
          this.activeType = responseData.data.mTypeCode;
          //改变按钮文字
          if (this.activeType == 101) {
            this.button = "立即团购";
          } else if (this.activeType == 103) {
            this.button = "立即预购";
          }

          //修改为null默认描述
          if (that.item.remark == null) {
            that.item.remark = "暂无规则描述";
          }

          that.id = responseData.data.id;
          that.getCalcPrice();
        } else {
          that.$toast(responseData.message);
        }
      });
    },
    getCalcPrice() {
      let that = this;
      var start = this.$moment(that.beginDate).format("YYYY-MM-DD");
      var end = this.$moment(that.endDate).format("YYYY-MM-DD");
      //debugger;
      let param = {
        marketId: that.id,
        roomCount: that.number,
        checkin: start,
        checkout: end,
      };
      axiosurlService.getCalcPrice(param).then((response) => {
        var responseData = response.data;
        if (responseData.success == true) {
          this.detailData = responseData.data;
        } else {
          that.$toast(responseData.message);
        }
      });
    },
    //计算日期差
    getDaysBetween(dateString1, dateString2) {
      var startDate = Date.parse(dateString1);
      var endDate = Date.parse(dateString2);
      if (startDate > endDate) {
        return 0;
      }
      if (startDate == endDate) {
        return 1;
      }
      var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
      return days;
    },
    saveMarketOrder() {
      //debugger
      let that = this;
      that.showLoading = true;
      if (that.ifSubmit) {
        return;
      }
      that.ifSubmit = true;
      var start = this.$moment(that.beginDate).format("YYYY-MM-DD");
      var end = this.$moment(that.endDate).format("YYYY-MM-DD");
      var dayBottomLimit = that.item.dayBottomLimit;
      var dayTopLimit = that.item.dayTopLimit;

      let param = {
        marketId: that.id,
        orderNo: that.orderNo,
        revUser: that.name,
        mobile: that.tel,
        // remark: that.item.remark,
        checkInType: that.checkInType,
        checkInDate: start,
        checkOutDate: end,
        days: that.days,
        totalAmount: that.detailData.totalPrice,
        discountAmount: that.discountAmount,
        couponAmount: that.couponAmount,
        roomQty: that.number,
        actualAmount:
          that.detailData.totalPrice - that.discountAmount - that.couponAmount,
        MarketGroupCode: that.groupCode,
      };

      if (!param.revUser || param.revUser == "") {
        this.$toast("请输入预订人名称");
        that.ifSubmit = false;
        that.showLoading = false;
        return;
      }
      if (!param.mobile || param.mobile == "") {
        this.$toast("请输入手机号码");
        that.ifSubmit = false;
        that.showLoading = false;
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(param.mobile)) {
        this.$toast("输入的手机号格式有误");
        that.ifSubmit = false;
        that.showLoading = false;
        return;
      }

      //限制最大最小入住日期

      if (dayBottomLimit && dayBottomLimit * 1 > 0 && param.days < dayBottomLimit) {
        that.showLoading = false;
        that.ifSubmit = false;
        this.$toast("最少预订入住天数" + dayBottomLimit + "天");
        return;
      }
      if (dayTopLimit && dayTopLimit * 1 > 0 && param.days > dayTopLimit * 1) {
        that.showLoading = false;
        that.ifSubmit = false;
        this.$toast("最多预订入住天数" + dayTopLimit + "天");
        return;
      }

      axiosurlService.saveMarketOrder(param).then((response) => {
        let responseData = response.data;

        //debugger;
        if (responseData.success == true) {
          that.$router.push({
            path: "/pay/pay",
            query: {
              orderNo: responseData.data.orderNo
            }
          });
          //TODO:提交按钮禁用
          var background = document.getElementById("buttonColor").style.backgroundColor = "rgb(140 140 140)";

        } else {
          that.ifSubmit = false;
          that.showLoading = false;
          this.$toast(responseData.message);
        }
      });
    },
    getUserDate() {
      //let that = this;
      axiosurlService.getMemberUserInfo().then((response) => {
        let responseData = response.data;
        console.log(responseData);
        if (responseData.success == true) {
          var data = responseData.data;
          if (data.moible == "0") {
            data.moible = ""
          }
          (this.tel = data.moible), (this.name = data.userName);
        } else {
          this.$toast(responseData.message);
        }
      });
    },
    close() {
      this.popDiv = false;
    },
    getDetail() {
      this.popDiv = true;
    },
    handleFold() {
      this.fold = !this.fold;
    },
    markHide() {
      this.markShow = false;
    }
  },
  mounted() {
    this.id = this.$route.query.activityId;
    this.groupCode = this.$route.query.pid;
    this.activeType = this.$route.query.activeType;
    this.getUserDate();
    this.getMarketById();
    this.getMarketByGroupCode();
    //this.shareSetting();
  },
};
</script>

<style lang="less" src='./less/paySuccess.less'>
</style>
<style>
@import "./css/couponDetail.css";
</style>
