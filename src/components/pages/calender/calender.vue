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
import { calendarSwitch } from "./js/calender.js";
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
      $("#firstSelect").calendarSwitch({
        selectors: {
          sections: ".calendar"
        },
        index: 4, //展示的月份个数
        animateFunction: "slideToggle", //动画效果
        controlDay: true, //知否控制在daysnumber天之内，这个数值的设置前提是总显示天数大于90天
        daysnumber: d, //控制天数
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
            console.log(query);
          query.startDate=startDate;
          query.endDate=endDate;
          query.days=NumDate;
            that.$router.push({
              path: "/ordering/ordering",
              query:query
            });
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

