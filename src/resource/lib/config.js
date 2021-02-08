import JWTSecret from './index'
import $ from 'jquery'
import store from '../../vuex/store'
export default {
	jwt: function() { 
		let payload = {
	 		iss:'APP',
		 	iat:+new Date()/1000,
		}
		let jwt = JWTSecret.jwt(payload);
		return jwt;
	},
	url:function(){
		let host = window.location.href;
		let url = host.split('/')[2];
		let urlCommon = null;
		let contracturl = null;
		let operatorurl = null;
		let jetkey = null;
		let apikey = null;
		switch(url){
			case('47.95.237.62:8002')://测试
				urlCommon='http://47.93.117.214:8024/byd-api-1.0.0'
				contracturl = 'http://crmnew-contract.huangjinqianbao.com/index'
				operatorurl ='http://47.95.237.62:8002'
				jetkey = '8^EOvH$s1D'
				apikey = '1bcc09fe6e6e4332abc8601eba35d85d'
				break;
			case('bss-bydh5.g-banker.com')://线上
				urlCommon='https://bss-bydapi.g-banker.com/byd-api-1.0.0'
				contracturl = 'https://bss-contracth5.g-banker.com/index'
				operatorurl ='https://bss-bydh5.g-banker.com'
				jetkey = 'PQsLImqw'
				apikey = '3afd96ea4d984c2abb15e53d90fc0e9a'
				break;
			case('192.168.30.220:6070')://沈艳本地
				urlCommon='http://47.93.117.214:8024/byd-api-1.0.0'
				contracturl = 'http://192.168.30.220:6095/index'
				operatorurl ='http://192.168.30.220:6070'
				jetkey = '8^EOvH$s1D'
				apikey = '1bcc09fe6e6e4332abc8601eba35d85d'
				break;
			case('192.168.30.174:6070')://宏悦本地
				urlCommon='http://47.93.117.214:8024/byd-api-1.0.0'
				contracturl = 'http://192.168.30.174:6095/index'
				operatorurl ='http://192.168.30.174:6070'
				jetkey = '8^EOvH$s1D'
				apikey = '1bcc09fe6e6e4332abc8601eba35d85d'
				break;
		}
		store.dispatch('setCommonurl', urlCommon);
		store.dispatch('setContracturl', contracturl);
		store.dispatch('setOperator', operatorurl);
		store.dispatch('setJwtkey', jetkey);
		store.dispatch('setApikey', apikey);
	}
};
