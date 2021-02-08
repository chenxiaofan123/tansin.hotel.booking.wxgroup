<template>
    <div>
         <div id="boxMap" style="width:100%;"></div>
    </div>
    
</template>
<script>
import Vue from 'vue'
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'index',
   data () {
    return {
       CityInfo: {
        // longitude: 104.06, 
        // latitude: 30.67
        longitude: null, 
        latitude: null,
        scale:null,
      },
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
  },
  mounted() {
    let height =document.body.clientHeight ;
    document.getElementById("boxMap").style.height = height+"px";
    this.CityInfo.longitude =this.$route.query.longitude;
    this.CityInfo.latitude= this.$route.query.latitude;
    this.CityInfo.scale = this.$route.query.scale;
    //创建实例
    var map = new BMap.Map("boxMap");
    //创建坐标点
    var point = new BMap.Point(this.CityInfo.longitude,this.CityInfo.latitude); 
    //初始化实例，传入坐标点并设置地图级别
    map.centerAndZoom(point,this.CityInfo.scale);
     addMarker(point);
	// 编写自定义函数,创建标注
	function addMarker(point){
	  var marker = new BMap.Marker(point);
	  map.addOverlay(marker);
	}
    map.enableScrollWheelZoom(true);
  }
}
</script>

<style lang='less'>

</style>
