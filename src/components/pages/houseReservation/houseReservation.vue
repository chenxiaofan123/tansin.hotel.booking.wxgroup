<template>
  <div class="contentResveration">
        <div class="houseDetail" >
             <div class="banner">
                <van-swipe  :autoplay="3000" :height='200'>
                    <van-swipe-item v-for="(image, index) in bannerList" :key="index">
                       <img :src="image"/>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="mapContent">
                <div class="topContent">
                    <div class="titleBlock">
                      <div class="mapTitle" >{{hotelInfo.hotelName}}</div>
                      <!-- <van-button class="activityBtn" @click="gotoMarketing" v-if="showMarketing">酒店促销活动</van-button> -->
                    </div>
                    <van-notice-bar text="酒店促销活动" left-icon="volume-o" mode="link" :scrollable="true" @click="gotoMarketing" v-if="showMarketing" />
                    <div @click="gotoDetail()" class="mapbg">
                        {{hotelInfo.address}}
                    </div>
                </div>
                <div class="mapCommon clearfix"  @click="goComment()">
                        <div class="fl"><span>{{hotelInfo.averageScore}}</span> 分&nbsp;极赞</div>
                        <div class="fr">{{hotelInfo.evaluateCount}}条评论<span class="icon"> <img src="./images/arrowRight.png"/></span></div>
                </div>
                <div class="calenderTab clearfix" @click="goCalender()">
                    <div class="fl"><span class="calender fl"><img src="./images/calender.png"/></span> <span style="position: relative;top:2px">{{startDate}} - {{endDate}}</span> </div>
                    <div class="fr">入住{{days}}晚 <span class="icon"> <img src="./images/arrowRight.png"/></span></div>
                </div>
                <!-- <div class="advTab clearfix">
                    <div class="bgTab"><img src="./images/BANNER.png"/></div>
                </div> -->
            </div>
            <div class="roomContent">
                <van-tabs  @click="onClick"  v-model="active" >
                    <van-tab :title="item.roomTypeName" v-for="(item,index) in roomTabList" :key='index' > </van-tab>
                </van-tabs>
              
                <div class="roomPart" v-for="(item,index) in roomtypelist" :key ='index'  v-if='item.rateList.length != 0'>
                    <div>
                     <!-- <img :src="item.shortImage" style="width:80px;height:80px;margin:0 20px 0 20px"/> -->
                </div>
                    <div class="roomTop clearfix">
                      <div class="roomImgs">
                        <img :src="item.shortImage" />
                      </div>
                      <div class="fl" @click='popDiv(index)' style="width:140px">
                        <span class="fl">
                          <div style="height:auto;overflow: hidden;">
                            <b class="fl">{{item.rtName}}</b>
                            <span class="icon1 fl"></span>
                          </div>
                          <div class="attribute" v-html="(item.bedType==null?'':item.bedType+' &nbsp ')+''+(item.size==0?'':item.size+'㎡')"></div>
                        </span> 
                        
                      </div>
                      <div class="fr" v-if="item.isClose" style='position: absolute;right:15px;color:rgba(167,168,170,1)' >已售完</div>
                    
                      <div class="fr roomRight" v-else>
                        <!-- <div>¥ <b>{{item.price}}108</b> 起</div>
                        <span>¥{{item.originalPrice}}288 (门市价)</span > -->
                      <!-- <span class="icon2" @click='showTab(index)'></span> -->
                      </div>
                    </div>
                    <!-- v-if="istab && key===index " -->
                    <div class="roomList" v-if="!item.isClose"  >
                        <div class="roomListBorder"  v-for="(list,index) in item.rateList" :key ='index'>
                            <div  class=" clearfix room ">
                                <div class="fl roomfl" style="width:60%">
                                    <div>{{list.rateName}}
                                        <span class="icon" ></span> 
                                        <!-- <span class="zhi" >超值</span> -->
                                    </div>
                                    <div >{{list.breakfast==0?'不':''}}赠送早餐 <span v-if="list.breakfast!=0">{{list.breakfast}}份</span> </div>
                                    <div >{{list.isFreeCancel?'可':'不可'}}免费取消</div>
                                </div>
                                <div class="fr roomfr">
                                    <div class="fr dingBtn" @click="checkinventory(list.rateCode,list.price,list.rtCode)">
                                        <div class="ding">订</div>
                                        <div class="online">{{list.payment}}</div>
                                    </div>
                                    <div class="fr dingMoney">
                                        <div class=" delMoney">¥{{list.originalPrice}}</div>
                                        <div class=" relMoney">¥{{list.price}}</div>
                                    </div>
                                </div>
                            </div>
                             <div class="moneyTip clearfix" v-if="list.proms.length!=0">
                                <div class="tipIcon" v-for='(proItem,index) in list.proms' :key ='index'><span class="song">送</span><span class="number"><i>{{proItem.promName}}</i></span></div>
                            </div>
                        </div>
                        <div v-if='index==i && show'>
                                <van-popup v-model='show'    style="border-radius:10px;background:#fff; ">
                                    <div class="popConetnt" >
                                            <div class="closeIcon" @click="close()"></div>
                                            <div class="title"> {{item.rtName}}</div>
                                             <div class="popBanner" style="margin-bottom:10px">
                                                <van-swipe  :height='180' >
                                                    <van-swipe-item v-for="(image, index) in  item.imageList" :key="index">
                                                    <img :src="image" style="width:100%;height:100%"/>
                                                    </van-swipe-item>
                                                </van-swipe>
                                            </div>
                                            <div class="popText clearfix">
                                                <div class="clearfix listTab">
                                                    <div class="list clearfix fl"><span></span><p class="fl">面积&nbsp;&nbsp;&nbsp;{{item.size}}平</p></div>
                                                    <!-- <div class="list clearfix fl"><span></span><p class="fl">床宽&nbsp;&nbsp;&nbsp;2米</p></div> -->
                                                </div>
                                                <div class="clearfix listTab">
                                                    <div class="list clearfix fl"><span></span><p class="fl">窗户&nbsp;&nbsp;&nbsp;{{item.window}}</p></div>
                                                    <div class="list clearfix fl"><span></span><p class="fl">床型&nbsp;&nbsp;&nbsp;{{item.bedType}}</p></div>
                                                </div>
                                                <!-- <div class="clearfix listTab">
                                                    <div class="list clearfix fl"><span></span><p class="fl">所在楼层&nbsp;&nbsp;&nbsp;4</p></div>
                                                </div> -->
                                                <div class="clearfix listTab">
                                                    <div class="list clearfix fl"><span></span><p class="fl">入住人数&nbsp;&nbsp;&nbsp;{{item.guestCount}}人</p></div>
                                                </div>
                                                <!-- <div class="clearfix listTab">
                                                    <div class="list clearfix fl"><span></span><p class="fl">上网形式&nbsp;&nbsp;&nbsp;网线/wifi</p></div>
                                                </div> -->
                                                <div class="clearfix listTab">
                                                    <div class="list clearfix fl"><span></span><p class="fl">详情</p></div>
                                                </div>
                                          
                                              <div  v-html="item.remark">
                                                      
                                                      </div>
                                             </div>
                                    </div>
                                </van-popup>
                            </div>
                       
                    </div>
                </div>
            </div>
      </div>
       <v-footer :isactive="0"  v-if='isGroup==0'></v-footer>
       <van-popup v-model="IndexShow" class="indexPopDiv" style='background:none !important;overflow: initial'>
          <div class="popbg"  v-if='popData' > 
             <div class="closeIcon" @click='closeIndexPop'></div>
             <div class="coupon clearfix">
                <div class="money fl">￥<span>{{popData.value}}</span> X {{popData.couponCount}} </div>
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

