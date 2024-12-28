const { Controller } = require('egg');

//导入paramter组件
const Parameter = require('parameter');
const parameter = new Parameter();

class CartController extends Controller {

	//根据客户手机号码和商品编号查询购物车中是否已经存在此商品
	async selectCartByTelldByGoodsld() { //pass test
		console.log(this.ctx.request.query);
		const rule = {
			tel: {
				type: 'string',
				required: true,
				message: "请输入手机号",
				// 正则表达式验证手机号格式，假设为中国大陆的手机号格式
				validate: (value) => /^[1][3-9][0-9]{9}$/.test(value),
				message: "手机号码格式错误"
			},
			goodsId: {
				type: 'string',
				required: true,
				message: "商品ID格式错误"
			}
		};

		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.request.query);
		console.log(validateErrors)

		if (validateErrors) {
			this.ctx.body = validateErrors
		} else {
			let params = this.ctx.request.query;
			let rs = await this.ctx.service.cart.selectCartByTelldByGoodsld(params.tel, params.goodsId);
			this.ctx.body = rs;
		}

	}

	//向购物车中插入一件商品
	async insertCart() { //pass test
		console.log(this.ctx.request.body);
		const rule = {
			tel: {
				type: 'string',
				required: true,
				message: "请输入手机号",
				// 正则表达式验证手机号格式，假设为中国大陆的手机号格式
				validate: (value) => /^[1][3-9][0-9]{9}$/.test(value),
				message: "手机号码格式错误"
			},
			goodsId: {
				type: 'string',
				required: true,
				message: "商品ID格式错误"
			},
			quantity: {
				type: 'number',
				required: true,
				message: "需要正确的数量",
				validator: (rule, value, callback) => {
					if (!value || isNaN(Number(value))) {
						callback("数量必须是有效的数字");
					} else if (Number(value) <= 1) { // 转化为数字后判断是否大于 1
						callback("数量必须大于 1");
					} else {
						callback();
					}
				}
			}
		};

		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)

		if (validateErrors) {
			this.ctx.body = validateErrors
		} else {
			let params = this.ctx.request.body;
			let rs = await this.ctx.service.cart.newCartMessage(params);
			this.ctx.body = rs;
		}
	}

	//根据客户手机号码和商品编号更新购物车中某商品的数量
	async updateQuantityCart() {//pass test
		console.log(this.ctx.request.body);
		const rule = {
			tel: {
				type: 'string',
				required: true,
				message: "请输入手机号",
				// 正则表达式验证手机号格式，假设为中国大陆的手机号格式
				validate: (value) => /^[1][3-9][0-9]{9}$/.test(value),
				message: "手机号码格式错误"
			},
			goodsId: {
				type: 'string',
				required: true,
				message: "商品ID格式错误"
			},
			quantity: {
				type: 'int',
				required: true,
				message: "需要正确的数量",
				validator: (rule, value, callback) => {
					if (!value || isNaN(Number(value))) {
						callback("数量必须是有效的数字");
					} else if (Number(value) <= 1) { // 转化为数字后判断是否大于 1
						callback("数量必须大于 1");
					} else {
						callback();
					}
				}
			}
		};

		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)

		if (validateErrors) {
			this.ctx.body = validateErrors
		} else {
			let params = this.ctx.request.body;
			let rs = await this.ctx.service.cart.updateQuantityCartByTelIdBygid(params);
			this.ctx.body = rs;
		}
	}

	//根据客户手机号码查询购物车信息
	async selectCartByTelId() { // 多余方法
		console.log("start");
		console.log(this.ctx.params);
		const rule = {
			telId: { type: 'int', required: true, message: "请输入正确的手机号码" }
		};

		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.params);
		console.log(validateErrors)

		if (validateErrors) {
			this.ctx.body = validateErrors
		} else {
			let params = this.ctx.params.tel;
			console.log("test2 "+params);
			console.log("test");
			let rs = await this.ctx.service.cart.QueryByTelId(params);
			this.ctx.body = rs;
		}
	}

	//根据客户手机号码查询购物车中有多少种商品
	async selectCartCountByTelId() { // pass test
		console.log(this.ctx.params);
		const rule = {
			tel: {
				type: 'string',
				required: true,
				message: "请输入手机号",
				// 正则表达式验证手机号格式，假设为中国大陆的手机号格式
				validate: (value) => /^[1][3-9][0-9]{9}$/.test(value),
				message: "手机号码格式错误"
			},
		};

		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.params);
		console.log(validateErrors)

		if (validateErrors) {
			this.ctx.body = validateErrors
		} else {
			let params = this.ctx.params.tel;
			let rs = await this.ctx.service.cart.QueryCountByTelId(params);
			this.ctx.body = rs;
		}
	}

	//根据客户手机号码和商品编号更新购物车中某个商品是否被选中
	async updateCartState() {
		console.log(this.ctx.body);
		const rule = {
			tel: {
				type: 'string',
				required: true,
				message: "请输入手机号",
				// 正则表达式验证手机号格式，假设为中国大陆的手机号格式
				validate: (value) => /^[1][3-9][0-9]{9}$/.test(value),
				message: "手机号码格式错误"
			},
			goodsId: {
				type: 'string',
				required: true,
				message: "商品ID格式错误"
			}
		};

		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.body);
		console.log(validateErrors)

		if (validateErrors) {
			this.ctx.body = validateErrors
		} else {
			let params = this.ctx.body;
			//查询原商品的勾选状态
			let rs_tmp = await this.ctx.service.cart.searchCartByTelldByGoodsld(params.telId, params.goodsId);

			let newState = rs_tmp && rs_tmp.state != null ? !rs_tmp.state : 0; //默认设置为0
			let rs = await this.ctx.service.cart.updateState(params.telId, params.goodsId, newState);

			this.ctx.body = rs;
		}
	}

	//根据客户手机号码和商品编号删除购物车种某个商品
	async deleteCartByTelIdByGoodsId() { //pass test
		console.log(this.ctx.query);
		const rule = {
			tel: {
				type: 'string',
				required: true,
				message: "请输入手机号",
				// 正则表达式验证手机号格式，假设为中国大陆的手机号格式
				validate: (value) => /^[1][3-9][0-9]{9}$/.test(value),
				message: "手机号码格式错误"
			},
			goodsId: {
				type: 'string',
				required: true,
				message: "商品ID格式错误"
			}
		};

		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.query);
		console.log(validateErrors)

		if (validateErrors) {
			this.ctx.body = validateErrors
		} else {
			let params = this.ctx.query;
			let rs = await this.ctx.service.cart.deleteByGidByTelID(params.tel, params.goodsId);
			this.ctx.body = rs;
		}
	}
}
module.exports = CartController;