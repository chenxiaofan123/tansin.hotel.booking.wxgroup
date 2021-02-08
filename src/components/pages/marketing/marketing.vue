<template>
  <div class="marketingCon">
    <van-tabs v-model="active">
      <div v-for="(tp, index) in typelist" :key="index">
        <van-tab :title="tp.mTypeName" :name="tp.mTypeCode">
          <!-- <div class="title">
            {{ tp.subTitle }}
          </div> -->

          <div class="swiperDiv" v-if="tp.mTypeCode == '100'">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(item, index) in swiperList" :key="index" :class="{ active: nums == index }">
                <div @click="
                    nums = index;
                    marketClick(nums);
                  ">
                  <div>{{ item.beginDate }}</div>
                  <div class="smallText">{{ item.text }}</div>
                </div>
              </swiper-slide>
            </swiper>

            <div style="margin-top: 115px">
              <div class="couponList otherList" :key="index" v-for="(item, index) in todayMarket" v-show="nums == 0">
                <!-- <van-card
                  price="5.00"
                  origin-price="10.00"
                  desc="原价10元 限时5元"
                  title="高级大床房 "
                  :thumb="gethotelimg(item)"
                >
                  <div slot="tags"></div>
                  <div slot="footer">
                    <van-button
                      size="normal"
                      type="warning"
                      @click="remindMe(item)"
                      >提醒我</van-button
                    >
                  </div>
                </van-card> -->
                <div class="hotleImages">
                  <div class="hotleTime">
                    <span v-if="item.diffs>0">{{ item.showBeginDate }}开始秒杀</span>
                    <span v-if="item.diffs<=0">秒杀进行中</span>
                  </div>
                  <van-count-down v-if="item.diffs>0" :time="item.diffs" @finish="finish(index)">
                    <template #default="timeData">
                      <span class="block">{{ timeData.hours }}</span>
                      <span class="colon">:</span>
                      <span class="block">{{ timeData.minutes }}</span>
                      <span class="colon">:</span>
                      <span class="block">{{ timeData.seconds }}</span>
                    </template>
                  </van-count-down>
                  <div class="hotleImg">
                    <img :src="item.imageUrl? item.imageUrl: require('./images/hotel.jpg')" />
                  </div>
                </div>
                <div class="hotleCon" @click="detils(item.id)">
                  <div class="hotleTitle">{{ item.infoName }}</div>
                  <div class="hotleName">{{ item.roomTypeName }}</div>
                  <div class="remark">{{ item.remark }}</div>
                  <div class="smallTime">
                    <span style="position: relative; top: -2px">已抢</span>
                    <van-progress :pivot-text="item.percentage + '%'" color="#FF0000" :percentage="item.percentage" />
                  </div>
                  <div class="priceBuy">
                    <span class="redP"><span>￥</span>{{ item.price }}</span>
                    <span class="yuanPrice">￥{{ item.oriPrice }}</span>
                  </div>
                </div>
                <div class="handleBtn miaoBtn" @click="detils(item.id)">
                  <img src="./images/timeText.png" alt="" />
                </div>
                <!-- <div class="handleBtn miaoBtn timeBtn" @click="remindMe(item)">
                  <img src="./images/time.png" alt="">
                </div> -->
              </div>
              <div class="couponList otherList" :key="index" v-for="(item, index) in tomorrowMarket" v-show="nums == 1">
                <div class="hotleImages">
                  <div class="hotleTime">
                    <span>{{ item.beginDate }}</span> 开始秒杀
                  </div>
                  <div class="hotleImg">
                    <img :src="item.imageUrl? item.imageUrl: require('./images/hotel.jpg')" />
                  </div>
                </div>
                <div class="hotleCon" @click="detils(item.id)">
                  <div class="hotleTitle">{{ item.infoName }}</div>
                  <div class="hotleName">{{ item.roomTypeName }}</div>
                  <div class="remark">{{ item.remark }}</div>
                  <div class="smallTime">
                    <span>已抢</span>
                    <van-progress :pivot-text="item.percentage + '%'" color="#FF0000" :percentage="item.percentage" />
                  </div>
                  <div class="priceBuy">
                    <span class="redP"><span>￥</span>{{ item.price }}</span>
                    <span class="yuanPrice">￥{{ item.oriPrice }}</span>
                  </div>
                </div>
                <!-- <div class="handleBtn miaoBtn" @click="rush(item)">
                  <img src="./images/timeText.png" alt="">
                </div> -->
                <div class="handleBtn miaoBtn timeBtn" @click="detils(item.id)">
                  <img src="./images/time.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="tp.mTypeCode == '101'">
            <div class="couponList otherList" v-for="(item, index) in marketlist" :key="index">
              <div class="hotleImg">
                <img :src="item.imageUrl? item.imageUrl: require('./images/hotel.jpg')" />
              </div>
              <div class="hotleCon" @click="detils(item.id)">
                <div class="hotleTitle">{{ item.infoName }}</div>
                <div class="hotleName">{{ item.roomTypeName }}</div>
                <div class="remark">{{ item.remark }}</div>
                <div class="smallTime">
                  <img src="./images/calender.png" /> {{ item.revBeginDate }} 至
                  {{ item.revEndDate }}
                </div>
                <div class="priceBuy">
                  <span class="redP"><span>￥</span>{{ item.price }}</span>
                  <span class="yuanPrice">￥{{ item.oriPrice }}</span>
                </div>
              </div>
              <div class="handleBtn tuanBtn" @click="detils(item.id)">
                <img src="./images/icon.png" alt="" />
              </div>
              <!-- <div slot="footer">
                <van-button
                  @click="groupbuy(item)"
                  >{{ index % 2 == 0 ? "开团" : "拼团" }}</van-button
                >
              </div> -->
            </div>
          </div>

          <div v-if="tp.mTypeCode == '103'">
            <div class="couponList otherList" v-for="(item, index) in marketlist" :key="index">
              <div class="hotleImg">
                <img :src="item.imageUrl? item.imageUrl: require('./images/hotel.jpg')" />
              </div>
              <div class="hotleCon" @click="detils(item.id)">
                <div class="hotleTitle">{{ item.infoName }}</div>
                <div class="hotleName">{{ item.roomTypeName }}</div>
                <div class="remark">{{ item.remark }}</div>
                <div class="smallTime">
                  <img src="./images/calender.png" /> {{ item.revBeginDate }} 至
                  {{ item.revEndDate }}
                </div>
                <div class="priceBuy">
                  <span class="redP"><span>￥</span>{{ item.price }}</span>
                  <span class="yuanPrice">￥{{ item.oriPrice }}</span>
                </div>
              </div>
              <div class="handleBtn" @click="detils(item.id)">预</div>
            </div>
          </div>

          <div v-if="tp.mTypeCode == '102'">
            <div class="couponList" v-for="(item, index) in marketlist" :key="index">
              <div class="radial-gradient">
                <div class="price"><span>￥</span>{{ item.oriPrice }}</div>
                <div class="des">{{ item.couponName }}</div>
              </div>
              <div class="right">
                <div class="top">
                  <!-- <span class="limit">限品类券</span> -->
                  <span>{{ item.infoName }}</span>
                </div>
                <span class="surplus">剩余 {{ item.lastQty }} 张</span>
                <div class="priceNum">
                  <span><span>￥</span>{{ item.price }}</span>
                  <del v-if="item.oriPrice != null && item.oriPrice > item.price">￥{{ item.oriPrice }}</del>
                </div>
                <!-- <span class="effectTime">2020.11.27-2020.11.28</span> -->
              </div>
              <div class="btnbuy" @click="couponbuy(item)">
                立<br />即<br />抢<br />购
              </div>
            </div>
          </div>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import { CountDown } from "vant";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import axiosurlService from "../../../resource/axiosurlService";
