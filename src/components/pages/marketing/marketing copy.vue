<template>
  <div>
    <van-tabs v-model="active">
      <van-tab
        title="秒杀"
        v-if="this.typelist.indexOf('100', 0) >= 0"
        name="100"
      >
        <div>
          <div class="title">
            今日秒杀
          </div>
          <div style="margin-bottom:100px">
            <div style="font-size:20px">10:00开始</div>
            <van-card
              v-for="item in 2"
              :key="item"
              num="1"
              price="5.00"
              desc="标间满100元可抵20元"
              title="标间20元优惠券 "
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            >
              <div slot="tags"></div>
              <div slot="footer">
                <van-button size="normal" type="danger" @click="rush(item)"
                  >开抢</van-button
                >
              </div>
            </van-card>

            <div>
              <div style="font-size:20px">12:00开始</div>
              <van-card
                v-for="item in 2"
                :key="item"
                num="1"
                price="5.00"
                desc="标间满100元可抵20元"
                title="标间20元优惠券 "
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
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
              </van-card>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab
        title="团购"
        v-if="this.typelist.indexOf('101', 0) >= 0"
        name="101"
      >
        <div>
          <div>
            <div class="title">
              团购
            </div>

            <div style="margin-bottom:100px">
              <van-card
                v-for="(item, index) in 5"
                :key="item"
                num="1"
                price="5.00"
                desc="标间满100元可抵20元"
                title="标间20元优惠券 "
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
              >
                <!-- <div slot="tags">
                  <van-tag plain type="danger">标签</van-tag>
                  <van-tag plain type="danger">标签</van-tag>
                </div> -->
                <div slot="footer">
                  <van-button
                    size="normal"
                    type="danger"
                    @click="groupbuy(item)"
                    >{{ index % 2 == 0 ? "开团" : "拼团" }}</van-button
                  >
                </div>
              </van-card>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab
        title="预购"
        v-if="this.typelist.indexOf('103', 0) >= 0"
        name="103"
      >
        <div>
          <div>
            <div class="title">
              预购
            </div>

            <div style="margin-bottom:100px">
              <van-card
                v-for="item in 5"
                :key="item"
                num="1"
                price="5.00"
                desc="预购2月后价格"
                title="商务大床房 "
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
              >
                <!-- <div slot="tags">
                  <van-tag plain type="danger">限大床房用</van-tag>
                </div> -->
                <div slot="footer">
                  <van-button
                    size="normal"
                    type="danger"
                    @click="bookingbuy(item)"
                    >预购</van-button
                  >
                </div>
              </van-card>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab
        title="优惠券"
        v-if="this.typelist.indexOf('102', 0) >= 0"
        name="102"
      >
        <div>
          <div>
            <div class="title">
              限时优惠券
            </div>

            <div style="margin-bottom:100px">
              <van-card
                v-for="item in 5"
                :key="item"
                num="1"
                price="5.00"
                desc="标间满100元可抵20元"
                title="标间20元优惠券 "
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
              >
                <div slot="tags">
                  <van-tag plain type="danger">限大床房用</van-tag>
                  <!-- <van-tag plain type="danger">标签</van-tag> -->
                </div>
                <div slot="footer">
                  <van-button
                    size="normal"
                    type="danger"
                    @click="couponbuy(item)"
                    >抢购</van-button
                  >
                </div>
              </van-card>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axiosurlService from "../../../resource/axiosurlService";
export default {
  data() {
    return {
      active: 0,
      marketlist: [],
      typelist: []
    };
  },
  watch: {
    active(newVal, oldVal) {
      this.loaddata(newVal);
    }
  },
  created() {
    axiosurlService.getMarketType().then(rs => {
      console.log(rs);
      if (rs.data.success) {
        this.typelist = rs.data.data;
        // alert(this.typelist.indexOf('100',0));
      }
    });
  },
  methods: {
    loaddata() {
      console.log(this.active);
      this.marketlist = [];
      axiosurlService.getMarketByType({"typeCode":this.active}).then(rs => {
        console.log(rs);
        if (rs.data.success) {
        }
      });
    },
    goCalender(query) {
      this.$router.push({
        path: "/calender/calender",
        query: query
      });
    },

    bookingbuy() {
      //预购
      var query = {
        from: "marketing",
        marketingId: "86bfb79f-aca3-418a-a69f-c48d45ee1695"
      };
      this.goCalender(query);
    },
    remindMe(item) {
      //提醒我
      console.log(item);
      var paras = {
        marketId: "86bfb79f-aca3-418a-a69f-c48d45ee1695",
        isCancel: false
      };
      axiosurlService.marketNotice(paras).then(rs => {
        console.log(rs);
      });
    },
    rush(item) {
      //秒杀抢购
      console.log(item);

      var query = {
        from: "marketing",
        marketingId: "86bfb79f-aca3-418a-a69f-c48d45ee1695"
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
        marketingId: "86bfb79f-aca3-418a-a69f-c48d45ee1695"
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
        marketTypeCode: 1,
        marketId: "86bfb79f-aca3-418a-a69f-c48d45ee1695"
      };
      var query = {};
      axiosurlService.queryMarket(paras).then(rs => {
        console.log(rs);
        if (rs.data.success) {
          this.$router.push({
            path: "./couponPay",
            query: query
          });
        }
      });
    }
  }
};
</script>
<style>
.title {
  text-align: center;
  font-size: 25px;
}
.van-card__title {
  margin-top: 15px;
}
</style>