<template>
	<div  >
		<!-- 优惠券tab -->
		<div class="coupon-tab" >
			<div class="tab" :class="{'action':TabShow===0}" @click="onCouponTab(0)">
				<div>未使用</div>
				<div class="line"></div>
			</div>
			<div class="tab" :class="{'action':TabShow===1}" @click="onCouponTab(1)">
				<div>已使用</div>
				<div class="line"></div>
			</div>
			<div class="tab" :class="{'action':TabShow===2}" @click="onCouponTab(2)">
				<div>已过期</div>
				<div class="line"></div>
			</div>
		</div>
		<!-- 优惠券列表 -->
		<div class="coupon-list" >
			<div class="list" v-for="(item,index) in 6" :key="index">
				<div class="list-data" :class="{'coupon-lose':TabShow!=0}">
					<div class="coupon-price">
						<div class="discounts">
							<div class="min">￥</div>
							<div class="max">200</div>
						</div>
						<div class="full-reduction"><div>满600元减200元</div></div>
						<div class="jag" style="left:0"></div>
					</div>
					<div class="coupon-info">
						<div class="info-title">
							<div class="tag"><div>限品类券</div></div>
							<div class="title"><div>仅可购买酒水部分商品</div></div>
						</div>
						<div class="date-get">
							<div class="date"><div>2020.3.09-2020.03.15</div></div>
							<div class="get" @click="onCouponUse" v-if="TabShow===0">
								<div>立即使用</div>
							</div>
						</div>
						<div class="describe-title" @click="isDes=!isDes">
							<div>详细信息</div>
							<div class="iconfont icon-more more" :style="isDes?'transform: rotate(-90deg);':'transform: rotate(90deg);'"></div>
						</div>
					</div>
				</div>
				<div class="use-status" v-if="TabShow != 0">
					<div v-if="TabShow === 1">已使用</div>
					<div v-else-if="TabShow === 2">已过期</div>
				</div>
				<div class="describe" v-show="isDes">
					<div>限品类：尽可购买酒水部分商品</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	data() {
		return {
			TabShow: 0,
			isDes: false,
		};
	},
	methods:{
		/**
		 * 优惠券tab点击
		 * @param {Number} type
		 */
		onCouponTab(type){
			this.TabShow = type;
		},
		/**
		 * 去使用点击
		 */
		onCouponUse(){
			uni.navigateTo({
				url: '/pages/SearchGoodsList/SearchGoodsList'
			})
		}
	}
};
</script>



<style >
@import './css/MyCoupon.css';
</style>


