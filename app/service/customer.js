'use strict';
const Service = require('egg').Service;

// 自定义类 继承 Service
// CustomerService 此类处理 Customer 对应的业务逻辑 和访问数据库的增删改查
class CustomerService extends Service {

	async selectCustByTelAndPwd(telId, pwd) {
		let rs;
		try {
			// // 强制转为字符串类型
			// const telStr = String(telId);
			// const pwdStr = String(pwd);

			rs = await this.app.mysql.select("customer", {
				where: {
					telId: telId,
					password: pwd,
				},
				columns: ['telId', 'customerName', 'remarks'],
				limit: 1,
				offset: 0,
			});
			return rs;
		} catch (e) {
			console.log('Error:', e);
			return null;
		}
	}

	// 通过手机号查询用户
	async selectCustByTel(telId) {
		let rs;
		try {
			// 查询手机号是否已注册
			rs = await this.app.mysql.select("customer", {
				where: { telId: telId },
				columns: ['telId', 'customerName', 'remarks'],
				limit: 1,
			});
			console.log("找到的用户信息：" + rs[0]);
			return rs[0];
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	// 添加用户到数据库
	async addCustomer(cust) {
		const { telId, customerName, password, remarks } = cust;
		let rs;
		console.log('数据库连接状态:', this.app.mysql);
		console.log('新增用户信息:');
		console.log(cust);
		try {
			// 检查手机号是否已经注册
			const existingCustomer = await this.selectCustByTel(telId);
			if (existingCustomer && existingCustomer.length > 0) {
				return { success: false, message: "该手机号已被注册" };
			}

			// 插入
			const result = await this.app.mysql.insert('customer', {
				telId: telId,
				customerName: customerName,
				password: password,
				remarks: remarks || '',  // 备注字段可选
			});
			if (result.affectedRows === 1) {
				return { success: true, message: "注册成功" };
			} else {
				return { success: false, message: "注册失败，请稍后重试" };
			}

		} catch (e) {
			console.log(e);
			return { success: false, message: "数据库操作失败" };
		}
	}

	// 更新用户信息
	async updateCustomer(cust) {
		let result = false;
		try {
			// 更新用户信息
			result = await this.app.mysql.update("customer", cust, {
				where: { telId: cust.telId }, // 根据手机号查找对应用户
			});
		} catch (e) {
			console.log(e);
			return false; // 更新失败返回 false
		}
		return result.affectedRows === 1; // 判断是否更新成功
	}

	// 删除用户
	async deleteCustomer(telId) {
		let result = false;
		try {
			// 根据手机号删除用户
			result = await this.app.mysql.delete("customer", { telId: telId });
		} catch (e) {
			console.log(e);
			return false; // 删除失败返回 false
		}
		return result.affectedRows === 1; // 判断是否删除成功
	}

}

// 导出 CustomerService 类
module.exports = CustomerService;