let host = window.location.href;
let url = host.split('/')[2];
let urlCommon = '';
let env = process.env.NODE_ENV;
console.log(env + '环境变量')
if (env == 'production') {
    //生产
    if (url == 'sandboxbooking.saaspms.com' || '127.0.0.1') {
        urlCommon = 'http://sandboxbooking.saaspms.com';//测试地址
        // urlCommon = '';//测试地址

    } else {
        //测试
        // urlCommon = 'http://booking.saaspms.com';//测试地址
        urlCommon = '';//测试地址
    }
}//本地
else if (env == 'development') {
    if (url == 'localhost:8090') { //本地服务地址
        //urlCommon = 'http://localhost:8088';//测试地址
        urlCommon = 'http://sandboxbooking.saaspms.com';//测试地址
        //urlCommon='http://192.168.5.112:808'


        //  alert(22);
        //  urlCommon = 'http://sandboxbooking.saaspms.com';//测试地址


    }


}
export default {
    urlCommon,
}