<template>

  <div class="orderContent">
     <van-tabs id="van-tabs"  ref="tabs" @click="onClick"  v-model="active"  >
                    <van-tab :title="item.display" v-for="(item,index) in tabs" :key='index' :value="item.satate"> </van-tab>
                </van-tabs>
    <div style="margin-top:56px">
      <div
        class="orderAll"
        v-for="(item,index) in orderList"
        :key="index"
    
      >
        <div class="orderList clearfix"   @click.stop="goOrderDetail(item.id)">
          <div class="orderTitle clearfix" >
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
      active:0,
      state:100,
      tabs:[
         {
          state:100,
          display:"全部",
        },
           {
          state:11,
          display:"待入住",
        },
        // {
        //   state:0,
        //   display:"待确定",
        // },
        //    {
        //   state:1,
        //   display:"已确认",
        // },  
         {
          state:3,
          display:"入住中",
        },  
         {
          state:9,
          display:"已完成",
        }, 
          {
          state:10,
          display:"已退款",
        },  
        // {
        //   state:101,
        //   display:"已评论",
        // },
        {
          state:102,
          display:"待评论",
        }, {
          state:103,
          display:"团购",
        },
      ],
      isShows:true,
    };
  },
  components: {},
  watch: {
  },
  methods: {
    goOrderDetail(id) {
      let that = this;
      that.$router.push({
        path: "/ordering/orderingUndone",
        query: {
          orderId: id
        }
      });
    },
    orderPay(item){
        let that = this;
       var OrderNo=item.orderNo;
        that.$router.push({
          path: "/pay/pay",
        query: {
          orderNo: OrderNo
        }
      });
    },
    getAllOrder(state) {
    
      let param = {
        count: 1000, //查询条数
        orderNo: null, //订单号
        maxDate: null, //最大日期
        minDate: null, //最小日期
        state: state //订单状态 //查全部null
      }; //请求参数
      this.orderList=[];
      axiosurlService.getAllOrder(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          this.orderList = responseData.data; //酒店列表
        } else {
          this.$toast(responseData.message);
        }
      });
    },
         forbidback(){
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
          that.$toast("取消失败，请联系酒店"+responseData.message);
        }
      });
    },
    changeState(item){
        alert(item);
    },
      onClick(name, title){
        var state=0;
        this.tabs.forEach(element => {
          if(element.display==title)
          {
              state=element.state;
              this.state=state;
          }
        });
        // alert(state);
      this.getAllOrder(state);
     
        
    },
    evaulateOrder(item){
       let that = this;
       var OrderNo=item.orderNo;
      that.$router.push({
        path: "/comment/comment",
        query: {
          OrderNo: OrderNo
        }
      });
    }
  },
  mounted() {
     let state= this.$route.query.state;
     switch (state) {
       case 102:
         this.active=5;
         break;
       case 11:
         this.active=1;
         break;
       default:
         break;
     }
      history.pushState(null, null, document.URL)
        window.addEventListener('popstate', this.forbidback);
    //  if(state==102)
    //  {
    //    this.active=4;
    //  }
    this.getAllOrder(state);
  }
};
</script>

<style lang='less' src='./less/orderList.less'>

</style>

