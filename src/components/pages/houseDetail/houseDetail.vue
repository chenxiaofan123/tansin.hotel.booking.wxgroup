<template>
  <div class="tansincontent">
        <!-- <v-header titles='酒店介绍' isshow='yes'></v-header> -->
        <div class="houseDetail" >
             <div class="banner">
                <van-swipe :autoplay="3000"  :height='200' @change="onChange">
                    <van-swipe-item v-for="(image, index) in bannerList" :key="index">
                    <img  :src="image"/>
                    </van-swipe-item>
                </van-swipe>
                <div class="address clearfix">
                    <div class="fl" @click="goMap()">
                         <div class="addText"><img src="./images/address.png" ><span>{{hotelInfo.address}}</span></div>
                    </div>
                     <div class="fr telIcon">
                        <a :href="'tel:' + hotelInfo.tel" ></a>
                    </div>
                    <div class="fr addline"></div>
                   
                </div>
            </div>
            <div class="detailText">
                <div class="detailPart">
                    <div class="detailTitle">
                        <van-divider :style="{ color: '#404040', fontSize: '16px' }">酒店介绍</van-divider>
                    </div>
                    <div class="detailContent">
                        <div class="imgIcon"><img src='./images/icon.png'/></div>
                        <!-- <div  v-if='!isShort&&hotelInfo.hotelRemark' v-html="hotelInfo.hotelRemark.substring(0,300)+'...'"></div> -->
                        <div   v-html="hotelInfo.hotelRemark"></div>
                        <!-- <p v-if='!isShort'> {{shortRemark}}...</p>
                        <p v-if="isShort">{{hotelInfo.hotelRemark}}</p> -->
                    </div>
                    <!-- <div class="checkAllText">
                        <div class="checkText" @click="isShort=!isShort">  <span :class="!isShort?'arrow':'arrow1'"> </span>{{isShort ? '收起全部' : '查看全部'}}</div>
                    </div> -->
                </div>
                <div class="detailPart">
                    <div class="detailTitle" > 
                         <van-divider :style="{ color: '#404040', fontSize: '16px' }">酒店设施</van-divider>
                    </div>
                    <div class="detailList" v-if='hotelInfo.baseServices'>
                        <div class="list clearfix" v-for="(item,index) in hotelInfo.baseServices " :key = 'index'>
                            <div class="fl icon"><img :src="'static/images/'+item.icon" /></div>
                            <!-- <div class="fl icon"><img :src="'./../../../../static/images/'+item.icon" /></div> -->
                            <!-- <div class="fl icon"><img src="../../../../static/images/" /></div> -->
                            <div class="fl">
                                <!-- <div class="listTitle">网络</div> -->
                                <div class="listText">{{item.name}}</div>
                            </div>
                        </div>
                        <!-- <div class="list clearfix">
                            <div class="fl icon"><img src="./images/aixin.png"/></div>
                            <div class="fl">
                                <div class="listTitle">服务</div>
                                <div class="listText">行李寄存    叫醒服务   客房服务   保险柜服务</div>
                            </div>
                        </div>
                        <div class="list clearfix">
                            <div class="fl icon"><img src="./images/canyin.png"/></div>
                            <div class="fl">
                                <div class="listTitle">餐饮</div>
                                <div class="listText">送餐服务    订餐服务   免费餐饮   餐厅点餐</div>
                            </div>
                        </div> -->
                       
                    </div>
                  
                </div>
                 <div class="detailPart">
                    <div class="detailTitle" > 
                         <van-divider :style="{ color: '#404040', fontSize: '16px' }">酒店权益</van-divider>
                    </div>
                    <div class="detailList "  v-if='hotelInfo.showRights'>
                        <!-- <div class="list clearfix">
                            <div class="fl icon"><img src="./images/time.png"/></div>
                            <div class="fl">
                                <div class="listTitle">入店时间</div>
                                <div class="listText">入住：12：00   离店：13：:00</div>
                            </div>
                        </div> -->
                        <div class="list clearfix" v-for="(item,index) in hotelInfo.showRights " :key = 'index'>
                            <div class="fl icon"><img src="./images/hotile.png"/></div>
                            <div class="fl">
                                <!-- <div class="listTitle">酒店提示</div> -->
                                <div class="listText">{{item}}</div>
                            </div>
                        </div>
                        <!-- <div class="list clearfix">
                            <div class="fl icon"><img src="./images/tip.png"/></div>
                            <div class="fl">
                                <div class="listTitle">入住提示</div>
                                <div class="listText">餐饮18元/位   儿童可加床</div>
                            </div>
                        </div> -->
                       
                    </div>
                  
                </div>
            </div>

        </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'index',
   data () {
    return {
       bannerList: [],
       current:0,
       shortRemark:null,
       isShort:false,
       hotelInfo:{},

    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
      onChange(index) {
      this.current = index;
    },
    getHotelInfo(){
      let that = this;
      let param = {} //请求参数
     	axiosurlService.getHotelInfo(param).then(response => {
            let responseData = response.data;
                if(responseData.success == true) {
                   that.hotelInfo = responseData.data //酒店信息
                   console.log(that.hotelInfo)
                   that.shortRemark  = responseData.data.hotelRemark.substr(0,80);
                   console.log(that.shortRemark)
                } else {
                    this.$toast(responseData.message);
                }
			 })
    },
     goMap(){
        let that=this;
         that.$router.push({
            path:'/map/map',
            query:{
                latitude:that.hotelInfo.latitude,
                longitude:that.hotelInfo.longitude,
                scale:that.hotelInfo.scale,
            }
        })

    },
     getbanner(){
       let that = this;
      let param = {}; //请求参数
      axiosurlService.getbanner(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
           that.bannerList = responseData.data; //酒店banner
        } else {
          this.$toast(responseData.message);
        }
      });
    },
  },
  mounted() {
     this.getHotelInfo();
     this.getbanner();
    
  }
}
</script>

<style lang='less' src='./less/houseDetail.less'>

</style>

