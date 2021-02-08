<template>
  <div style="width:100%;height:100%;">
    <div class="title">
      今日秒杀
    </div>
    <div style="margin-bottom:100px">
      <div style="font-size:20px">10:00开始</div>
      <van-card
        v-for="item in 2"
        :key="item"
       
        price="5.00"
        origin-price="10.00"
        desc="原价10元 限时5元"
        title="高级大床房 "
        thumb="/static/images/dcf.jpg"
      >
        <div slot="tags"></div>
        <div slot="footer">
          <van-button size="normal" type="danger">开抢</van-button>
        </div>
      </van-card>

      <div>
        <div style="font-size:20px">12:00开始</div>
        <van-card
          v-for="item in 2"
          :key="item"
       
          price="5.00"
          origin-price="10.00"
          desc="原价10元 限时5元"
          title="精品双床房 "
          thumb="/static/images/scf.jpg"
        >
          <div slot="tags"></div>
          <div slot="footer">
            <van-button size="normal" type="warning" @click="warning"
              >提醒我</van-button
            >
          </div>
        </van-card>
      </div>
    </div>
    <!-- <van-goods-action style="padding:10px ">
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action> -->
  </div>
</template>

<script>
import Vue from "vue";
import { Card } from "vant";

Vue.use(Card);

export default {
  name: "coupon",
  data() {
    return {};
  },
  components: {},
  watch: {},
  methods: {
    warning() {
      var minDate = new Date("2020-11-1 12:00:00");
      var maxDate = new Date("2023-8-2 12:00:00");
      // var maxDate = new Date("2021-2-2 12:00:00");
      window.localStorage.setItem("minDate", minDate);
      window.localStorage.setItem("maxDate", maxDate);
      this.$router.push({
        path: "/calender/calenderMarket"
      });
    }
  },
  mounted() {}
};
</script>

<style lang='less' >
.title {
  text-align: center;
}
.van-card__title {
  margin-top: 0px;
  margin-bottom: 10px;
}
</style>

