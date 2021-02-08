<template>

  <div class="orderContent">
    <van-tabs id="van-tabs" @click="onClick" v-model="active">
      <van-tab :title="item.display" v-for="(item,index) in tabs" :key='index' :value="item.satate"> </van-tab>
    </van-tabs>
    <div style="margin-top:56px">
      <van-empty v-if="orderList.length<=0" description="暂无数据" class="empty-bgc" />
      <div class="orderAll" v-for="(item,index) in orderList" :key="index">
        <div class="orderList clearfix" @click.stop="goOrderDetailA(item.id)">
          <div class="orderTitle clearfix">
            <div class="fl">{{item.hotelName}}-{{item.roomTypeName}}</div>
            <div class="fr status">{{{0:'待确定',1:'已确认',2:'已取消',3:'入住',9:'完成',10:'已退款',99:'应到未到'}[item.state]}}</div>
                </div>
                <div class="fl">
                <img src="./images/address.png" />
                {{item.hotelAddress}}
                </div>
                <div class="fl">
                <img src="./images/calender.png" /> 入住：
                <span>{{item.checkinDate}}</span>&nbsp;&nbsp; 离店：
                <span>{{item.checkoutDate}}</span>
                &nbsp;&nbsp; 共{{item.days}}晚
                </div>
            </div>
            <div class="orderButton clearfix">
                <div class="fl money">￥{{item.totalAmount}}</div>
                <div class="fr">
                    <div class="goPay fr" v-if="item.state==9&&item.hasEvaluated==0" @click="evaulateOrder(item)">评价</div>
                    <div class="goPay fr" v-if="item.payResult==0&&(item.state==0)"  @click="orderPay(item)">继续支付</div>      
                    <div class="clear fr" v-if="item.enableCancle " @click.stop="cancleOrder(item.id)">取消订单</div>
                    <div v-if="state=='101'" class="copyBtn fr" v-clipboard:copy="item.shareUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">
                        <img src="./images/copy.png" alt="">
                    </div>
                </div>
            </div>
        </div>     
    </div>  
  </div>
</template>

<script>
import Vue from "vue";
import axiosurlService from "../../../resource/axiosurlService";
export default {
  name: "index",
  data() {
    return {
      orderList: [],
      active: 1,
      state: 101,
      tabs: [
        {
          state: '000',
          display: "全部",
        },
        {
          state: 101,
          display: "团购",
        }, {
          state: 103,
          display: "预购",
        }, {
          state: 100,
          display: "秒杀",
        }

      ],
    };
  },
  components: {},
  watch: {},
  methods: {
    goOrderDetailA(id) {
      let that = this;
      that.$router.push({
        path: "/ordering/orderingUndone",
        query: {
          orderId: id
        }
      });
    },
    orderPay(item) {
      let that = this;
      var OrderNo = item.orderNo;
      that.$router.push({
        path: "/pay/pay",
        query: {
          orderNo: OrderNo
        }
      });
    },
    getAllOrder(state) {
      let param = {
        typeCode: state,
        page: 0,
        size: 0
      }; //请求参数
      this.orderList = [];
      axiosurlService.getAllMarketOrder(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          this.orderList = responseData.data; //酒店列表

          if (responseData.data == null || responseData.data.length == 0) {
            //订单数据");
          }
        } else {
          this.$toast(responseData.message);
        }
      });
    },
    forbidback() {
      let that = this;
      that.$router.push({
        path: "/myCenter/myCenter",
      });

    },
    cancleOrder(id) {
      let that = this;
      let param = {
        orderId: id //查询条数
      }; //请求参数
      axiosurlService.cancleOrder(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          that.$toast("订单取消成功");
          that.getAllOrder(this.state);
        } else {
          that.$toast("取消失败，请联系酒店" + responseData.message);
        }
      });
    },
    changeState(item) {
      alert(item);
    },
    onClick(name, title) {
      var state = 0;
      this.tabs.forEach(element => {
        if (element.display == title) {
          state = element.state;
          this.state = state;
        }
      });
      // alert(state);
      this.getAllOrder(state);


    },
    evaulateOrder(item) {
      let that = this;
      var OrderNo = item.orderNo;
      that.$router.push({
        path: "/comment/comment",
        query: {
          OrderNo: OrderNo
        }
      });
    },

    onCopy: function (e) {
      this.$toast("复制成功,分享给微信好友进行拼团~~");
    },
    onError: function (e) {
      this.$toast("复制失败");
    }

  },
  mounted() {
    //debugger
    // let state = this.$route.query.state;

    // switch (state) {
    //   case 102:
    //     this.active = 5;
    //     break;
    //   case 11:
    //     this.active = 1;
    //     break;
    //   default:
    //     break;
    // }
    // history.pushState(null, null, document.URL)
    // window.addEventListener('popstate', this.forbidback);
    //  if(state==102)
    //  {
    //    this.active=4;
    //  }
    this.getAllOrder("101");


  }
};
</script>

<style lang='less' src='./less/orderList.less'>
// .orderContent{
//     .van-tabs__line{
//         bottom: 0.4rem !important;
//     }
// }
</style>


