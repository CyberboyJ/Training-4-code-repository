<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录/注册</title>
</head>

<body>
    <div class="login-container">
        <div class="input-group">
            <label for="tel">手机号</label>
            <input type="text" id="tel" placeholder="请输入手机号" />
        </div>
        <div class="input-group">
            <label for="pwd">密码</label>
            <input type="password" id="pwd" placeholder="请输入密码" />
        </div>
        <div>
            <button class="submit-button" onclick="login()">登录</button>
            <button class="submit-button" onclick="jmpToRegister()">还没有账号？点击注册</button>
        </div>
        <div id="errorMessage" class="error-message"></div>
    </div>

    <script>
        function login() {
            // 获取手机号和密码
            const tel = document.getElementById('tel').value;
            const pwd = document.getElementById('pwd').value;
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = ''; // 清除任何之前的错误消息

            // 前端简单验证
            if (!tel || !pwd) {
                errorMessage.textContent = '手机号和密码不能为空';
                return;
            }

            // 使用 fetch API 发送 POST 请求到后端
            fetch('/cust/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tel: tel,
                    pwd: pwd
                })
            })
                .then(response => response.json())  // 解析 JSON 响应
                .then(data => {
                    console.log(data);  // 输出后端返回的数据
                    if (data.result) {
                        window.location.href = '/home';  // 登录成功后跳转到首页
                    } else {
                        errorMessage.textContent = '登录失败，用户名或密码错误';  // 显示错误信息
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    errorMessage.textContent = '登录请求失败，请稍后重试';
                });
        }

        function jmpToRegister() {
            window.location.href = '/cust/register';
        }
    </script>
</body>

</html>