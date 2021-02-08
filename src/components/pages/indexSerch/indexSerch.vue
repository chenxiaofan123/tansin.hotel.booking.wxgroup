<template>
  <div class="content tansincontent">
    <div class="serchTop">
        <van-search
            v-model="value"
            placeholder="搜索关键字/品牌/酒店..."
            shape="round"
            @search="onSearch"
            >
        </van-search>
    </div>
    <div class="contentList">
        <!-- <div class="hotSerch">
            <div class="hotTitle">
                <img src="./images/hot.png" />
                <span>热搜排行</span>
            </div>
        </div> -->
        <div class="list">
            <div class="part" v-if='baseArchives4.length!=0'>
                <div class="partTitle clearfix">
                    <img  class="fl" src="./images/icon1 (2).png" />
                    <span class="fl">品牌</span>
                </div>
                <div class="partList">
                    <van-grid>
                        <van-grid-item
                            v-for="(item,index) in baseArchives4" @click='getCode(item.id,item.name)'
                            :key="index"
                            :text="item.name"
                        />
                        </van-grid>
                </div>
            </div>
            <div class="part" v-if='baseArchives3.length!=0'>
                <div class="partTitle clearfix">
                    <img  class="fl" src="./images/part2.png" />
                    <span class="fl">商圈</span>
                </div>
                <div class="partList">
                    <van-grid :column-num="3">
                        <van-grid-item
                            v-for="(item,index) in baseArchives3" @click='getCode(item.id,item.name)'
                            :key="index"
                            :text="item.name"
                        />
                        </van-grid>
                </div>
            </div>
            <div class="part" v-if="baseArchives1.length!=0">
                <div class="partTitle clearfix">
                    <img  class="fl" src="./images/part3.png" />
                    <span class="fl">交通</span>
                </div>
                <div class="partList">
                     <van-grid :column-num="3">
                        <van-grid-item
                           v-for="(item,index) in baseArchives1" @click='getCode(item.id,item.name)'
                            :key="index"
                            :text="item.name"
                        />
                        </van-grid>
                </div>
            </div>
             <div class="part" v-if='baseArchives2.length!=0'>
                <div class="partTitle clearfix">
                    <img  class="fl" src="./images/part4.png" />
                    <span class="fl">机场车站</span>
                </div>
                <div class="partList">
                    <van-grid :column-num="3">
                        <van-grid-item
                        v-for="(item,index) in baseArchives2" @click='getCode(item.id,item.name)'
                            :key="index"
                            :text="item.name"
                        />
                        </van-grid>
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
      value: null,
      baseArchives1: [], //地铁
      baseArchives2: [], //机场车站
      baseArchives3: [], //商圈
      baseArchives4: [], //品牌
      cityCode:null,
      cityName:"",
      startDate:""
    };
  },
  components: {},
  watch: {},
  created() {
    
  },
  methods: {
    getCode(code,name){
            this.$router.replace({
                path: "/houseList/houseList",
                query:{
                    hotelName:name,
                    archives:code,
                    cityCode:this.cityCode,
                    cityName:this.cityName,
                    startDate:this.startDate
                }
           });
    
        

    },
    onSearch() {
      console.log("搜索");
       this.$router.replace({
                path: "/houseList/houseList",
                query:{
                    hotelName:this.value,
                    archives:"",
                    cityCode:this.cityCode,
                    cityName:this.cityName,
                    startDate:this.startDate
                }
           });
    },
    getBaseArchive() {
      console.log(this.cityCode)
      let param = {
          cityCode:this.cityCode
      }
      axiosurlService.getBaseArchives(param).then(data => {
        if (data.data.success) {
          var item = data.data.data;
          this.baseArchives1 = [];
          this.baseArchives2 = [];
          this.baseArchives3 = [];
          this.baseArchives4 = [];
          item.forEach(element => {
            console.log(element.type);
            switch (element.type) {
              case 1:
                this.baseArchives1.push(element);
                break;
              case 2:
                this.baseArchives2.push(element);
                console.log(element);
                break;
              case 3:
                this.baseArchives3.push(element);
                break;
              case 4:
                this.baseArchives4.push(element);
                break;
            }
            this.$forceUpdate();
          });
        } else {
             this.$toast(data.data.message);
        }
      });
    },
   
  },
  mounted() {
      this.cityCode= this.$route.query.cityCode;
      this.cityName =this.$route.query.cityName;
         this.startDate = this.$route.query.startDate;
      this.getBaseArchive();
      console.log(this.cityCode)
  }
};
</script>

<style lang='less' src='./less/indexSerch.less'>
</style>

