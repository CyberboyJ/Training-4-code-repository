//1.导入Service对象
'use strict';
const Service = require('egg').Service;

//2.自定义类 继承 Service
//CustomerService 此类处理 Customer对应的业务逻辑 和访问数据库的增删改查
class OrderService extends Service {
	//4.写自定义函数
	async insertOrder(order) {
		let rs = 0;
		try {
			//	1
			let orderNo = await this.createOrderNo();

			// 	2、开启事务
			const conn = await this.app.mysql.beginTransaction(); // 初始化事务
			try {
				// 	3、新增订单记录 一条记录
				const rs1 = await conn.insert("orders", {
					orderId: orderNo,
					telId: order.telId,
					addressId: order.addressId,
					orderTotal: order.orderTotal,
					orderDate: conn.literals.now, ///// what this
					orderState: 0
				})
				rs += rs1.affectedRows;
				// 	4、循环添加订单明细  N条记录
				for (var i in order.orderDetails) {
					const rs2 = await conn.insert("orderdetails", {
						orderId: orderNo,
						goodsId: order.orderDetails[i].goodsId,
						quantity: order.orderDetails[i].quantity,
					})
					rs += rs1.affectedRows;
				}


				// 	5、删除购物车记录
				for (var i in order.orderDetails) {
					const rs2 = await conn.delete("cart", {
						telId: order.telId,
						goodsId: order.orderDetails[i].goodsId,
					})
				}
				// 	7、提交
				await conn.commit(); // 提交事务
				return { success: true, orderId: orderNo }; // 返回生成的订单ID和成功标志
				// return true;
			}
			catch (e) {
				// 	6、判断是否有误 回滚
				console.log(e)
				// 错误，回滚
				await conn.rollback(); // 一定记得捕获异常后回滚事务！！
				return { success: false }; // 返回失败信息
				// return false
			}

		} catch (e) {
			console.log(e)
			return { success: false }; // 返回失败信息
			// return false
		}
	}


	async createOrderNo() {
		while (true) {
			// 1、生成订单编号，并验证编号是否存在
			let orderId = () => {
				{
					let now = new Date();
					let year = now.getFullYear();
					let month = now.getMonth() + 1;
					let day = now.getDate();
					month = month < 10 ? "0" + month : month;
					day = day < 10 ? "0" + day : day;

					let hours = now.getHours();
					let minutes = now.getMinutes();
					let seconds = now.getSeconds();
					let ms = now.getMilliseconds();
					hours = hours < 10 ? "0" + hours : hours;
					minutes = minutes < 10 ? "0" + minutes : minutes;
					seconds = seconds < 10 ? "0" + seconds : seconds;

					return `${year}${month}${day}${hours}${minutes}${seconds}${ms}`
				}
			}
			const oId = orderId()
			const total = await this.app.mysql.count('orders', { orderId: oId });
			if (total == 0)
				return oId;
		}


	}

	async SelectOrderByID(orderId) {
		console.log("开始查询订单信息。。。");
		try {
			const order = await this.app.mysql.get('orders', { orderId: orderId });
			// 如果没有找到订单，返回 null
			if (!order) {
				return null;
			}

			// 通过订单中的 telId 查询客户信息
			const customer = await this.app.mysql.get('customer', { telId: order.telId });

			// 通过订单中的 addressId 查询收货地址信息
			const address = await this.app.mysql.get('address', { addressId: order.addressId });

			// 构建 Orders 对象，包含订单、客户和地址信息
			const orders = {
				orderId: order.orderId,
				orderTotal: order.orderTotal,
				telId: order.telId,
				customerName: customer.customerName,
				address: address.address,
				contactName: address.contactName,
				contactTel: address.contactTel,
			};

			return orders;

		} catch (error) {
			console.error("Error in selectOrdersById:", error);
			return null; // 查询失败时返回 null
		}
	}
}

//3.导出类
module.exports = OrderService;