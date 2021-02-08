<template>
  <div class="tansincontent">
    <div class="ordering" v-if="orderInfo">
      <div class="topBox" v-if="orderInfo">
        <img src="./images/home.png" alt="">
        <span class="title">{{ orderInfo.hotelName }}</span>
      </div>

      <h2 class="tip" v-if="orderInfo.isFreeCancel">
        <van-icon size="16px" name="warning-o" />
        <span>入住当天{{ orderInfo.freeCancelRange }}前可免费取消</span>
      </h2>
      <van-cell-group v-if="orderInfo">
        <div class="lines" v-if="!isHourRoom">
          <span class="icon icon1 all">
            <img src="./images/calender.png" />
            入住：{{ orderInfo.checkInDate }}
          </span>
          <span class="alc">离店：{{ orderInfo.checkOutDate }}</span>
          <span class="alr">共{{ orderInfo.days }}晚</span>
        </div>
        <div class="lines" v-if="isHourRoom">
          <span class="icon icon1 all">
            <img src="./images/calender.png" />
            入住：{{ orderInfo.checkInDate }} </span
          >&nbsp;
          <span class="">共{{ orderInfo.hours }}小时</span>
        </div>
        <div class="lines">
          <span class="icon icon1">
            <img src="./images/serch.png" />
            {{ orderInfo.address }}
          </span>
        </div>
        <div class="lines" v-if="isHourRoom">
          <span class="hourRange">可订时间：{{ orderInfo.hourRange }}</span>
        </div>

        <div class="posi bordertop">
          <van-cell v-model="orderInfo.roomTypeName" />
          <ul class="acount">
            <van-stepper @change="changeStep" v-model="number" :min="1" />
          </ul>
        </div>
        <van-field
          v-model="name"
          required
          clearable
          label="入住人"
          placeholder="请输入入住人"
        />

        <van-field
          v-model="tel"
          type="tel"
          label="手机号"
          placeholder="请输入手机号"
          required
        />
        <div class="posi">
          <van-cell title="优惠券" is-link @click="goCoupon()" />
          <div v-if="couponUseMoney != 0" class="couponOYes">
            <span class="icon">
              <img src="./images/icon.png" />
            </span>
            已使用{{ couponUseMoney }}元优惠券
          </div>
          <div v-if="isShowDis && couponUseMoney == 0" class="couponOYes">
            <span class="icon">
              <img src="./images/icon.png" />
            </span>
            有可用优惠券
          </div>
          <div
            v-if="isShowDis == false"
            class="couponOYes"
            style="background:#F5F5F5;color:#666"
          >
            <span class="icon">
              <img src="./images/icon.png" />
            </span>
            无可用优惠券
          </div>
        </div>
        <div v-if="isHourRoom">
          <van-field
            readonly
            clickable
            label="到店时间"
            :value="selectedHour"
            placeholder="选择到店时间"
            @click="showPicker = true"
          />
        </div>
      </van-cell-group>
      <div class="equity">
        <!-- 本次会员权益为您节省<span>18</span>元 -->
        <h2 class="title">您的权益【{{ currentRights.vipName }}】</h2>
        <!-- <p class="smallTitle">本人预订本人入住享以下权益</p> -->
        <van-cell
          class="equityCell"
          v-for="(item, index) in currentRights.rights"
          :key="index"
          :title="item"
          icon="certificate"
        />
      </div>
      <div class="equity">
        <h2 class="title">升级更多权益</h2>
        <!-- <p class="smallTitle">入住后可与住宿费一并开具发票</p> -->
        <!-- <van-checkbox class="fl" v-model="checked" checked-color="#ffad6f">升级金会员即可享</van-checkbox> -->
        <van-cell
          class="equityUp"
          v-for="(item, index) in nextRights.rights"
          :key="index"
          :title="item"
          icon="certificate"
        />
      </div>
      <div class="orderOBox">
        <span class="money">合计：￥<span>{{ getActAmt() }}</span> 元</span>
        <span class="detail" @click="getOrderDetail">
          明细
          <van-icon name="arrow-up" />
        </span>
        <van-button class="submit" @click="submitorder">提交订单</van-button>
      </div>
    </div>

    <van-popup v-model="popDiv" class="popDiv">
      <div>
        <div class="pclose">
          <img @click="close()" src="./images/close.png" />
        </div>
        <div class="icon"></div>
        <div class="title">房价明细</div>
        <div class="table" v-if="orderInfo">
          <div class="tableTitle">
            <div>入住时间</div>
            <div>优惠</div>
            <div>价格</div>
          </div>
          <div style="max-height:140px;overflow-y:auto">
            <div
              class="table"
              v-for="(item, index) in orderInfo.daily"
              :key="index"
            >
              <div>{{ item.revDate }}</div>
              <div>￥{{ item.discount }}</div>
              <div>￥{{ item.price }}</div>
            </div>
          </div>
          <div class="bottomMoney">
            <div class="zonge">促销折扣:￥{{ orderInfo.discountAmount }}</div>
            <div class="zonge">
              共优惠:￥{{ orderInfo.discountAmount + orderInfo.couponAmount }}
            </div>
            <div class="fr zonge" style="margin-right:20px;margin-top:-40px">总额:￥<span>{{ orderInfo.actualAmount }}</span></div>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-overlay :show="show">
      <div style="height:100%;vertical-align: middle">
        <van-loading
          type="spinner"
          class="wrapper"
          style="margin-top:300px; text-align: center"
          color="#1989fa"
        />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from "vue";
