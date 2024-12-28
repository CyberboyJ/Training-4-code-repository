//1.导入Service对象
'use strict';
const Service = require('egg').Service;

//2.自定义类 继承 Service
//CustomerService 此类处理 Customer对应的业务逻辑 和访问数据库的增删改查
class CustomerService extends Service {
	//4.写自定义函数
	async selectCustByTelAndPwd(tel, pwd) {
		let rs;
		try {
			//console.log(this.app.mysql)
			rs = await this.app.mysql.select("customer", {
				where: {
					telId: tel,
					password:pwd
				}, // WHERE 条件
				columns: ['telId', 'customerName',"remarks"], // 要查询的字段
				limit: 1, // 返回数据量
				offset: 0, // 数据偏移量
			})
			return rs;
		} catch (e) {
			console.log(e)
			return null
		}
	}

	async selectCustByTel(tel) {

	}


	async selectCustByNickname(uname) {

	}


	//新增用户
	//customer  {
	// 	telId:"18971239012",
	// 	customerName:"sam",
	// 	password:"111111"
	// }
	async addCustomer(cust) {
		let result = false;
		try {

			result= await this.app.mysql.insert("customer",cust)
			// let result = await this.app.mysql.insert("customer", {
			// 	telId: cust.tel,
			// 	customerName: cust.uname,
			// 	password: cust.pwd,
			// 	remarks:cust.remarks
			// })

		} catch (e) {
			console.log(e)
			return false;
		}
		return result.affectedRows === 1;
	}



}

//3.导出类
module.exports = CustomerService;