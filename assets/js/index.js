$(function() {
    // 调用函数获取用户信息
    getUserInfo();

    // 退出功能
    $('#btnLogout').on('click', function() {
        // 弹出提示框
        var layer = layui.layer;
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 1.清空本地存储中 token
            localStorage.removeItem('token');

            // 2.跳转到登录页
            location.href = '/login.html';

            // 关闭弹出框
            layer.close(index);
        });
    });
});


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers是请求头配置对象 
        // 统一在baseAPI中配置
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            };
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },
        // 无论请求成功还是失败，都会调用complete函数，可以控制请求失败后强制返回登录页
        // 可以在baseAPI中统一配置
        // complete: function(res) {
        //     // 在complete回调函数中通过res.responseJSON得到服务器响应的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token');
        //         // 2.强制跳转登录页
        //         location.href = '/login.html';
        //     }
        // }
    })
};

// 渲染用户头像的函数
function renderAvatar(user) {
    // 获取用户昵称
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name); // &nbsp；表示空格
    // 渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
};