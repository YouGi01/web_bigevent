$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称的长度必须在1 - 6个字符之间';
            }
        }
    });

    initUserInfo(); // 调用初始化用户信息的函数


    // 重置按钮功能
    $('#btnReset').on('click', function(e) {
        e.preventDefault(); // 阻止默认行为
        initUserInfo(); // 再次调用初始化用户信息函数
    });

    // 提交按钮功能:监听表单的提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // 发起请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功');
                // 调用父页面的方法,重新渲染用户的头像和昵称
                window.parent.getUserInfo();
            }
        });
    });
});

// 定义获取用户信息的函数  初始化用户信息 
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }

            // 调用form.val快速为表单赋值
            layui.form.val('formUserInfo', res.data);
        }
    })
}