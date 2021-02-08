<template>
  <div class="couponPay">
    <div class="titlePay">优惠信息</div>
    <div class="info">
      <div class="infoTitle">{{couponInfo.couponName}}</div>
      <div class="infoText">{{couponInfo.infoName}}</div>
      <div>使用规则:{{couponInfo.remark}}</div>
      <div v-if="couponInfo.expiryStart!=null">有效期至:{{couponInfo.expiryStart.split(' ')[0]+'  ~  '+couponInfo.expiryEnd.split(' ')[0]}}</div>
      <!-- <van-cell v-if="couponInfo.expiryStart!=null">有效日期:</van-cell> -->
      <!-- <van-cell v-if="couponInfo.expiryStart!=null">有效日期:{{couponInfo.expiryStart.split(' ')[0]+'  至  '+couponInfo.expiryEnd.split(' ')[0]}}</van-cell> -->
      <div class="priceCon">
        <div class="lines">价格：￥
          <span class="redP">{{couponInfo.price}}</span>
        </div>
        <div class="lines widthLines">数量：
          <div class="handleNum">
            <!-- <van-button class="row" @click="add(-1)">-</van-button>
            <label class="row">{{ qty }}</label>
            <van-button class="row" @click="add(1)<=couponInfo.dayTopLimit">+</van-button> -->
            <van-stepper v-model="qty" :min="couponInfo.dayBottomLimit" :max="couponInfo.dayTopLimit" @minus="add(-1)" @plus="add(1)"/>
          </div>
        </div>
        <div class="amountNum">合计：￥<span class="redP">{{ amount }} </span>元</div>
      </div>
    </div>
    <div class="titlePay">支付方式</div>
    <div class="info" style="padding:5px">
      <van-cell v-for="(item, index) in payMethodList" :key="index">
        <van-radio :name="item.code" :value="item.code" v-model="paytype">{{
          item.type
        }}</van-radio>
      </van-cell>
    </div>
    <!-- <div class="info" style="padding:5px">
      <van-cell>
        <van-radio name="1" value="1" v-model="paytype">微信支付</van-radio>
      </van-cell>
      <van-cell>
        <van-radio name="2" value="2" v-model="paytype">会员支付</van-radio>
      </van-cell>
    </div> -->
    <div class="card" v-if="memberInfo!=null&&paytype=='1'">
      <div class="cardTitle">会员卡</div>
      <div>卡号：{{memberInfo.cardNo}}</div>
      <div>余额：{{memberInfo.balance}}</div>
      <div>积分：{{memberInfo.score}}</div>
    </div>
    <div class="divsubmit" style="margin:0;width:100%">
      <button class="submit" style="margin: 0 auto;" @click="submit">提交</button>
    </div>
  </div>
</template>
<script>
import axiosurlService from "../../../resource/axiosurlService";
export default {
  data() {
    return {
      paytype: 0,

      qty: 1,
      amount: 0.00,
      payMethodList: [],
      couponInfo: {},
      memberInfo: null,
    };
  },
  created() {
    var query = this.$route.query;
    console.log(query);



    axiosurlService.getCouponPayMethod().then(rs => {
      console.log(rs);
      if (rs.data.success) {
        this.payMethodList = rs.data.data;
      }
    });
    var paras = {
      id: query.marketId,
    };
    axiosurlService.getMarketById(paras).then(rs => {
      console.log(rs);
      if (rs.data.success) {
        this.couponInfo = rs.data.data;
        this.add(0);

      }
    });
    this.add(0);
    axiosurlService.userdetail().then(rs => {
      console.log(rs);
      if (rs.data.success) {
        this.memberInfo = rs.data.data;
      }
    });

  },
  methods: {
    add(num) {
      
      if (num + this.qty < 1) {
        return;
      }
      this.qty += num;
      this.amount = this.qty * this.couponInfo.price;
    },
    submit() {
      if (this.paytype == "" || this.paytype == null) {
        this.$toast("请先选择支付方式!");
        return;
      }
      if (this.paytype == "1") {
        if (this.memberInfo == null) {
          this.$toast("您没有注册会员,请先注册!");
          return;
        }
      }

      var query = this.$route.query;
      var dto = {
        marketingId: query.marketId,
        qty: this.qty,
        cardNo: null,
      };
      axiosurlService.buyCoupon(dto).then(rs => {
        console.log(rs);
        if (rs.data.success) {

          var callBack = "/api/v1/market/sellCouponCallback?recordId=" + rs.data.data.id;
          var cardNo = this.memberInfo.cardNo;
          var payAmount = rs.data.data.sellPrice;

          var code = this.paytype;


          var mkurl = axiosurlService.urlCommon + "/userauth/page?hotelcode=" + rs.data.data.tenantCode;

          // mkurl+="#/marketing/marketing";
          var frontUrl = mkurl;
          var url = "/api/online/pay/commonPay?code=" + code + "&cardNo=" + cardNo + "&payAmount=" + payAmount +
            "&callBack=" + callBack + "&tenantCode=" + rs.data.data.tenantCode + "&frontUrl=" + frontUrl;

          console.log(url);
          // return;
          window.location.href = url;

        } else {
          this.$toast("购买失败：" + rs.data.message);
        }
      });
    }
  }
};
</script>
<style scoped>
.couponPay .title {
  text-align: center;
  font-size: 25px;
}
.van-card__title {
  margin-top: 15px;
}
.info {
  border: rgba(171, 171, 171, 0.3) 1px solid;
  border-radius: 5px;
}
.row {
  display: inline;
  font-size: 15px;
}
.divsubmit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  position: absolute;
  bottom: 5px;
  margin: 0 20px;
  right: 10px;
}
.submit {
  justify-content: space-around;
}
</style>
<style lang='less' src='./less/payPassword.less'>
</style>


