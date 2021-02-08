<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less"  src='./assets/less/common.less'></style>
<style>
   body,html,.page {
        margin:0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    #app {
        /* font-size:14px; */
        width: 100%;
        height: 100%;
        font-family: Helvetica,'Avenir', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
