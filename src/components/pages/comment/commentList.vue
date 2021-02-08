<template>
  <div class="tansincontent">
        <!-- <v-header titles='点评列表' isshow='yes'></v-header> -->
         <div class="title">住客评价({{total}})</div>
         
        <div class="commentList">
            <div >
                    <div class="rateScore clearfix">
                      <div class="fl scoreL" ><span class="score">{{form.avgScore}}</span><span>分</span></div>
                      <div class="fl rateList">
                        <span>房间卫生:{{form.hHygieneavg}}</span> <span>周边环境:{{form.roundavg}}</span> <span>酒店卫生:{{form.rHygieneavg}}</span> <span>设备设施:{{form.equipmentavg}}</span>
                      </div>
                    </div>
                    <!-- <div class="partOne clearfix" >
                        <div class="fl">
                            <div class="headerImg fl">
                                <img src="./images/header.jpg" />
                            </div>
                            <div class="fl headerText">
                               
                                <van-rate class="userRate" v-model="form.avgScore" :size="15" :count="5" color="#ffd21e" void-color="#ceefe8"   ></van-rate>
                            </div>
                        </div>
                    </div>
                    <div class="tips">
                      2017-06入住，2017-09发表&nbsp;|&nbsp;其他&nbsp;|&nbsp;大床
                    </div> -->
            </div>
            
            <div v-for="(eva,index) in evaluas" v-bind="eva.id" :key="index"> 
              <div class="list" >
                    <div class="listText clearfix">
                         <div class="userevaImg"><img src="./images/ICONH.png"/></div>
                          <div class="usereva" >
                                <!-- <div class="userName" v-if="">用户名称</div> -->
                                <div class="userName" >匿名</div>
                                 <van-rate class="userRate" v-model="eva.compScore" :size="15" :count="5" color="#ffd21e" void-color="#ceefe8"  v-once  ></van-rate>
                                <div class="userScore" v-once>评价等级&nbsp;<span>{{eva.compScore}}&nbsp;</span>分</div>
                          </div>
                           <div class="userDate">
                              {{eva.evaluateDate}}
                          </div>
                       
                    </div>
                    <div class="listTextTips clear" >{{eva.evaluateContent}}</div>
                    <div class="listImg clearfix"  v-if="eva.isshow " v-for="(img,index) in eva.images" :key='index'>
                         <div><img :src='img'/></div>
                    </div>

                    <div class="showImg" @click="eva.isshow = true" v-else>显示图片</div>
                    
                </div>

                
            </div>
     <!-- <div><img src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1727984147,1302708663&fm=27&gp=0.jpg'/></div>  -->
             <div class="evaluateList">
                <!-- <div class="list" >
                    <div class="listText clearfix">
                         <div class="userevaImg">用户</br>头像 </div>
                    
                          <div class="usereva" >
                            <div class="userName">用户名称</div>
                                 <van-rate class="userRate" v-model="form.hHygiene" :size="15" :count="5" color="#ffd21e" void-color="#ceefe8" ></van-rate>
                                <div  class="userScore" >评价等级 &nbsp;<span>{{4.3}}&nbsp;分</span></div>
                          </div>
                          <div class="userDate">
                           2019年4月15日21:19:11
                          </div>
                    </div>
                    
                    <div class="listTextTips clear">经常住的一个酒店性价比狠高，经常住的一个酒店性价比狠高，经常住的一个酒店性价比狠高，经常住的一个酒店性价比狠高，经常住的一个酒店性价比狠高，</div>
                
                    <div class="listImg clearfix"  v-if="isshow">
                        <div><img src='./images/header.jpg'/></div>
                        <div><img src='./images/header.jpg'/></div>
                        <div><img src='./images/header.jpg'/></div>
                    </div>
                    <div class="showImg" @click="isshow = true" v-else>显示图片</div>
                </div>  -->
                
                  
                 <div class="checkAll" @click="GetMore" v-if="total!=evaluas.length">  加载更多      </div> 
                 <div class="checkAll" v-else>  没有更多了      </div> 
                  
                

             </div>

        </div>
         
 </div> 
</template>

<script>
import Vue from 'vue'
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'order',
   data () {
    return {
       current:0,
      //  pageCount:1,
      //  total: 0,
			// 	length: 10,
        // value:0,
        isshow:false,
        message:null,
        form:{
          rtCode:'',
          orderCode:'',
          pageNum:1,
          count:5,
          hHygieneavg: 5, //酒店卫生
          rHygieneavg: 5, //房间卫生
          equipmentavg: 5,//设备设施
          roundavg: 5, //周边环境
          avgScore: 5 //酒店平均分
                
        },
        total:0,
        evaluas:[
    //       {
    //   id: null,
    //   orderNo: '',
    //   rtCode: '',
    //   userId: '',
    //   evaluateDate: null,
    //   evaluateContent: '',
    //   images: [],
    //   type: 0,
    //   replyId: '',
    //   replyUserId: '',
    //   state: 0,
    //   remark: '',
    //   rHygiene: 0,
    //   hHygiene: 0,
    //   round: 0,
    //   equipment: 0,
    //   showimg:false,
    // }
    ],
    
    }
  },
  components: {  

  },
    created(){
      this.getHotelScore();
    this.getevalualist();
 },
  watch:{

  },

  methods: {
      onRead(file) {
      
     },
    getHotelScore(){

        axiosurlService.getHotelScore({}).then(data=>{
           let ret =data.data;
          if(ret.success){
           
            var d =ret.data;
              this.form.hHygieneavg=d.hHygieneavg;
              this.form.rHygieneavg =d.rHygieneavg;
              this.form.equipmentavg=d.equipmentavg;
              this.form.roundavg =d.roundavg;
              this.form.avgScore =d.avgScore;
          }

        });
    },
     getevalualist(){
      //  console.log("asdasd");
       axiosurlService.getpage({
            rtCode:this.form.rtCode,
          orderCode:this.form.orderCode,
          pageNum:this.form.pageNum,
          count:this.form.count,
       
       })
       .then(data=>{
        //  console.log(11111);
        //  console.log(data);
         if(data.status==200)         
         {
           console.log(data);
           if(data.data.rows.length>0)
           {
             this.total=data.data.total;
             for(var i=0;i<data.data.rows.length;i++){
               var row=data.data.rows[i];
              //  console.log(row);
               row.isshow=false,
                this.evaluas.push(row);

             }
             console.log( this.evaluas);
                  // this.evaluas= data.data.rows;
          //   this.evaluas.forEach(element => {
          //    element.isshow=false;
          //  });

           }
         
         

         };



       });
     },
     GetMore(){
      //  alert(this.evaluas.length)
       this.form.pageNum++;
       this.getevalualist();
     },
  //    ShowImage1(isShow){
  // }

  },
  mounted() {
			
	},


}
</script>

<style lang='less' src='./less/commentList.less'>
</style>
<style>
        .clear{
            clear: both;
        }
</style>


