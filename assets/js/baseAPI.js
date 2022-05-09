// 每次发起get或者post请求时，会先调用ajaxPrefilter这个函数，这个函数中可以拿到ajax提供的配置对象
// 可以封装一个函数自动凭借url根路径
$.ajaxPrefilter(function(options) {
    // 在发起真正的请求之前，统一拼接url的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;

    // 统一为拥有权限的接口设置 headers
    // 判断接口是否需要权限
    if (options.url.indexOf('/my/!==-1')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    }

    // 全局统一配置 complete回调函数
    options.complete = function(res) {
        // 在complete回调函数中通过res.responseJSON得到服务器响应的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token');
            // 2.强制跳转登录页
            location.href = '/login.html';
        }
    }

});