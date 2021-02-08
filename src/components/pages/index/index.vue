<template>
  <div class="tansincontent">
    <!-- <v-header titles='香水湾度假酒店' isshow='yes'></v-header> -->
    <div class="contentPart">
      <div class="banner">
        <van-swipe :autoplay="3000" :height="189" @change="onChange">
          <van-swipe-item v-for="(image, index) in bannerList" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="partTwo">
        <div class="contentDate">
          <div class="contentText">
            <div class="address clearfix">
              <div class="fl" @click="goSerchCity()">
                <span class="icon">
                  <img src="./images/address.png" />
                </span>
                <span class="text" v-html="nowCity"></span>
              </div>
              <div class="fr" @click="reGetPos()">
                <span class="icon">
                  <img src="./images/serch.png" />
                </span>
                <span class="text"></span>
              </div>
              <!-- <div class="fr" @click="serchNearby()">
                <span class="icon">
                  <img src="./images/serch.png" />
                </span>
                <span class="text">搜附近</span>
              </div>-->
            </div>
            <div class="date " @click="goCalender()">
              <div class="list ">
                  <div class="icon ">
                    <img src="./images/calender.png" />
                  </div>
                  <div class="">
                    <div>{{startDate}}</div>
                    <div>{{{0:'周日',1:'周一',2:'周二',3:'周三',4:'周四',5:'周五',6:'周六'}[startWeek]}}入住</div>
                  </div>
              </div>
              <div class=" line">————</div>
              <div class="">
                <div>
                  <div>{{endDate}}</div>
                  <div>{{{0:'周日',1:'周一',2:'周二',3:'周三',4:'周四',5:'周五',6:'周六'}[endWeek]}}离店</div>
                </div>
              </div>
            </div>
            <div class="serch clearfix">
              <!-- <div class="serch clearfix"  @click='goIndexSerch()'> -->
              <div class="icon fl">
                <img src="./images/shai.png" />
              </div>
              <div class="input fl">
                <input type="text" v-model="hotelName" placeholder="搜索酒店" />
              </div>
            </div>
            <div class="serchButton" @click="HotelSerch()">查询酒店</div>
          </div>
        </div>
      </div>
      <div class="partThree">
        <div class="partList" v-if="recommendedList.length>0">
          <div class="partTitle">酒店推荐</div>
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index) in recommendedList" :key='index' @click="goOrderHouse(item.tenantCode)">
                  <div class="itemImg">
                    <img :src='item.image64'   @click="goOrderHouse(item.hotelCode)"/>
                    <div class="tuijian" >推荐</div>
                  </div>
                  <div class="itemText">
                    <p class="name">{{item.hotelName}}</p>
                    <p class="rate" v-if="item.goodEvaRate>0">好评率：{{item.goodEvaRate}}%</p>
                  </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="partList"  v-if="tourStraegyList.length>0">
          <div class="partTitle">游玩攻略</div>
              <p class="tipText">景点打卡</p>

          <div class="gonglue" style="" v-for="(item,index) in tourStraegyList" :key="index">
          <img :src='item.imageUrl'  @click="goTourStrategy(item.id)"/>
          <span  class="centertext" >{{item.name}}</span>
          </div>
        </div>
        <div class="partList" v-if="newShowList.length>0" >
          <div class="partTitle">新品酒店</div>
          <div class="gonglue" v-for="(item,index) in newShowList" :key="index">
             <img :src='item.imageUrl'  @click="goOrderHouse(item.hotelCode)"/>
             <div style="width:100%;text-align:center;margin-bottom:25px">{{item.hotelName}}</div>
            <!-- <img src="./images/hotile.png"/> -->
          </div>
        </div>
      </div> 
    
    </div>
    <v-footer :isactive="0"></v-footer>
    <van-popup v-model="show" class="popDiv" style='background:none !important; overflow: initial'>
          
          <div class="popbg" v-if='popData'  > 
             <div class="closeIcon" @click='closePop'></div>
             <div class="coupon clearfix">
              
                <div class="money fl">￥<span>{{popData.value}}</span> X {{popData.couponCount}}</div>
                 <div class="tip fl">
                    <div class="tipText">元优惠券</div>
                    <div class="tipButton">等您来拿</div>
                 </div>
             </div>

             <div @click="receiveCoup" class="getButton"></div>
          </div>
    </van-popup>

  </div>