<script>
import Vue from "vue";
import axiosurlService from "../../../resource/axiosurlService";
export default {
  name: "index",
  data() {
    return {
      IndexShow:false,
      bannerList:null,
      hotelInfo:{
          hotelName:null
      },
      roomtypelist: null,
      shortRemark: null,
      show: false,

      istab:false,
      i: -1,
      key:0,
      startDate:null,
      endDate:null,
      days:null,
      active:-1,
      roomTabList:null,
      roomTypeCode:null,
      isGroup:1, //0 显示 1不显示
      popData:null,
      showMarketing:false,
    };
  },
  components: {},
  watch: {},
  methods: {

    loadMakreting(){
      axiosurlService.getMarketType().then(rs=>{
        console.log(rs);
        if(rs.data!=null&&rs.data.success&&rs.data.data!=null&&rs.data.data.length>0){
          this.showMarketing=true;
          
        }

      });
    },
    gotoMarketing(){
        this.$router.push({
            path: "/marketing/marketing",
            query: ""
          });
    },
    receiveCoup(){
      let that = this;
      let param = {
        promoId:that.popData.promotionId
      } //请求参数
      axiosurlService.receiveCoup(param).then(response => {
        let responseData = response.data;
            if(responseData.success == true) {
              that.IndexShow=false;
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
    closeIndexPop(){
      this.IndexShow = false;
    },
    popDiv(index) {
      this.i = index;
      this.show = true;
    },
    showTab(key){
        this.key = key ;
        console.log( this.tab)
        this.istab = true;
    },
    close() {
      this.show = false;
    },
    goCalender(){
        this.$router.push({
         path: "/calender/calender",
         query:{
             from:'houseReservation'
         }
        });
    },
    goComment(){
       this.$router.push({
         path: "/commonIndex/commonIndex",
         query:{
            // from:'houseReservation'
         }
        });
    },
    getallroomtype(){ //获取酒店所有房型
      let that = this;
      let param = {} //请求参数
     	axiosurlService.getallroomtype(param).then(response => {
            let responseData = response.data;
                if(responseData.success == true) {
                   that.roomTabList = responseData.data //酒店切换信息
                   that.roomTabList.unshift ({
                       roomTypeCode:null,
                       roomTypeName:'全部'
                   })
                   // that.roomTypeCode = responseData.data[0].roomTypeCode;
                   that.getroomandrate();
                } else {
                    that.$toast(responseData.message);
                }
			 })
    },
    gotoDetail(){
          this.$router.push({
            //跳转订单
            path: "/houseDetail/houseDetail",
            query: {
             
            }
          });
    },
    onClick(name, title){
        let that = this;
        for( var i=0 ;i<that.roomTabList.length ;i++){
            if(title== that.roomTabList[i].roomTypeName){
                that.roomTypeCode = that.roomTabList[i].roomTypeCode;
                that.getroomandrate()
            }
        }
        console.log(that.roomTypeCode)
        
    },
    getbanner(){ //获取酒店banner
      let that = this;
      let param = {} //请求参数
      axiosurlService.getbanner(param).then(response => {
        let responseData = response.data;
            if(responseData.success == true) {
                that.bannerList = responseData.data //酒店信息
            } else {
                this.$toast(responseData.message);
            }
	 })
    },
     getInfo(){
      let that = this;
      let param = {} //请求参数
     	axiosurlService.getHotelInfo(param).then(response => {
            let responseData = response.data;
                if(responseData.success == true) {
                   that.hotelInfo = responseData.data //酒店信息
                   document.title=that.hotelInfo.hotelName
                } else {
                    this.$toast(responseData.message);
                }
			 })
    },
     getroomandrate() {
      //查看酒店房型和价格
      let that = this;
      let param = {
        roomTypeCode: that.roomTypeCode, // 房型代码
        checkIn: that.startDate, // 入住日期
        checkOut:that.endDate //离店日期
      }; //请求参数
      axiosurlService.getroomandrate(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          that.roomtypelist = responseData.data; //酒店信息
        } else {
          this.$toast(responseData.message);
        }
      });
    },
    checkinventory(code,price,rtCode) {
      let that = this;
      let param = {
        roomTypeCode:rtCode, // 房型代码
        rateCode: code, //房价代码
        checkIn: that.startDate, // 入住日期
        checkOut:that.endDate //离店日期
      };
      axiosurlService.checkinventory(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          that.$router.push({
            //跳转订单
            path: "/ordering/ordering",
            query: {
              roomTypeCode: rtCode,
               rateCode: code,
               checkIn: that.startDate, // 入住日期
               checkOut:that.endDate //离店日期
            }
          });
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
             that.IndexShow  = true
          }else{
            that.IndexShow  = false
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
    }
  },
  mounted() {
    
    let tenantcode = this.$route.query.tenantcode;
    let usertoken = this.$route.query.usertoken;
    let pid = this.$route.query.pid;
    if (tenantcode) {
      //不存在酒店代码
      tenantcode = window.localStorage.setItem("tenantcode",tenantcode);
    } 
    if(usertoken){
      window.localStorage.setItem("usertoken", usertoken); //存入usertoken
    }
    this.isGroup = this.$route.query.isgroup;
    if(this.isGroup){
      window.localStorage.setItem("isgroup",this.isGroup);
    }else{
      this.isGroup = window.localStorage.getItem("isgroup");
    }
    this.loadMakreting();

     if(pid){
        this.$router.push({
            path: "/marketing/couponDetail",
            query: {
              pid:pid
            }
          });
     }
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
     this.days = this.$route.query.days||1;
     this.getallroomtype();
     this.getInfo()
     this.getbanner();
     this.getpromotion();
     this.getMaxDays();
  }
};
</script>

<style lang='less' src='./less/houseReservation.less'>
</style>

