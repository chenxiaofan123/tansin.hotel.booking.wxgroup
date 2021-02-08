import Vue from 'vue';
import router from '../../router'
import util from 'util'

//axion 添加请求头
export const axiosRequest = function (request) {
    //添加请求头
    // alert(1111);
    let config = request.headers;
    config.tenantcode  = window.localStorage.getItem('tenantcode') || '9900'; //后期动态获取
    config.usertoken  =window.localStorage.getItem('usertoken') ; 
    if(!navigator.onLine){
        this.$notify({ message: '当前网络不可用，请检查您的网络设置', duration: 1000,background: '#1989fa'});
    }
    request.headers = config;
    return request;

}

function loadingTip() {
    util.toast('服务器错误');
}
//axios 过滤请求码
export const axiosResponse = function (response) {
    switch (response.status) {
        case 403:
        util.toast('当前网络不可用，请检查您的网络设置');
            return response;
        case 404:
        util.toast('404错误! 请求地址不存在，请重试!');
            return response;
        case 413:
            loadingTip()
            return response;
        case 500:
            loadingTip()
            return response;
        case 502:
            loadingTip()
            return response;
        case 503:
            loadingTip()
            return response;
        case 504:
            loadingTip()
            return response;
        default:
            if (response.status && response.status != 200) {
                loadingTip()
                return response;
            } else {
                return response
            }
    }    
}
