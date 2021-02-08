<style lang="less" scoped>
@import "./../../../assets/less/config.less";
.mint-tabbar {
  background-color: #fff !important;
  box-shadow: 0 0 8px 0 rgba(139, 159, 182, 0.4);
  .mint-tab-item.is-selected {
    background-color: #fff !important;
  }
}
.van-tabbar-item {
  color: #404040 !important;
}
</style>
<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" @click="goPage(1)">预订</van-tabbar-item>

      <van-tabbar-item icon="idcard" @click="goPage(2)" v-if="showOnline"
        >服务</van-tabbar-item
      >
      <van-tabbar-item icon="contact" @click="goPage(3)">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import axiosurlService from "../../../resource/axiosurlService";
import commonUrl from "../../../resource/filter/commonUrl";
export default {
  data() {
    return {
      active: this.isactive,
      isgroup: false,
      showOnline: false,
      icon: {
        normal: "//img.yzcdn.cn/icon-normal.png",
        active: "//img.yzcdn.cn/icon-active.png"
      }
    };
  },
  props: {
    isactive: Number
  },
  computed: {},
  watch: {
    isactive(newval, oldVal) {
      console.log(newval + "检测1");
      console.log(oldVal + "检测2");
      console.log(1);
    }
  },
  created() {
      var tenantcode = window.localStorage.getItem("tenantcode");

    var paras = {
      tenantcode: tenantcode
    };
    //  this.isgroup=window.localStorage.getItem("isgroup");
    axiosurlService.checkopeninfo(paras).then(rs => {
      if (rs.data.success) {
        this.showOnline = true;
      }
    });
  },
  methods: {
    goPage(path) {
      let router = "";
      if (path == 1) {
        var isgroup = window.localStorage.getItem("isgroup");
        console.log(isgroup);

        if (isgroup == 0) {
          router = "/houseReservation/houseReservation";
        } else {
          router = "/index";
        }
      } else if (path == 2) {
        // var url = window.location.protocol + "//" + window.location.host;

        // url += "/online/index.html#/";
        // console.log(url);
        var tenantcode=  window.localStorage.getItem("tenantcode");
        // alert(tenantcode);
        //   return;
          window.location.href =commonUrl.urlCommon+"/userauth/online?hotelcode="+tenantcode;
        // window.location.href = url;
        // var para={
        //   hotelcode:'999',
        //   roomNo:'',
        // };
        // axiosurlService.online(para);
        //   return;
          // window.location.href="http://sandboxbooking.saaspms.com/online/index.html#/";
        return;
        //router = '/checkIn/checkIn'
      } else if (path == 3) {
        router = "/myCenter/myCenter";
      }
      this.$router.push({
        path: router
      });
    }
  },
  mounted() {
    let group = this.$route.query.isgroup;
    this.isgroup = group;

  
     
  }
};
</script>
