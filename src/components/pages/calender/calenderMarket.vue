<template>
  <div class="chooseContent">
    <div class="indexDate">
      <div id="checkinout">
        <div id="firstSelect" style="width:100%;">
          <div class="Date_lr" style="float:left;">
            <p>入住</p>
            <input id="startDate" type="text" value="" style="" readonly />
          </div>
          <div class="Date_lr" style="float:right;">
            <p>离店</p>
            <input id="endDate" type="text" value="" style="" readonly />
          </div>
          <span class="span21">共<span class="NumDate">1</span>晚</span>
        </div>
      </div>
      <div class="mask_calendar">
        <div class="calendar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axiosurlService from "../../../resource/axiosurlService";
import { calendarSwitch2 } from "./js/calenderMarketing.js";
export default {
  name: "index",
  data() {
    return {
      paras: {}
    };
  },
  components: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    let that = this;
    let d = window.localStorage.getItem("maxdays");

    let fromPage = that.$route.query.from;
    console.log(fromPage);
    //日历插件var
    $(function() {
      $(".mask_calendar").show();

      var _minDate = window.localStorage.getItem("minDate");
      var _maxDate = window.localStorage.getItem("maxDate");
     
      
      var day = d;

      var minDate = new Date();

      if (_minDate != null && _minDate != "") {
        minDate = new Date(_minDate);
       
      }

        var months=4;
         var days =d;
      if (_maxDate != null && _maxDate != "") {
        var maxDate = new Date(_maxDate);
      

        var difftime = (maxDate - minDate) / 1000;
         var days = parseInt(difftime / 86400);
        if(days>=365){
          days=365;
        }
        if(days>=120){
          months=(days/30)+1;
        }
     
        // alert(days);
        if(months>=13){
         
          months=13;
         
        }
      }
     



      // var new_date = new Date(); //新建一个日期对象，默认现在的时间
      // var old_date = new Date("2018-12-12 00:00:00"); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期

      // var difftime = (new_date - old_date)/1000; //计算时间差,并把毫秒转换成秒

      // var days = parseInt(difftime/86400); // 天  24*60*60*1000
      //  	var hours = parseInt(difftime/3600)-24*days;    // 小时 60*60 总小时数-过去的小时数=现在的小时数
      //  	var minutes = parseInt(difftime%3600/60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
      //  	var seconds = parseInt(difftime%60);  // 以60秒为一整份 取余 剩下秒数

      //  	alert("时间差是: "+days+"天, "+hours+"小时, "+minutes+"分钟, "+seconds+"秒");
      $("#firstSelect").calendarSwitch2({
        selectors: {
          sections: ".calendar"
        },
        minDate: minDate,
        // maxDate: maxDate,
        index: months, //展示的月份个数
        animateFunction: "slideToggle", //动画效果
        controlDay: true, //知否控制在daysnumber天之内，这个数值的设置前提是总显示天数大于90天
        daysnumber: days, //控制天数
        comeColor: "#65708C", //入住颜色
        outColor: "#65708C", //离店颜色
        comeoutColor: "#E0F4F2", //入住和离店之间的颜色
        callback: function() {
        
          //回调函数
          var startDate = $("#startDate").val(); //入住的天数
        
       
          var endDate = $("#endDate").val(); //离店的天数
          var NumDate = $(".NumDate").text(); //共多少晚
          console.log(startDate);
          console.log(endDate);
          console.log(NumDate);
          let path = null;
          if (fromPage == "index") {
            path = "/index/index";
          } else if (fromPage == "houseReservation") {
            path = "/houseReservation/houseReservation";
          } else if (fromPage == "marketing") {
           
            // path='/ordering/ordering'
            var query = that.$route.query;
            console.log(222);
            console.log(query);
      
            query.checkIn = startDate;
            query.checkOut = endDate;
            query.days = NumDate;
            // that.$router.push({
            //   path: "/ordering/ordering",
            //   query: query
            // });
      
               that.$router.replace({
            path: "/ordering/ordering",
            query: query
          });
            return;
          }
          that.$router.replace({
            path: path,
            query: {
              startDate: startDate,
              endDate: endDate,
              days: NumDate
            }
          });
        },
        comfireBtn: ".comfire" //确定按钮的class或者id
      });
      var b = new Date();
      var ye = b.getFullYear();
      var mo = b.getMonth() + 1;
      mo = mo < 10 ? "0" + mo : mo;
      var da = b.getDate();
      da = da < 10 ? "0" + da : da;
      $("#startDate").val(ye + "-" + mo + "-" + da);
      b = new Date(b.getTime() + 24 * 3600 * 1000);
      var ye = b.getFullYear();
      var mo = b.getMonth() + 1;
      mo = mo < 10 ? "0" + mo : mo;
      var da = b.getDate();
      da = da < 10 ? "0" + da : da;
      $("#endDate").val(ye + "-" + mo + "-" + da);
    });
  }
};
</script>

<style lang='less' src='./less/calender.less'>
</style>

