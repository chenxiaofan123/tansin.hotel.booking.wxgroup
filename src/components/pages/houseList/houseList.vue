<template>
    <div class="tansincontent" style="background:#f6f6f6;height:100%">
        <!-- <v-header titles='优惠券' isshow='yes'></v-header> -->
        <div class="houseListBox">
            <div class="searchBox">
                <div class="address" @click="goSerchCity">{{cityName}}</div>
                <van-search
                v-model="serchValue"
                placeholder="搜索关键字/品牌/酒店..."
                shape="round"
                @click="onSearch"
                >
                </van-search>
                <!-- <img class="iconAddre" src="./images/address.png"/> -->
            </div>
            <van-dropdown-menu class="criteria" style="height:35px">
                <van-dropdown-item v-model="valueDate"  disabled :options="optionDate"  />
                <van-dropdown-item  v-model="valueDis" :options="optionDis" />
            </van-dropdown-menu>
            <div class="listBox">
                <!-- <van-tabs v-model="active">
                    <van-tab title="全季"></van-tab>
                    <van-tab title="全季"></van-tab>
                </van-tabs> -->
                <van-list  >
                    <div class="houseList" v-for="(item,index) in hotileList" :key="index" @click='goOrderHouse(item.code)'>
                        <div  class="imgBox">
                            <img  :src="item.thumbnail" />
                        </div>
                        <div class="addBox">
                            <h2>{{item.name}}</h2>
                            <span><img class="addImg" src="./images/add.png"/>距您{{item.distance/1000}}千米<b class="addI" v-for='(list,index) in hotileList.archives' :key ='index'>{{list}}</b></span>
                            <span><img class="addImg" src="./images/mes.png"/>共有{{item.commentQty}}条评论</span>
                            <span class="have" v-if='item.right!=null&&item.right.length>0'>享有权益</span>
                        </div>
                        <div class="moneyBox">
                            <span>￥<strong>{{item.floorPrice}}</strong><b class="colorGray">起</b></span>
                            <span>{{item.score}}分超赞！</span>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { RadioGroup, Radio ,DropdownMenu, DropdownItem} from 'vant';
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'coupon',
   data () {
    return {
        active:0,
        serchValue:"",
        valueDate: 0,
        valueDis:'distance',
        
        hotileList:[],
        optionDate: [
            { text: '', value: 0 },
        ],
        optionDis: [
            { text: '距离优先', value:'distance' },
            { text: '评分最好', value: 'score'},
        ],
        finished: false,
        loading: false,
        longitude:null,
        cityCode:null,
        latitude:null,
        cityName:null,
        archives:null,//酒店周边id
        days:null
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
    onSearch(){
        this.$router.push({
          path: "/indexSerch/indexSerch",
           query: {
            cityCode: this.cityCode,
            from:'housetList',
            cityName:this.cityName,
            startDate:this.startDate
          }
        
      });
       
    },
   goSerchCity() {

      //搜城市
      this.$router.push({
        path: "/citySerch/citySerch",
           query: {
          cityCode: this.cityCode,
          cityName: this.nowCity,
          hotelName: this.hotelName,
          longitude: this.longitude,
          latitude: this.latitude,
          archives: this.archives,
          startDate: this.startDate,
          backAddress:"/houseList/houseList"
        }
        //  query:{
        //         backAddress:"/houseList/houseList",
               
        //     }
      });
    },
    goOrderHouse( code){
        window.localStorage.setItem("tenantcode", code)
         this.$router.push({
          path: "/houseReservation/houseReservation",
          query:{
            days:this.days,
            startDate:this.startDate,
            endDate:this.endDate

          }
        });
    },
    getHotelList(){
        let that = this;
        let archlist =[];
        let searchTxt=that.serchValue;
        if(that.archives){
          archlist.push(that.archives);
          searchTxt="";
        }
        let param = {
            hotelName:searchTxt,//酒店关键名字
            minPrice:null,//
            maxPrice:null,
            cityCode:that.cityCode,
            longitude:that.longitude,
            latitude:that.latitude,
            sortField:that.valueDis,
            archives:archlist,
        }; //请求参数
       axiosurlService.getHotelList(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
           that.hotileList = responseData.data; //酒店banner
           console.log(that.hotileList)
        } else {
          that.$toast(responseData.message);
        }
      });
    },

  
    
  },
  mounted() {
        this.cityCode = this.$route.query.cityCode; //城市代码
        this.cityName = this.$route.query.cityName
        this.serchValue=this.$route.query.hotelName;//酒店名称
        this.latitude = this.$route.query.latitude;
        this.longitude = this.$route.query.longitude;
        this.archives = this.$route.query.archives;
        this.startDate = this.$route.query.startDate;
        this.optionDate[0].text =  this.startDate+'入住';
        this.endDate = this.$route.query.endDate;
        this.days = this.$route.query.days
             
        this.getHotelList()    
  }
}
</script>

<style lang='less' src='./less/houseList.less'>

</style>

