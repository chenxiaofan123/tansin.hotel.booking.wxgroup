<template>
  <div class="commonContent">
    <div class="commonTop">
      <div class="rate">{{tabs.avgScore}}分</div>
      <div class="star">
        <van-rate
          v-model="tabs.avgScore"
          :size="22"
          color="#EDC462"
          void-icon="star"
          void-color="#eee"
          readonly
        />
      </div>
      <div class="allRate">综合评分</div>
    </div>
    <div class="commonPart">
      <div class="commonTitle">大众点评</div>
      <ul class="commonTab clearfix">
        <li>房间卫生{{tabs.rHygieneavg}}</li>
        <li>酒店卫生{{tabs.hHygieneavg}}</li>
        <li>周边环境{{tabs.roundavg}}</li>
        <li>设备设施{{tabs.equipmentavg}}</li>
        <!-- <li @click="toggle(index ,tab.view)" v-for="(tab,index) in tabs" :key="index" :class="{active:active===index}">
                    {{tab.type}}       
        </li>-->
      </ul>
      <div class="commonList">
        <div class="listDiv clearfix" v-for="(item,index) in evaluatList" :key="index">
          <div class="fl">
            <div class="listDate">来自 {{item.evaluateName}} {{item.evaluateDate}}</div>
            <div class="listText">{{item.evaluateContent}}</div>
          </div>
       
            <div class="  clearfix"  v-for="(rep,index) in item.repList" :key="index" >
                  <p  style="font:red">商家回复：</p>{{rep.content}}
                </div>
                 <div v-if="item.images!=null&&item.images.length>0">
                    <div class="listImg clearfix"  v-if="item.isShow ">
                         <div  v-for="(img,index) in item.images" :key='index'><img :src='img'/></div>
                    </div>

                    <!-- <div class="showImg" @click="showimg(item)" v-else>显示图片</div> -->
                    <div class="showImg" @click="item.isShow = true" v-else>显示图片</div>
                 </div>
          <!-- <div class="fr listButton">
                                优质点评
          </div>-->
        </div>
        
           <div class="checkAll" @click="GetMore" v-if="total!=evaluatList.length">  加载更多      </div> 
                 <div class="checkAll" v-else>  没有更多了      </div> 
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axiosurlService from "../../../resource/axiosurlService";
export default {
  name: "order",
  data() {
    return {
      active: 0,
      currentView: "1",
      evaluatList: [],
      total:null,
      tabs: {
        avgScore: 0,
        equipmentavg: 0,
        hHygieneavg: 0,
        rHygieneavg: 0,
        roundavg: 0
      },
      queryparams:{
       
        length: 20,
        select_word: "",
        roomTypeCode:null
      }
    };
  },
  components: {},
  watch: {},
  created() {},
  methods: {
    showimg(item){
      console.log(item);
      item.isShow=true;
      // alert(item.isShow);
    
    },
    toggle(i, v) {
      this.active = i;
      this.currentView = v;
    },
     GetMore(){
      
      this.queryparams.length+=10;
      this.getEvaluatPage();
    },
    getEvaluatPage() {
      let that = this;
      let param = {
        page: 1,
        size: that.queryparams.length,
        keyword: null
      }; //请求参数
      axiosurlService.getEvaluatPage(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          that.evaluatList = responseData.rows; //酒店评论
           that.total=responseData.total;
        } else {
          this.$toast(responseData.message);
        }
      });
    },
    gethotelcompent() {
      //酒店评分汇总
      let that = this;
      let param = {}; //请求参数
      axiosurlService.gethotelcompent(param).then(response => {
        let responseData = response.data;
        if (responseData.success == true) {
          that.tabs = responseData.data; //酒店banner
        } else {
          this.$toast(responseData.message);
        }
      });
    }
   
  },
  mounted() {
    this.gethotelcompent();
    this.getEvaluatPage();
  }
};
</script>

<style lang='less' src='./less/commonIndex.less'>
</style>


