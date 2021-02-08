<template>
  <div class="tansincontent" style="padding-bottom:50px">
        <!-- <v-header titles='点评' isshow='yes'></v-header> -->
        <div class="rateConetnt">
           
            
            <div class="rateContent">
                <div class="clearfix rateList">
                        <div class="fl">房间卫生</div>
                        <div class="fl">
                              <van-rate v-model="form.rHygiene" :size="25" :count="5" color="#ffd21e" void-color="#ceefe8" />
                        </div>
                </div>
                 <div class="clearfix rateList">
                        <div class="fl">周边环境</div>
                        <div class="fl">
                              <van-rate v-model="form.round" :size="25" :count="5" color="#ffd21e" void-color="#ceefe8" />
                        </div>
                </div>
                 <div class="clearfix rateList">
                        <div class="fl">酒店卫生</div>
                        <div class="fl">
                              <van-rate v-model="form.hHygiene" :size="25" :count="5" color="#ffd21e" void-color="#ceefe8" />
                        </div>
                </div>
                 <div class="clearfix rateList">
                        <div class="fl">设备设施</div>
                        <div class="fl">
                              <van-rate v-model="form.equipment" :size="25" :count="5" color="#ffd21e" void-color="#ceefe8" />
                        </div>
                </div>
                <!-- <div class="clearfix rateList">
                        <div class="fl">出游类型</div>
                        <div class="fl typeAll">
                             <div class="typelist clearfix">
                                 <div class="list active">商务出差</div> 
                                 <div class="list">朋友出游</div>
                                 <div class="list">商务出差</div> 
                                 <div class="list">朋友出游</div>
                                 <div class="list">商务出差</div> 
                                 <div class="list">朋友出游</div>
                             </div>
                        </div>
                </div> -->
              
            </div>
             <div class="tipsTitle" >
                   <div class="tips">真实有效的点评可以帮助更多用户！</div>
                 </div>
            <div class="rateText">
                    <van-cell-group>
                        <van-field v-model="form.evaluateContent" type="textarea" placeholder="请输入点评内容，至少5个字" rows="6" autosize />
                    </van-cell-group>
            </div>
            <div class="uplod clearfix">
                
                <van-uploader class=" head" :after-read="onRead" accept="image/*" multiple>
                     <img class= "head-img" src="./images/uplod.png" ref="goodsImg"/>
                </van-uploader>
                <div> 请上传照片</div>
            </div>
          
            	<div class="crop-demo">
                        	<section class="upload-box" id="J_upload_box">
                                              <div v-for="(img,index) in imgSrc"  style="float:left;margin:10px;" :key="index">
                                              <img :src="img"  class="pre-img "/>
                                              <span class="close" @click="DeleteImg(img)"/>
                                          </div> 
			
	                      		</section>
		            </div>
           
        </div>
          <div class="button clearfix">
            <div class="fl  clearfix"> 
                <span class="fl buttonMoney">感谢您的评价</span>
            </div>
            <div class="fr" @click="Submit">提交评价</div>
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
        value:0,
        // message:null,
        form:{
          Id:'',
          OrderNo:'',
          EvaluateDate:'',
          EvaluateContent:'',
          Images:[],
          Type:'',
          ReplyId:'',
          ReplyUserId:'',
          State:'',
          Remark:'',
          evaluateContent:'本次入住体验非常好！',
          rHygiene:5,
          hHygiene:5,
          round:5,
          equipment:5,
        },
        imgSrc:[],
        // others:{
        //   fjws:6,
        //   zbhj:6,
        //   jdws:6,
        //   sbss:6,
        //   // fsws:5,
        // },
    }
  },
  components: {  
    
  },
  watch:{

  }, 
  
  created() {   
         
    // alert(this.$route.query);
      var orderNo = this.$route.query.orderNo;
      this.form.OrderNo=orderNo;
 },
  methods: {
//判断是否存在画布  
 isCanvasSupported() {  
    var elem = document.createElement('canvas');  
    return !!(elem.getContext && elem.getContext('2d'));  
}  ,
  
//压缩方法  
 compress(event, callback) {  
        console.log(111);
    if ( typeof (FileReader) === 'undefined') {  
        console.log("当前浏览器内核不支持base64图标压缩");  
        //调用上传方式  不压缩  
    } else {  
        // try {  
            // var file = event.currentTarget.files[0];  
            var file = event;
            //  if(!/image\/\w+/.test(file.type)){     
            //         alert("请确保文件为图像类型");    
            //         return false;    
            //  }   
            var reader = new FileReader();  
            reader.onload = function (e) {  
            var image = $('<img/>');  
            image.load(function () {  
            console.log("开始压缩");  
            var square = 700;  
            var canvas = document.createElement('canvas');  
            canvas.width = square;  
            canvas.height = square;  
            var context = canvas.getContext('2d');  
            context.clearRect(0, 0, square, square);  
            var imageWidth;  
            var imageHeight;  
            var offsetX = 0;  
            var offsetY = 0;  
            if (this.width > this.height) {  
              imageWidth = Math.round(square * this.width / this.height);  
              imageHeight = square;  
              offsetX = - Math.round((imageWidth - square) / 2);  
            } else {  
              imageHeight = Math.round(square * this.height / this.width);  
              imageWidth = square;  
              offsetY = - Math.round((imageHeight - square) / 2);  
            }  
            context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);  
            console.log(canvas);
            var data = canvas.toDataURL('image/jpeg');    //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
             //压缩完成执行回调  
              //  callback(data);  
            });  
            image.attr('src', e.target.result);  

            console.log(111);
            console.log(data);
            };  
            // reader.readAsDataURL(file);  
            // } catch(e) {  
            //     console.log("压缩失败!");  
            //     //调用上传方式  不压缩  
            // }  
    }  
}  ,
                //压缩方法
		 dealImage(base64, w, callback) {
      
			var newImage = new Image();
			var quality = 0.6;    //压缩系数0-1之间
			newImage.src = base64;
			newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
			var imgWidth, imgHeight;
			newImage.onload = function () {
       
				imgWidth = this.width;
				imgHeight = this.height;
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");
				if (Math.max(imgWidth, imgHeight) > w) {
					if (imgWidth > imgHeight) {
						canvas.width = w;
						canvas.height = w * imgHeight / imgWidth;
					} else {
						canvas.height = w;
						canvas.width = w * imgWidth / imgHeight;
					}
				} else {
					canvas.width = imgWidth;
					canvas.height = imgHeight;
					quality = 0.6;
				}
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
				var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
				// 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
				// while (base64.length / 1024 > 150) {
				// 	quality -= 0.01;
				// 	base64 = canvas.toDataURL("image/jpeg", quality);
				// }
				// 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
				// while (base64.length / 1024 < 50) {
				// 	quality += 0.001;
				// 	base64 = canvas.toDataURL("image/jpeg", quality);
        // }

				callback(base64);//必须通过回调函数返回，否则无法及时拿到该值
			}
		},
 
		//使用压缩

		 printing(base64) {
      //  console.log(base64);
      //  console.log(base64.length);
       console.log("压缩完成！");
      console.log("压缩后大小：", base64.length );

         this.imgSrc.push(base64);
      
    
		},
      onRead(file) {
        if(this.imgSrc.length>=6)
        {
          return;
        }
        //  console.log(file.content);
        console.log("原始大小:"+file.content.length);
		this.dealImage(file.content, 200, this.printing);
        // this.imgSrc.push(file.content);

      },
        DeleteImg(img){
            // alert(img);
            if(this.imgSrc.includes(img))
            {

                 for(var i = 0 ;i<this.imgSrc.length;i++)  
                  {  
                      if(this.imgSrc[i] == img)  
                      {  
                               this.imgSrc.splice(i,1);  
                               i= i-1;  
                               return;

                      }  
                  }  
            }
            },
    
        Submit(){
          let that=this;
          if(this.form.evaluateContent.length<5)
          {
              alert("评论内容字数不能小于5！");
                return;
          }
          var param={
                OrderNo:this.form.orderNo,
                rHygiene:this.form.rHygiene,
                hHygiene:this.form.equipment,
                round:this.form.equipment,
                equipment:this.form.equipment,
                images:this.imgSrc,
                EvaluateContent:this.form.evaluateContent

          };
          console.log(param)
         axiosurlService.createevalua(param).then(data=>{
            if(data.status == 200) {
       
                  if(data.data.success){
                       that.$toast("评论成功!");
                       that.$router.replace({
                         path:'/myCenter/myCenter'
                       });
                    }else{
                        alert(data.data.message);
                    }
              }else{      
                alert("评论失败!");
              }
            });
        }
  },
  mounted() {
         var OrderNo= this.$route.query.OrderNo;
         this.form.orderNo=OrderNo;
         console.log(this.form.orderNo)
	}
}
</script>

<style lang='less' src='./less/comment.less'>

</style>
<style>
.upload-box {
  padding: 15px;
  text-align: left; }
  .upload-box .item, .upload-box .upload {
    position: relative;
    display: inline-block;
    width: 62px;
    height: 62px;
    margin: 0 2% 5px 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    outline: 1px solid #dbdbdb; }
  .upload-box input[type="file"] {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0; }
	.handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
        /* content: "\2716"; */
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }

    .close {
    /* background: orange; */
    color:gray;
    border-radius: 12px;
    line-height: 20px;
    text-align: right;
    height: 20px;
    width: 20px;
    font-size: 18px;
    padding: 1px;
    overflow:hidden;
    /* float: right; */
}

.close::before {
    content: "\2716";
}
  

</style>


