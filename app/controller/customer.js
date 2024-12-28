// 1.导入controller 对象
const {
	Controller
} = require('egg');

// 导入paramter组件，用于参数验证
const Parameter = require('parameter');
const parameter = new Parameter();

// 2.自定义一个Controller类，继承 Controller 类
class CustomerController extends Controller {
	// 渲染注册页面
	async registerPage() {
		const { ctx } = this;
		await ctx.render('register.tpl');
	}

	// 用户注册处理函数
	async register() {
		// 获取请求中的参数（通过 request.body 获取 POST 请求的 body 内容）
		const rule = {
			// 手机号验证规则
			tel: {
				type: 'string',
				required: true,
				message: "请输入手机号",
				// 正则表达式验证手机号格式
				validate: (value) => /^[1][3-9][0-9]{9}$/.test(value),
				message: "手机号码格式错误"
			},
			// 用户名验证规则
			customerName: {
				type: 'string',
				min: 2,
				max: 10,
				required: true,
				message: "请输入用户名"
			},
			// 密码验证规则
			password: {
				type: 'string',
				min: 3,
				max: 8,
				required: true,
				message: "请输入3-8位密码"
			},
			//可选备注字段
			remarks: { type: 'string', required: false }
		}

		// 验证请求参数
		const validateErrors = parameter.validate(rule, this.ctx.request.body);

		// 如果参数验证失败
		if (validateErrors) {
			this.ctx.body = validateErrors
		} else {
			let params = this.ctx.request.body;
			let rs = await this.ctx.service.customer.addCustomer(params);
			this.ctx.body = rs;
			// if (rs.success) {
			// 	this.ctx.body = { result: true, message: rs.message };
			// } else {
			// 	this.ctx.body = { result: false, message: rs.message };
			// }
		}
	}

	// 渲染登录页面
	async loginPage() {
		const { ctx } = this;
		await ctx.render('login.tpl');
	}

	// 用户登录处理函数
	async login() {
		// 定义登录验证规则
		const rule = {
			// 手机号验证规则
			tel: {
				type: 'string',
				required: true,
				message: "请输入手机号",
				// 正则表达式验证手机号格式，假设为中国大陆的手机号格式
				validate: (value) => /^[1][3-9][0-9]{9}$/.test(value),
				message: "手机号码格式错误"
			},
			// 密码验证规则
			pwd: {
				type: 'string',
				min: 3,
				max: 8,
				required: true,
				message: "密码格式错误"
			}
		};
		// 验证请求中的参数是否符合规则
		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)

		// 如果参数验证失败
		if (validateErrors) {
			this.ctx.body = validateErrors
		} else {
			let params = this.ctx.request.body;
			let rs = await this.ctx.service.customer.selectCustByTelAndPwd(params.tel, params.pwd);
			this.ctx.body = rs;
			// 如果登录成功
			// if (rs && rs.length > 0) {
			// 	// rs长度大于0表示查询到用户
			// 	this.ctx.body = { result: true, message: "登录成功", user: rs[0] };
			// } else {
			// 	// 登录失败
			// 	this.ctx.body = { result: false, message: "用户名或密码错误" };
			// }
		}
	}

}

// 导出自定义 Controller 类
module.exports = CustomerController;