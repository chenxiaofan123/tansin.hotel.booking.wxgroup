import axiosService from './axiosService'
import urls from './filter/commonUrl'
let urlCommon = urls.urlCommon;
export default {
	urlCommon,
	memberlogin: function (param) { //登录接口
		return axiosService().postJson(urlCommon + '/api/v2/userinfo/login', param)
	},
	getSmsCode: function (param) { //获取短信验证码
		return axiosService().getUrl(urlCommon + '/api/v2/sms/smssendcode', param);
	},
	registerMember: function (param) { //会员注册
		return axiosService().postJson(urlCommon + '/api/v2/userinfo/openmember', param);
	},
	getbanner: function (param) { //首页------获取酒店banner
		return axiosService().getUrl(urlCommon + '/api/v2/hotel/getImgBanner', param);
	},
	getGroupbanner: function (param) { //首页------获取集团banner
		return axiosService().getUrl(urlCommon + '/api/v2/group/getImgBanner', param);
	},
	cityNameToCode: function (param) {//首页------城市转城市代码
		return axiosService().getUrl(urlCommon + '/api/v2/group/cityNameToCode', param);
	},
	getHotelInfo: function (param) { //详情-------获取酒店信息
		return axiosService().getUrl(urlCommon + '/api/v2/hotel/getHotelInfo', param);
	},
	getroomandrate: function (param) { // 首页-----房间类型列表展示
		return axiosService().getUrl(urlCommon + '/api/v2/hotel/getroomandrate', param);
	},

	getNewHotelList: function (param) { // 首页-----获取新品列表
		return axiosService().getUrl(urlCommon + '/api/v2/group/getNewHotelList', param);
	},
	getRecommendedList: function (param) { // 首页-----获取推荐列表
		return axiosService().getUrl(urlCommon + '/api/v2/group/getRecommendedList', param);
	},
	getScenicSpotList: function (param) { // 首页-----获取游玩列表
		return axiosService().getUrl(urlCommon + '/api/v2/group/getScenicSpotList', param);
	},

	getScienceDetailById: function (param) { // 首页-----获取游玩详情
		return axiosService().getUrl(urlCommon + '/api/v2/group/getScienceDetailById?' + param, param);
	},

	getallroomtype: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v2/hotel/getallroomtype', param);
	},
	checkinventory: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v2/order/checkinventory', param);
	},
	getHotelList: function (param) { //酒店列表
		return axiosService().postJson(urlCommon + '/api/v2/hotel/gethotellist', param);
	},
	getGroupCityList: function (param) { //酒店----城市列表
		return axiosService().getUrl(urlCommon + '/api/v2/group/getGroupCityList', param);
	},
	getBaseArchives: function (param) { //周边条件筛选
		return axiosService().getUrl(urlCommon + '/api/v2/group/getBaseArchives', param);
	},
	getEvaluatPage: function (param) { //酒店评价列表
		return axiosService().postJson(urlCommon + '/api/v2/evaluate/getEvaluatPage', param);
	},
	gethotelcompent(param) { //获取评分汇总
		return axiosService().getUrl(urlCommon + '/api/v2/evaluate/gethotelcompent', param);
	},
	getAllOrder: function (param) { //订单列表
		return axiosService().postJson(urlCommon + '/api/v2/order/getAllOrder', param);
	},
	getAllMarketOrder: function (param) { //活动订单列表
		return axiosService().getUrl(urlCommon + '/api/v1/market/myMarket', param);
	},
	submitorder: function (param) { //提交订单
		return axiosService().postJson(urlCommon + '/api/v2/order/submitorder', param);
	},
	getPaymethod: function (param) { //获取订单支付方式
		return axiosService().getUrl(urlCommon + '/api/v2/orderpay/getPaymethod', param);
	},
	getCouponPayMethod: function (param) { //获取优惠券支付方式
		return axiosService().getUrl(urlCommon + '/api/v2/orderpay/getCouponPayMethod', param);
	},
	getorderinfo: function (param) { //获取订单支付信息
		return axiosService().getUrl(urlCommon + '/api/v2/orderpay/getorderinfo', param);
	},
	getsuccessinfo: function (param) { //获取订单支付信息
		return axiosService().getUrl(urlCommon + '/api/v2/orderpay/paysuccess', param);
	},
	getwxpayinfo: function (param) { //获取订单支付信息
		return axiosService().getUrl(urlCommon + '/api/v2/orderpay/weixinpay', param);
	},
	getRechargeDisplay: function (param) { //获取订单支付信息
		return axiosService().getUrl(urlCommon + '/api/v2/userinfo/getrechargedisplay', param);
	},
	orderpay: function (param) { //支付
		return axiosService().postJson(urlCommon + '/api/v2/orderpay/orderpay', param);
	},
	wxrepay: function (param) { //支付
		return axiosService().postJson(urlCommon + '/api/v2/orderpay/wxrepay', param);
	},
	crmrecharge: function (param) { //支付
		return axiosService().postJson(urlCommon + '/api/v2/userinfo/crmrecharge', param);
	},
	cancleOrder: function (param) { //取消订单
		return axiosService().getUrl(urlCommon + '/api/v2/order/cancleOrder', param);
	},
	getorderdetail: function (param) { //订单详情
		return axiosService().getUrl(urlCommon + '/api/v2/order/getorderdetail', param);
	},
	querymemberright: function (param) { //订单------会员权益
		return axiosService().getUrl(urlCommon + '/api/v2/order/querymemberright', param);
	},
	queryCoupon: function (param) { //优惠券列表
		return axiosService().getUrl(urlCommon + '/api/v2/userinfo/queryCoupon', param);
	},
	userdetail: function (param) { //个人中心我的详情
		return axiosService().getUrl(urlCommon + '/api/v2/userinfo/userdetail', param);
	},
	userinfo: function (param) { //个人中心我的详情
		return axiosService().getUrl(urlCommon + '/api/v2/userinfo/userinfo', param);
	},
	modifyuser: function (param) { //完善个人信息
		return axiosService().postJson(urlCommon + '/api/v2/userinfo/modifyuser', param);
	},

	getauthenwechatUrl: function () { //微信授权认证
		return urlCommon + "/home/callback"
	},
	getUserInfo: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v1/users/queryuser', param);
	},
	//获取验证码
	getImageCode: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v2/member/getimagecode', param);
	},

	//获取appid AppSecret AccessToken
	getBaseAppInfo: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v2/baseWeChat/getBaseAppInfo' + param, param);
	},
	getVideoImgBanner: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v2/group/getVideoImgBanner', param);
	},
	//促销活动
	getpromotion: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v2/promotion/getpromotion', param);
	},

	createevalua: function (param) { //创建评价
		return axiosService().postJson(urlCommon + '/api/v2/evaluate/evaluateCreate', param);
	},

	receiveCoup: function (param) {
		return axiosService().getUrl(urlCommon + "/api/v2/promotion/receivecoupon", param);
	},

	getMaxDays: function (param) {
		return axiosService().getUrl(urlCommon + "/api/v2/hotel/getmaxdays", param);
	},
	getHourRange: function (param) {
		return axiosService().getUrl(urlCommon + "/api/v2/order/getHourRange", param);
	},
	checkopeninfo: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v2/hotel/checkopeninfo', param);
	},


	//marketing
	checkopeninfo: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v1/market/getMarketType', param);
	},
	checkMarket: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v1/market/checkMarket', param);
	}, 
	getMarketByType: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v1/market/getMarketByType', param);
	},
	queryMarket: function (param) {
		return axiosService().postJson(urlCommon + '/api/v1/market/queryMarket', param);
	},
	getMarketById: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v1/market/getMarketById', param);
	},
	getMarketByGroupCode: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v1/market/getMarketByGroupCode', param);
	},
	buyCoupon: function (param) {
		return axiosService().postJson(urlCommon + '/api/v1/market/buyCoupon', param);
	},
	
	marketNotice: function (param) {
		return axiosService().postJson(urlCommon + '/api/v1/market/marketNotice', param);
	},
	myMarket: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v1/market/myMarket', param);
	},
	getMemberUserInfo: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v1/market/getUserInfo', param);
	},

	getMarketType: function (param) {
		return axiosService().getUrl(urlCommon + '/api/v1/market/getMarketType', param);
	},
	getCalcPrice: function (param) {//计算活动价格
		return axiosService().getUrl(urlCommon + '/api/v1/market/calcMarketPrice', param);
	},
	saveMarketOrder: function (param) {
		return axiosService().postJson(urlCommon + '/api/v1/market/saveMarketOrder', param);
	},
	
	//优惠券
	couponLogin: function (param) { //注册和登陆接口
		return axiosService().postJson(urlCommon + '/api/v2/pmobiz/regandlogin', param);
	},
	couponId: function (param) { //获取活动信息
		return axiosService().getUrl(urlCommon + '/api/v2/pmobiz/getpmobyid', param);
	},
	couponOpen: function (param) { //抢券接口
		return axiosService().postJson(urlCommon + '/api/v2/pmobiz/opencoupon', param);
	},
	myCop: function (param) { //抢券接口
		return axiosService().getUrl(urlCommon + '/api/v2/pmobiz/querymycop', param);
	},
	
	// online:function(param){
	// 	return axiosService().getUrl(urlCommon+"/userauth/online",param);
	// }
}