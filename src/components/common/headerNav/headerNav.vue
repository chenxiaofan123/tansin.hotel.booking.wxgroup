<template>
	<div>
		<van-nav-bar  class="header" :title="titles"  v-show="isshow!='no'" left-text="返回" left-arrow  @click-left="comeback" />
	</div>
</template>
<script>
	import util from 'util'
	import Vue from 'vue'

	export default {
		name: 'headerNav',
		data() {
			return {
				selected:'loan',
			}
		},
		props:['titles','isshow'],
		watch:{
			title(val){
				console.log(val);
				console.log(1);
			}
		},
		methods: {
			comeback(){
				window.history.go(-1);
			},
			onClickRight(){

			}
		},
		mounted() {
			
		}
	}
</script>

<style lang='less'>
.header{
	background:rgb(74,173,232);
	color: #fff;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	z-index:999 !important;
}

</style>
