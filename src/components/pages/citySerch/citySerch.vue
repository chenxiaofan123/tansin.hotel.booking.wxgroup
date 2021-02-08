<template>
  <div class="tansincontent">
     <div class="serchContent">
        <div class="serchInput">
            <input  type="text"  v-model='serchText' placeholder=""/>
            <img src="./images/shai.png"  />
        </div>
     </div>

     <div class="tabContent">
         <van-tabs v-model="active">
            <van-tab title="国内城市">
                <div class="hotcity">
                    <!-- <div class="hotTitle">热门推荐</div> -->
                    <!-- <div class="hotcityButtonAll clearfix"  >
                   
                          <div class="hotBtn" v-for="(item,index) in cityList" :key='index' @click="getCity( item.cnName,item.ctCode)">{{item.cnName}}</div>
                    </div> -->
                </div>
                <div class="indexBar">
                    <div v-for="(pv,index) in provinceCitys" :key="index" >
                      <van-cell :title="pv.cnName"  v-if="!pv.onlyOne" style="color:#BDBDBD"/>
                      <van-cell :title="ct.cnName"  v-for="(ct,index) in pv.citys" :key="index"  @click="selectCity(ct)"/>
                    </div>
                </div>
            </van-tab>
           </van-tabs>
     </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'index',
  backAddress:"",
   data () {
    return {
        value:null,
        active: 0,
        serchText:null,
        cityList:[{
      "ctCode": "120100",
      "cnName": "天津市",
      "enName": "Tianjin",
      "pvCode": "120000",
      "isEnable": true
    },{
      "ctCode": "120100",
      "cnName": "上海",
      "enName": "Tianjin",
      "pvCode": "120000",
      "isEnable": true
    }], 
    provinceCitys:[],
    routQuery:{}
    }
  },
  components: {  

  },
  watch:{

  },
  methods: {
    selectCity(item){
      console.log(item);
      this.getCity(this.backAddress,item.cnName,item.ctCode);
    },
      goSerch(){
            console.log('搜索')
      },
      getCity(backAddr,name,code){
        var addr="/index/index";

        var query=this.routQuery;
        query.cityCode=code;
        query.cityName=name;
        if(query.archives){
          query.archives="";

        }
       
        if(backAddr!=null&&backAddr!="")
        {
          addr=backAddr;
        }
          this.$router.replace({
            path: addr,
            query:query
         });
      },
      // getGroupCityList(){
      //       let that = this;
      //       let param = {}; //请求参数
      //       axiosurlService.getGroupCityList(param).then(response => {
      //           let responseData = response.data;
      //           if (responseData.success == true) {
      //           that.cityList = responseData.data; //酒店城市
          
      //           } else {
      //           that.$toast(responseData.message);
      //           }
      //       });
      // },
    
  },
  mounted() {
    this.routQuery=this.$route.query;
    var backaddr=this.$route.query.backAddress;
  this.backAddress=backaddr;
    axiosurlService.getGroupCityList().then(data=>{
      console.log(data);
      if(data.data.success)
      {
      this.provinceCitys=data.data.data;

      }
    });
  }
}
</script>

<style lang='less' src='./less/citySerch.less'>

</style>

