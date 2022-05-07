// 每次发起get或者post请求时，会先调用ajaxPrefilter这个函数，这个函数中可以拿到ajax提供的配置对象
// 可以封装一个函数自动凭借url根路径
$.ajaxPrefilter(function(options) {
    // 在发起真正的请求之前，统一拼接url的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
});