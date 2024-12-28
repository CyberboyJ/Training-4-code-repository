const { Controller } = require('egg');

class OrderController extends Controller {
  
	async creartOrder(){
		//1、取
		//this.ctx.request.body
		//2、调
		const rs=this.ctx.service.order.insertOrder(this.ctx.request.body);
		//3、输出
		this.ctx.body=rs
	}
	
}
module.exports = OrderController;