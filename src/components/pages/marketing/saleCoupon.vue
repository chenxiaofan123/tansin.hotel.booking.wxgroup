<template>
  <div>
    <div style="display: flex;margin: 20px 10px;" v-for="(item,index) in 7" :key="index">

      <div class="radial-gradient">
        <div style="text-align: center;">

          <div style="display: inline-block;">
            <div class="price">
              ￥200
            </div>
            <div class="des">
              满300元减200元
            </div>
          </div>
        </div>


      </div>
      <div class="right">
        <div class="top">
          <span class="limit">限品类券</span>
          <span>仅可购买酒水部分商品</span>
        </div>
        <div class="center">
          <span class="effectTime">2020.11.27-2020.11.28</span>
          <span class="btn" style="float: right;">立即抢购</span>

        </div>
        <div class="dotted"></div>
        <div class="bottom">

          <span>详细信息</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
  };
</script>

<style scoped>
  .radial-gradient div {
    color: #fff;
    text-align: center;

  }

  .price {

    font-size: 20px;
    margin-top: 5px;
  }

  .des {

    font-size: 13px;
    margin-top: 5px;
  }

  .right {
    position: relative;
    border: rgba(171, 171, 171, 0.2) 1px solid;
    border-left: 0;
    border-radius: 0px 5px 5px 0px;

    display: inline-block;
    width: 300px;
    vertical-align: middle;
    padding: 5px;
    /* background-color: skyblue; */
  }

  .top {
    position: absolute;
    top: 0;
  }

  .center {
    position: absolute;
    top: 30px;
    width: 100%;
  }

  .bottom {
    position: absolute;
    bottom: 0;
    margin: 5px;

  }

  .radial-gradient {
    width: 150px;
    height: 80px;
    padding: 5px;
    position: relative;
    /* background-image: radial-gradient(circle at right top, #fff, #fff 10px, transparent 11px),
      radial-gradient(circle at right bottom, #fff, #fff 10px, transparent 11px); */
    background-color: rgb(254, 59, 15);
  }

  .radial-gradient:after {
    content: '';

    position: absolute;
    top: 0px;
    bottom: 0px;
    left: -5px;
    width: 10px;
    height: 100%;
    background: radial-gradient(circle, #fff, #fff 4px, transparent 5px);
    background-size: 10px 10px;
  }

  .dotted {
    width: 90%;
    height: 0;
    margin: 0 5px;
    bottom: 25px;
    position: absolute;
    border-bottom: rgba(171, 171, 171, 0.3) 1px dashed;
  }

  .limit {
    display: inline-block;
    background-color: rgb(254, 59, 15);
    border-radius: 15px;
    padding: 3px 5px;
    margin-right: 5px;
    color: rgb(255, 255, 255);
  }

  .btn {
    display: inline-block;
    background-color: rgb(254, 59, 15);
    border-radius: 15px;
    padding: 5px 10px;
    margin-right: 5px;
    float: right;
    color: rgb(255, 255, 255);
  }

  .effectTime {
    display: inline-block;
    margin-left: 5px;
  }
</style>