export default {
  name: "marketing",
  data() {
    return {
      active: 0,
      nums: 0,
      marketlist: [],
      todayMarket: [],
      tomorrowMarket: [],
      typelist: [],
      swiperOption: {
        slidesPerView: "auto",
        freeMode: true,
      },
      swiperList: [
        {
          beginDate: "今日活动",
          text: "秒杀进行中",
        },
        {
          beginDate: "明日活动",
          text: "即将开始",
        },
      ],
      downHide: false,
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  watch: {
    active(newVal, oldVal) {
      this.loaddata(newVal);
    },
  },
  created() {
    axiosurlService.getMarketType().then((rs) => {
      console.log(rs);
      if (rs.data.success) {
        this.typelist = rs.data.data;
        // alert(this.typelist.indexOf('100',0));
      }
    });
  },
  methods: {
    // calcTime(begin) {
    //   var now = moment(new Date());
    //   var beginDate = moment(begin);
    //   var diffs = beginDate.diff(now);
    //   debugger;
    // },

    finish(index) { },

    loaddata() {
      console.log(this.active);
      this.marketlist = [];

      axiosurlService.getMarketByType({ typeCode: this.active }).then((rs) => {
        console.log(rs);
        if (rs.data.success) {
          if (this.active == 100) {
            //debugger;
            this.todayMarket = rs.data.data.todayMarket;
            this.tomorrowMarket = rs.data.data.tomorrowMarket;
            if (rs.data.data.todayMarket != undefined) {
              rs.data.data.todayMarket.forEach((item) => {
                var mom = this.$moment(item.beginDate);
                var time = mom.format("HH:mm");
                //item.beginDate = time;
                //处理倒计时
                item.showBeginDate = time;
                var now = moment(new Date());
                var beginMoment = moment(item.beginDate);
                item.diffs = beginMoment.diff(now);
              });
            };
            if (rs.data.data.tomorrowMarket != undefined) {
              rs.data.data.tomorrowMarket.forEach((item) => {
                var mom = this.$moment(item.beginDate);
                var time = mom.format("HH:mm");
                //item.beginDate = time;
                item.showBeginDate = time;
              });
            }
          } else {
            this.marketlist = rs.data.data;
            rs.data.data.forEach((item) => {
              var begin = this.$moment(item.revBeginDate);
              var end = this.$moment(item.revEndDate);
              var time1 = begin.format("YY-MM-DD");
              var time2 = end.format("YY-MM-DD");
              // time = mom.format("DD号HH点");
              // time=  mom.day()+"";
              // var arr = time.split(":");
              // if (arr[arr.length - 1] == "00") {
              //   time = mom.format("HH");
              //   time += "点 ";
              // }
              item.revBeginDate = time1;
              item.revEndDate = time2;
            });
          }
          // if (this.active==102) {
          //   if (this.lastQty==0) {

          //   } else {

          //   }
          // }
        }
      });
    },
    marketClick(nums) {
      //debugger
      if (nums == 0) {
        if (this.todayMarket.length <= 0) {
          this.$toast("暂无秒杀活动");
          console.log(this.todayMarket);
        }
      } else if (nums == 1) {
        if (this.tomorrowMarket.length <= 0) {
          this.$toast("暂无秒杀活动");
          console.log(this.tomorrowMarket);
        }
      }
    },
    goCalender(query) {
      this.$router.push({
        path: "/calender/calenderMarket",
        query: query,
      });
    },
    detils(id) {
      console.log(id);
      this.$router.push({
        path: "/marketing/couponDetail",
        query: {
          activityId: id,
          activeType: this.active,
        },
      });
    },

    bookingbuy(item) {
      //预购
      var query = {
        from: "marketing",
        marketingId: item.id,
      };
      this.goCalender(query);
    },
    remindMe(item) {
      //提醒我
      console.log(item);

      var paras = {
        marketId: item.id,
        isCancel: false,
      };
      axiosurlService.marketNotice(paras).then((rs) => {
        console.log(rs);

        this.$toast(rs.data.message);
      });
    },
    rush(item) {
      var now = new Date();
      var date2 = new Date(item.beginDate);
      console.log(now);
      console.log(date2);
      console.log(item.beginDate);
      console.log(now >= date2);
      if (item.beginDate <= now) {
        this.$toast("活动未开始");
        return;
      } else {
        // this.$toast("活动未开始");
      }
      // return;
      //秒杀抢购
      console.log(item);

      var query = {
        from: "marketing",
        marketingId: "86bfb79f-aca3-418a-a69f-c48d45ee1695",
      };
      this.goCalender(query);

      // var paras = {
      //   marketTypeCode: 1,
      //   marketId: "86bfb79f-aca3-418a-a69f-c48d45ee1695"
      // };
      // var query = {};
      // axiosurlService.queryMarket(paras).then(rs => {
      //   console.log(rs);
      //   if (rs.data.success) {
      //     this.$router.push({
      //       path: "/ordering/ordering",
      //       query: query
      //     });
      //   }
      // });
    },
    groupbuy(item) {
      //团购
      console.log(item);

      var query = {
        from: "marketing",
        marketingId: "86bfb79f-aca3-418a-a69f-c48d45ee1695",
      };
      this.goCalender(query);

      // var paras = {
      //   marketTypeCode: 1,
      //   marketId: "86bfb79f-aca3-418a-a69f-c48d45ee1695"
      // };
      // var query = {};
      // axiosurlService.queryMarket(paras).then(rs => {
      //   console.log(rs);
      //   if (rs.data.success) {
      //     this.$router.push({
      //       path: "/ordering/ordering",
      //       query: query
      //     });
      //   }
      // });
    },
    couponbuy(item) {
      //优惠券
      console.log(item);
      var paras = {
        marketTypeCode: "102",
        marketId: item.id,
      };

      var query = paras;
      axiosurlService.queryMarket(paras).then((rs) => {
        console.log(rs);
        if (rs.data.success) {
          this.$router.push({
            path: "/marketing/couponPay",
            query: query,
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
.van-card__title {
  margin-top: 0px;
  margin-bottom: 10px;
}
.van-card__footer {
  width: 80px;
  /* float: right; */
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.colon {
  display: inline-block;
  /* margin: 0 4px; */
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 20px;
  color: #fff;
  font-size: 11px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 2px;
}
</style>

<style >
@import "./css/coupon.css";
</style>