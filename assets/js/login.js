$(function() {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });


    // 点击去登录的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 从layui中获得form对象
    var form = layui.form;
    // 从layui中获取layer对象
    var layer = layui.layer;
    // 通过form.verify自定义校验规则
    form.verify({
        // 自定义了一个pwd的检验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 检验连词输入密码是否一致的规则
        repwd: function(value) {
            // 通过形参value得到的是确认密码框的值，需要和密码框的值进行比较
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码输入不一致！'
            }
        }
    });

    // 监听注册表单的提交
    $('#form_reg').on('submit', function(e) {
        e.preventDefault(); //阻止默认提交行为
        // 发起ajax的post请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link_login').click(); // 注册成功后自动跳转到的登陆页面
        });
    });

    // 监听登录表单的提交
    $('#form_login').submit(function(e) {
        e.preventDefault(); // 阻止默认提交行为
        $.ajax({
            url: '/api/login', // 通过baseAPI封装的ajaxPrefilter函数会自动拼接根路径
            method: 'POST',
            data: $(this).serialize(), // 快速获取表单的数据
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                };
                layer.msg('登录成功');
                // 将登陆成功返回的token字符串保存到localStorage中
                localStorage.setItem('token', res.token);

                // 跳转到后台主页
                location.href = '/index.html';
            }
        })
    });
});