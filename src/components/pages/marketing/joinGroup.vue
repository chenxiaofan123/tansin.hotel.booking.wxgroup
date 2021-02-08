<template>
  <div style="margin-top:30px">
    <div class="titleinfo">
      {{ name }} 已发起团购,邀请您参加享受以下优惠XXXXXXXXXXXXXXXXX
    </div>
   
    <div class="info" style="padding:5px;margin-top:20px;margin:5px">
      <van-cell style="word-wrap:break-word">团购-精品大床房</van-cell>
      <van-cell style="word-wrap:break-word">团购-优惠信息</van-cell>
      <van-cell style="word-wrap:break-word">XXXXXXXXXXXXXX11111111111111111113333333333333333555555555555555555</van-cell>
    </div>
       <!-- <van-count-down millisecond :time="time" format="HH:mm:ss:SSS" /> -->

     <van-count-down millisecond :time="time" format="HH:mm:ss:SSS" style="text-align:right;margin-right:20px">
      <template v-slot="timeData">
        <span class="item">{{ timeData.hours }}</span>
        :
        <span class="item">{{ timeData.minutes }}</span>
        :
        <span class="item">{{ timeData.seconds }}</span>
        <!-- : -->
        <span class="item">{{ timeData.milliseconds }}</span>
      
      </template>
    </van-count-down>

    <van-button class="groupPrice" type="danger" @click="submit">
      团购价{{ price }}</van-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 199,
      name: "王大锤",
      time:24*60*60*1000
    };
  },
  created() {},
  mounted() {},
  methods: {
    submit() {
      var query = this.$route.query;
      console.log(query);
       this.$router.push({
            path: "../../ordering/ordering",
            query: this.query,
          });
    }
  }
};
</script>

<style>
.titleinfo {
  margin: 20px;
  text-align: center;
word-wrap:break-word;
  font-size: 15px;
}
.groupPrice {
  width: 100%;
  position: absolute;
  bottom: 20px;
}
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color:red;
}
</style>