import { Overlay } from "vant";
import { Loading } from "vant";
Vue.use(Overlay);
Vue.use(Loading);
import { Icon, Button, Tab } from "vant";
import axiosurlService from "../../../resource/axiosurlService";
export default {
  name: "ordering",
  data() {
    return {
      isShowDis: false,
      number: 1,
      name: null,
      tel: null,
      checked: false,
      currentRights: null,
      nextRights: null,
      roomTypeCode: null,
      rateCode: null,
      checkIn: null,
      checkOut: null,
      orderInfo: null,
      couponType: "",
      couponId: "",
      couponCode: "",
      couponUseMoney: 0,
      ifSubmit: false,
      orderAmt: 0,
      discountAmt: 0,
      promotionId: "",
      queryTask: 0,
      popDiv: false,
      show: false,
      isHourRoom: false,
      checkInType: 0,
      showPicker: false,
      selectedHour: "",
      columns: []
    };
  },
  components: {},
  watch: {},
  methods: {
    close() {
      this.popDiv = false;
    },
    getOrderDetail() {
      this.popDiv = true;
    },
    changeStep() {
      var that = this;
      if (that.queryTask > 0) {
        clearTimeout(that.queryTask);
      }
      that.queryTask = setTimeout(() => {
        that.checkinventory();
        console.log("推送请求");
        // 注意此时修改 value 后会再次触发 change 事件
      }, 500);
    },
    goCoupon() {
      //跳转优惠券列表
      let that = this;
      if (!that.isShowDis) {
        return;
      }
      that.$router.push({
        path: "/coupon/coupon",
        query: {
          allMoney: that.orderInfo.totalAmount - that.orderInfo.discountAmount,
          roomTypeCode: that.roomTypeCode,
          rateCode: that.rateCode,
          checkIn: that.checkIn, // 入住日期
          checkOut: that.checkOut, //离店日期
          isShowAll: false,
          isHourRoom:that.isHourRoom
        }
      });
    },
    getActAmt() {
      var t = this.orderInfo.actualAmount - this.couponUseMoney;
      if (t < 0) {
        return 0;
      }
      return t;
    },
    checkinventory(flag) {
      let that = this;
      let param = {
        roomTypeCode: that.roomTypeCode, // 房型代码
        rateCode: that.rateCode, //房价代码
        checkIn: that.checkIn, // 入住日期
        checkOut: that.checkOut, //离店日期
        roomQty: that.number
      };
      this.$toast.loading({ forbidClick: true });
      setTimeout(() => {
        this.$toast.clear();
      }, 2000);
      axiosurlService.checkinventory(param).then(response => {
        debugger
        this.$toast.clear();
        let responseData = response.data;
        if (responseData.success == true) {
          that.orderInfo = responseData.data;
          if (flag) {
            that.name = responseData.data.revUser;
            that.rateCode = responseData.data.rateCode;
            that.tel = responseData.data.mobile || null;
          }
          if (responseData.data.mobile == "0") {
            that.tel = ""
          }
          that.isShowDis = responseData.data.hasValidCoupon;
          that.promotionId = responseData.data.promotionId;
        } else {
          this.$toast(responseData.message); 
        }
      });
    }, 
    querymemberright() {   
      let that = this;
      let param = {
        orderId: that.orderId //订单id
      }; //请求参数
      axiosurlService.querymemberright(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          that.currentRights = responseData.data.currentRights; //会员权益
          that.nextRights = responseData.data.nextRights; //会员权益
        } else {
          this.$toast(responseData.message);
        }
      });
    },
    submitorder() {
      let that = this;
      if (that.ifSubmit) {
        return;
      }
      that.show = true;
      that.ifSubmit = true;
      let param = {
        checkInDate: that.orderInfo.checkInDate, //订单id
        checkOutDate: that.orderInfo.checkOutDate,
        days: that.orderInfo.days,
        roomTypeCode: that.orderInfo.roomTypeCode,
        roomTypeName: that.orderInfo.roomTypeName,
        rateCode: that.rateCode,
        orderNo: that.orderInfo.orderNo,
        rateName: that.orderInfo.rateName,
        revUser: that.name,
        mobile: that.tel,
        roomQty: that.number,
        remark: that.orderInfo.remark,
        arrivalTime: that.orderInfo.arrivalTime,
        isRegistMember: that.orderInfo.isRegistMember,
        couponUsed: {
          couponType: that.couponType,
          couponId: that.couponId,
          couponCode: that.couponCode,
          couponUseMoney: that.couponUseMoney
        },
        promotionId: that.promotionId,
        totalAmount: that.orderInfo.totalAmount,
        discountAmount: that.orderInfo.discountAmount,
        couponAmount: that.couponUseMoney,
        actualAmount: that.getActAmt(),
        hourRange: that.selectedHour,
        checkInType: that.checkInType
      }; //请求参数
      if (!param.revUser || param.revUser == "") {
        this.$toast("请输入预订人名称");
        that.ifSubmit = false;
        that.show = false;
        return;
      }

      if (!param.mobile || param.mobile == "") {
        this.$toast("请输入手机号码");
        that.ifSubmit = false;
        that.show = false;
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(param.mobile)) {
        this.$toast("输入的手机号格式有误");
        that.ifSubmit = false;
        that.show = false;
        return;
      }
      if (that.isHourRoom && !that.selectedHour) {
        this.$toast("请选择到店时间");
        that.ifSubmit = false;
        that.show = false;
        return;
      }
      axiosurlService.submitorder(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          that.$router.push({
            path: "/pay/pay",
            query: {
              orderNo: responseData.data.orderNo
            }
          });
        } else {
          that.ifSubmit = false;
          that.show = false;
          this.$toast(responseData.message);
        }
      });
    },
    onConfirm(value) {
      this.selectedHour = value;
      this.showPicker = false;
    },
    getHourRange() {
      if(!this.isHourRoom){
        return;
      }
      let that = this;
      let param = {
        roomTypeCode: that.roomTypeCode,
        rateCode: that.rateCode,
        checkInDate:that.checkIn
      }; //请求参数
      axiosurlService.getHourRange(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          that.columns = responseData.data; 
         
        } else {
          this.$toast(responseData.message);
        }
      });
    }
  },
  mounted() {
    console.log(this.isShowDis);
    this.roomTypeCode = this.$route.query.roomTypeCode;
    this.rateCode = this.$route.query.rateCode;
    this.checkOut = this.$route.query.checkOut;
    this.checkIn = this.$route.query.checkIn;
    this.couponType = this.$route.query.couponType;
    this.couponId = this.$route.query.couponId;
    this.couponCode = this.$route.query.couponCode;
    this.couponUseMoney = this.$route.query.couponUseMoney || 0;
    this.isHourRoom = this.$route.query.isHourRoom;
    if (this.isHourRoom) {
      this.checkInType = 1;
    }
    this.$toast("请输入dasdas");
    this.querymemberright();
    this.checkinventory(true);
    this.getHourRange();
  }
};
</script>

<style lang='less' src='./less/ordering.less'>
</style>

