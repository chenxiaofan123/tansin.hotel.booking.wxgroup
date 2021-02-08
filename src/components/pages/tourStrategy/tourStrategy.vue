<template>
  <div class="tansincontent">
    <div class="houseDetail">
      <!-- <div class="banner">
           <img :src="scenicDetail.imageUrl" style="height:200px;" />
        <van-swipe :autoplay="3000" :height="200" @change="onChange">
          <van-swipe-item v-for="(image, index) in bannerList" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
      </div> -->

      <div class="detailText">
        <div class="detailPart">
          <div class="detailTitle">
            <van-divider :style="{ color: '#404040', fontSize: '16px' }">景点介绍</van-divider>
          </div>
          <div class="article">
            <!-- <div class="imgIcon"><img src='./images/icon.png'/></div> -->
            <div v-html="scenicDetail.article"></div>
          </div>
        </div>
        <div class="detailPart">
          <div class="detailTitle">
            <van-divider :style="{ color: '#404040', fontSize: '16px' }">附近酒店</van-divider>
          </div>
          <div class="detailList" v-if="scenicDetail.hotels">
            <!-- <table style="border:1px solid red"> -->
              <div
                class="list clearfix"
                v-for="(item,index) in scenicDetail.hotels"
                :key="index"
                @click="goOrderHouse(item.hotelCode)"
              >
                <!-- <tr v-if="index%2==0"> -->
                    <!-- <td  style="border:1px solid red"> -->
                  <div class="centerimg" >
                    <img style="display:inline" :src="item.image64" />
                    <span  class="centertext" style="width:100%">{{item.hotelName}}</span>
                  </div>
                  <!-- </td> -->
                <!-- </tr> -->
              </div>
            <!-- </table> -->
            <!-- <div class="fl"> -->

            <!-- </div> -->
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
      bannerList: [],
      current: 0,
      shortRemark: null,
      isShort: false,
      hotelInfo: {},
      tourId: "",
      scenicDetail: { article: "" }
    };
  },
  components: {},
  watch: {},
  methods: {
    onChange(index) {
      //   this.current = index;
    },
    // getHotelInfo(){
    //   let that = this;
    //   let param = {} //请求参数
    //  	axiosurlService.getHotelInfo(param).then(response => {
    //         let responseData = response.data;
    //             if(responseData.success == true) {
    //                that.hotelInfo = responseData.data //酒店信息
    //                console.log(that.hotelInfo)
    //                that.shortRemark  = responseData.data.hotelRemark.substr(0,80);
    //                console.log(that.shortRemark)
    //             } else {
    //                 this.$toast(responseData.message);
    //             }
    // 		 })
    // },

    //  getbanner(){
    //    let that = this;
    //   let param = {}; //请求参数
    //   axiosurlService.getbanner(param).then(response => {
    //     let responseData = response.data;
    //     if (responseData.success == true) {
    //        that.bannerList = responseData.data; //酒店banner
    //     } else {
    //       this.$toast(responseData.message);
    //     }
    //   });
    // },
    showDetail() {
      axiosurlService.getScienceDetailById("Id=" + this.tourId).then(rs => {
        // let responseData = response.data;
        if (rs.data.success == true) {
          this.scenicDetail = rs.data.data; //酒店banner
          console.log(this.scenicDetail);
        } else {
          this.$toast(rs.data.message);
        }
      });
    },
    goOrderHouse(code) {
      // alert(code);
      // return;
      window.localStorage.setItem("tenantcode", code);
      this.$router.push({
        path: "/houseReservation/houseReservation"
        // query:{
        //   days:this.days,
        //   startDate:this.startDate,
        //   endDate:this.endDate

        // }
      });
    }
  },
  mounted() {
    //  this.getHotelInfo();
    //  this.getbanner();
    var query = this.$route.query;
    this.tourId = query.tourId;
    this.showDetail();
    // alert(tourId);
  }
};
</script>

<style scoped>
   .centerimg {
        width: 100%;
        width:50%;
        margin: auto;
        margin-top: 10px;
        /* background-color: skyblue; */

    }
.centerimg img {
     border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
        
    }
    .centerimg span {
     border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
        
    }
    .centerimg * {
        /* background-color: springgreen; */
        width:100%;
        margin:0 auto;
        text-align: center;
        float: left;
        font-size: 15px;
        
    }
    .article{
        font-size: 12px;
        margint:10px;
    }
    .detailPart{
        margin: 10px;
    }
</style>



