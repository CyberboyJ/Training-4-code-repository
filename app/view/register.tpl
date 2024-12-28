<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录/注册</title>
</head>

<body>
    <div class="register-container">
        <div class="input-group">
            <label for="tel">手机号</label>
            <input type="text" id="tel" placeholder="请输入手机号" />
        </div>
        <div class="input-group">
            <label for="username">用户名</label>
            <input type="text" id="username" placeholder="请输入用户名" />
        </div>
        <div class="input-group">
            <label for="pwd">密码</label>
            <input type="password" id="pwd" placeholder="请输入密码" />
        </div>
        <div class="input-group">
            <label for="remarks">备注</label>
            <input type="text" id="remarks" placeholder="可以不填写" />
        </div>
        <div>
            <button class="submit-button" onclick="register()">注册</button>
        </div>
        <div id="errorMessage" class="error-message"></div>
    </div>
    <script>
        function register() {
            // 获取手机号、密码和用户名
            const tel = document.getElementById('tel').value;
            const username = document.getElementById('username').value;
            const pwd = document.getElementById('pwd').value;
            const remarks = document.getElementById('remarks').value;
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = '';

            // 前端验证
            if (!tel || !pwd || !username) {
                errorMessage.textContent = '手机号、密码和用户名不能为空';
                return;
            }

            if (pwd.length < 3 || pwd.length > 8) {
                errorMessage.textContent = '密码必须为3-8位';
                return;
            }

            if (username.length < 2 || username.length > 10) {
                errorMessage.textContent = '用户名必须为2-10位';
                return;
            }

            console.log('手机号：' + tel);
            console.log('用户名：' + username);
            console.log('密码：' + pwd);
            console.log('备注：' + remarks);
            // 使用 fetch API 发送注册请求到后端
            fetch('/cust/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tel: tel,
                    customerName: username,
                    password: pwd,
                    remarks: remarks
                })
            })
                .then(response => response.json())  // 解析 JSON 响应
                .then(data => {
                    console.log(data);  // 输出后端返回的数据
                    if (data.result) {
                        alert('注册成功，请登录');
                        window.location.href = '/cust/login';  // 注册成功后跳转到登录页面
                    } else {
                        errorMessage.textContent = '注册失败，请稍后重试';  // 显示错误信息
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    errorMessage.textContent = '注册请求失败，请稍后重试';
                });
        }
    </script>
</body>