</template>
   <script src="http://api.map.baidu.com/api?v=2.0&amp;ak=IcP3qAe2btCkOEmuYfWzbhR3uSVGrDzr" type="text/javascript">
</script>
<script>
import Vue from "vue";
import moment from "moment";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import axiosurlService from "../../../resource/axiosurlService";
// import "http://api.map.baidu.com/api?v=2.0&amp;ak=IcP3qAe2btCkOEmuYfWzbhR3uSVGrDzr";
// import { calendarSwitch } from "./js/calender.js";

// import getBaseAppInfo from "../../../resource/axiosurlService";
export default {
  name: "index",
  data() {
    return {
      page: 0,
      show: false,
      bannerList: [],
      value: null,
      roomtypelist: null, //房间类型
      current: 0,
      hotelName: "",
      i: -1,
      code: null,
      money: null,
      food: null,
      rtCode: null,
      openid: null,
      paytype: "",
      nowCity: "",
      cityCode: "", //城市代码
      basewecharInfo: {},
      startDate: null,
      endDate: null,
      days: null,
      startWeek: null,
      endWeek: null,
      hotelName: null, // 酒店名称
      longitude: null,
      latitude: null,
      archives: null, //酒店周边id
      popData:null,
      swiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 14,
           freeMode: true,
      },
   
      newShowList:[],
      tourStraegyList:[],
      recommendedList:[
        // {
        //   image:require('./images/image1.png'),
        //   hotileName:'天津大酒店',
        //   rate:'90'
        // },
        // {
        //   image:require('./images/image2.png'),
        //   hotileName:'天津大酒店',
        //   rate:'90'
        // },
        // {
        //   image:require('./images/image1.png'),
        //   hotileName:'天津大酒店',
        //   rate:'90'
        // },
        // {
        //   image:require('./images/image2.png'),
        //   hotileName:'天津大酒店',
        //   rate:'90'
        // },
        // {
        //   image:require('./images/image1.png'),
        //   hotileName:'天津大酒店',
        //   rate:'90'
        // },
        // {
        //   image:require('./images/image2.png'),
        //   hotileName:'天津大酒店',
        //   rate:'90'
        // },
        // {
        //   image:require('./images/image1.png'),
        //   hotileName:'天津大酒店',
        //   rate:'90'
        // },
        // {
        //   image:require('./images/image2.png'),
        //   hotileName:'天津大酒店',
        //   rate:'90'
        // },


      ]
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {},
  created() {
    let that = this;

    // alert(citycode);
    // var geolocation = new BMap.Geolocation();
    // var point =  {lng: 117.21081309,lat: 39.1439299};
    // var point =  {lng: 117.115906,lat: 39.089718};
    // this.toBaiduMap(point.lng,point.lat);
    // this.convertxy();
    // this.getAddress(point);
    // geolocation.getCurrentPosition(function(r){
    //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
    //   // alert(typeof(r.point));
    //   // alert(typeof(r.point.lat));
    //           that.getAddress(r.point);

    //     }else {
    //         alert('failed'+this.getStatus());
    //     }
    // });
  },
  methods: {
    receiveCoup(){
      let that = this;
      let param = {
        promoId:that.popData.promotionId
      } //请求参数
      axiosurlService.receiveCoup(param).then(response => {
        let responseData = response.data;
            if(responseData.success == true) {
              that.show=false;
                that.$toast("领取成功");
            } else {
                if(responseData.statusCode==1001){
                   that.$dialog.confirm({
                      title: '操作提示',
                      message: '需要注册为会员才能领取优惠券，是否去注册？'
                    }).then(() => {
                      // on confirm
                       that.$router.push({
                        path: "/register/register",
                        query:{
                           
                        }
                        });
                    }).catch(() => {
                      that.IndexShow=false;
                    });
                }else{
                    this.$toast(responseData.message);
                }
               
            }
	      })

    },
    closePop(){
      this.show = false;
    },
    reGetPos() {
      this.nowCity = "";
      this.cityName = "";
      // this.getPosition();
      this.loadpos11();
    },
    getCurrentCity(longitude, latitude) {
      //获取当前城市,行政区 // 百度地图API功能
      let address = "";
      let point = new BMap.Point(longitude, latitude);
      let gc = new BMap.Geocoder();
      var that = this;
      gc.getLocation(point, function(rs) {
        let addComp = rs.addressComponents;
        //详细地址为省，市，行政区，街道，街道地址
        address =
          addComp.province +
          ", " +
          addComp.city +
          ", " +
          addComp.district +
          ", " +
          addComp.street +
          ", " +
          addComp.streetNumber;
        // alert(address);

        // if (that.nowCity == "" || that.nowCity == null) {
        that.nowCity = addComp.city;
        that.cityNameToCode(); //请求当前城市代码

        // }

        window.localStorage.city = addComp.city; //当前城市
        window.localStorage.district = addComp.district;
      });
    },

    toBaiduMap(x, y) {
      var ggPoint = new BMap.Point(x, y);
      var pointArr = [];
      pointArr.push(ggPoint);
      var convertor = new BMap.Convertor();
      convertor.translate(pointArr, 1, 5, this.translateCallback);
    },
    translateCallback(data) {
      if (data.status === 0) {
        if (data.points[0] != null) {
          this.getAddress(data.points[0]);
        }
      }
    },
    // getAddress(point) {
    //   let that = this;
    //   console.log(point);
    //   var gc = new BMap.Geocoder();
    //   gc.getLocation(point, function(rs) {
    //     var addComp = rs.addressComponents;
    //     var address =
    //       addComp.province +
    //       addComp.city +
    //       addComp.district +
    //       addComp.street +
    //       addComp.streetNumber; //获取地址
    //     if (that.$route.query.cityName) {
    //       that.nowCity = that.$route.query.cityName;
    //     } else {
    //       that.nowCity = addComp.city;
    //     }
    //     if (!that.$route.query.cityCode) {
    //       that.cityNameToCode(); //请求当前城市代码
    //     } else {
    //       this.cityCode = this.$route.query.cityCode;
    //     }
    //   });
    // },
    onChange(index) {
      this.current = index;
    },
    getPosition() {
      console.log(this.basewecharInfo);
      var appId = this.basewecharInfo.appId;
      var timestamp = this.basewecharInfo.timestamp;
      var nonceStr = this.basewecharInfo.noncestr;
      var signature = this.basewecharInfo.signature;
      var that = this;
      //接口入住权限验证配置
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的s时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["getLocation", "translateVoice"],
          jsApiList: [
            "getLocation",
            "checkJsApi",
            "startRecord",
            "stopRecord",
            "translateVoice",
            "scanQRCode",
            "openCard"
          ],
          success: function(res1) {
            console.log(res1);
            if (res1.checkResult.getLocation == false) {
              alert(
                "你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！"
              );
              return;
            } else {
              that.loadpos11();
            }
          }
        });
        wx.error(function(res) {
          console.log(res);
   
        });
      });

      wx.getLocation({
        success: function(res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          that.longitude = longitude;
          that.latitude = latitude;
          console.log(res);
          // alert(longitude);
          // that.toBaiduMap(longitude, latitude);
          that.getCurrentCity(longitude, latitude);
        },
        cancel: function(res) {
          alert("用户拒绝授权获取地理位置");
        }
      });
    },
    loadpos11() {
      var that = this;
      wx.getLocation({
        success(res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          that.longitude = longitude;
          that.latitude = latitude;
          console.log(res);
          // that.toBaiduMap(longitude, latitude);

          that.getCurrentCity(longitude, latitude);
        },
        cancel: function(res) {
          alert("用户拒绝授权获取地理位置");
        }
      });
    },
    loadBaseApp() {
      var url = location.href.split("#")[0];
      var pars = "?url=" + url;
      axiosurlService.getBaseAppInfo(pars).then(data => {
        if (data.data.success) {
          this.basewecharInfo = data.data.data;
          this.getPosition();
        }
      });
    },
    goSerchCity() {
      //搜城市
      this.$router.push({
        path: "/citySerch/citySerch"
      });
    },
    serchNearby() {
      //搜附近
      this.$router.push({
        path: "/houseList/houseList",
        query: {
          cityCode: this.cityCode,
          cityName: this.nowCity,
          hotelName: this.hotelName,
          longitude: this.longitude,
          latitude: this.latitude,
          archives: this.archives,
          startDate: this.startDate,
          endDate:this.endDate,
          days:this.days
        }
      });
    },
    goCalender() {
      //点击日历
      this.$router.push({
        path: "/calender/calender",
        query: {
          from: "index"
        }
      });
    },
    goIndexSerch() {
      //点击搜索框
      //alert(this.cityCode)
      this.$router.push({
        path: "/indexSerch/indexSerch",
        query: {
          cityCode: this.cityCode
        }
      });
    },
    HotelSerch() {
      //酒店查询

      this.$router.push({
        path: "/houseList/houseList",
        query: {
          cityCode: this.cityCode,
          cityName: this.nowCity,
          hotelName: this.hotelName,
          longitude: this.longitude,
          latitude: this.latitude,
          archives: this.archives,
          startDate: this.startDate,
          endDate:this.endDate,
          days:this.days
        }
      });
    },
    getbanner() {
      let that = this;
      let param = {}; //请求参数
      axiosurlService.getGroupbanner(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          that.bannerList = responseData.data; //酒店banner
          console.log(that.bannerList);
        } else {
          that.$toast(responseData.message);
        }
      });
    },
    cityNameToCode() {
      let that = this;
      let param = {
        name: that.nowCity
      }; //请求参数
      axiosurlService.cityNameToCode(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
           that.cityCode = responseData.data; //城市代码
        } else {
          that.$toast(responseData.message);
        }
      });
    },
    getpromotion() {
      let that = this;
      let param = {
        type: 1,
        roomCount:null,
        orderAmount:null,
        rateCode:null,
      }; //请求参数
      axiosurlService.getpromotion(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          if(responseData.data){
             that.popData= responseData.data;
             that.show  = true
          }else{
            that.show  = false
          }
        } else {
          that.$toast(responseData.message);
        }
      });
    },
    getMaxDays(){
      axiosurlService.getMaxDays({}).then(response => {
        let maxdaysRet = response.data; 
           if (maxdaysRet.success == true) {
               window.localStorage.setItem("maxdays", maxdaysRet.data); //存入openid
           }
      })
    },
    loadRecHotel(){
      // return;
      axiosurlService.getRecommendedList().then(rs=>{
        // console.log(rs);
       if(rs.data.success)
       {
        //  alert(1);
         this.recommendedList=rs.data.data;
           console.log("getRecommendedList");
           console.log(this.recommendedList);
         this.$forceUpdate();
       }

      });
      axiosurlService.getNewHotelList().then(rs=>{
        // console.log(rs);
       if(rs.data.success)
       {
         this.newShowList=rs.data.data;
       console.log("getNewHotelList");
         console.log(this.newShowList);
         this.$forceUpdate();
       }

      });
        axiosurlService.getScenicSpotList().then(rs=>{
       if(rs.data.success)
       {
         this.tourStraegyList=rs.data.data;
       console.log("getScenicSpotList");
         console.log(this.tourStraegyList);
         this.$forceUpdate();
       }
        });
    },
      goOrderHouse(code){
        // alert(code);
        // return;
        window.localStorage.setItem("tenantcode", code)
         this.$router.push({
          path: "/houseReservation/houseReservation",
          // query:{
          //   days:this.days,
          //   startDate:this.startDate,
          //   endDate:this.endDate

          // }
        });
    },
     goTourStrategy(id){
        // alert(id);
        // return;
        // window.localStorage.setItem("tenantcode", code)
        //  this.$router.push({
        //   path: "/houseReservation/houseReservation",
        //   query:{
        //     days:this.days,
        //     startDate:this.startDate,
        //     endDate:this.endDate

        //   }
        // });
         this.$router.push({
          path: "/tourStrategy/tourStrategy",
          query:{
            tourId:id,
            // startDate:this.startDate,
            // endDate:this.endDate

          }
        });
    },
  },
  
  mounted() {

  
    var cityCode = this.$route.query.cityCode;
    var cityName = this.$route.query.cityName;
    document.title="预订酒店";
    if (
      cityCode != null &&
      cityCode != "" &&
      cityName != null &&
      cityName != ""
    ) {
      this.cityCode = cityCode;
      this.nowCity = cityName;
    } else {
      this.loadBaseApp();
      //  this.reGetPos();
    }
    //存入openid
    let openid = this.$route.query.openid;
    if (!openid) {
      openid = window.localStorage.getItem("openid");
    } else {
      window.localStorage.setItem("openid", openid); //存入openid
    }
    //debugger;
    this.openid = openid;
    // let openid = '36565656562222';
    let tenantcode = this.$route.query.tenantcode;
    let usertoken = this.$route.query.usertoken;
    if (!tenantcode) {
      //不存在酒店代码
      tenantcode = window.localStorage.getItem("tenantcode");
    } else {
      //存在酒店代码
      window.localStorage.setItem("tenantcode", tenantcode); //存入tenantcode
    }

    if(usertoken){ //如果存在usertoken
      window.localStorage.setItem("usertoken", usertoken); //存入usertoken
    }

    let group = this.$route.query.isgroup;
    if(group){
      window.localStorage.setItem("isgroup",group);
 
    }

    //this.getPosition();

    //处理日期
    let nowDate = new Date();
    let nextDate = new Date(nowDate.getTime() + 24*60*60*1000); //后一天
    let nowStart =nowDate.getFullYear() + "-" +(nowDate.getMonth() + 1) + "-" +nowDate.getDate();
    let nowEnd = nextDate.getFullYear() +"-" +(nextDate.getMonth() + 1) + "-" +nextDate.getDate();
    if (this.$route.query.startDate) {
      this.startDate = this.$route.query.startDate;
    } else {
      this.startDate = nowStart;
    }
    if (this.$route.query.endDate) {
      this.endDate = this.$route.query.endDate;
    } else {
      this.endDate = nowEnd;
    }
    //console.log(this.startDate+'开始日期')
   // console.log(this.endDate+'开始日期')
    this.days = this.$route.query.days ||1;
    this.startWeek = new Date(this.startDate + "").getDay();
    this.endWeek = new Date(this.endDate + "").getDay();
    this.hotelName = this.$route.query.hotelName;
    this.archives = this.$route.query.archives;
    console.log(this.nowCity);
    this.getbanner();
    this.getpromotion();
    this.getMaxDays();

    this.loadRecHotel();
  }
};
</script>

<style lang='less' src='./less/index.less'>
// .centertext{
//     text-align: center;
//         width: 300px;
//         border: 3px solid #000;
//         float: left;
//         font-size: 22px;
// }

</style>
     
