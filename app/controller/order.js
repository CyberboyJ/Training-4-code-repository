const { Controller } = require('egg');

const Parameter = require('parameter'); 
const parameter = new Parameter();

class OrderController extends Controller {
  
	async creartOrder(){
        console.log(this.ctx.request.body);
		// {
		// 	"telId": , 
		// 	"addressId": , 
		// 	"orderTotal": ,
		// 	"orderDetails":[{"goodsId": ,"quantity": }]
		// }
		const rule = {  //参数检验
			telId: { type: 'string', required: true ,message:"请输入正确的手机号码"},
			addressId:{type:'string',required:true,message:"请输入正确的地址"},
			orderTotal:{type:'string',required:true,message:"请输入正确的金额总量"},
			orderDetails:{type:'string',required:true,message:"商品详细信息"},
		};  

		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let rs=await this.ctx.service.order.insertOrder(this.ctx.request.body);
			this.ctx.body=rs;
		}


	}
	
	async QueryOrderById(){
		console.log(this.ctx.query.gid);
		// {
		// 	"telId": , 
		// 	"addressId": , 
		// 	"orderTotal": ,
		// 	"orderDetails":[{"goodsId": ,"quantity": }]
		// }
		const rule = {  //参数检验
			orderId: { type: 'string', required: true ,message:"请输入正确的订单编号"}
		};  
		const validateErrors = parameter.validate(rule, this.ctx.query.gid);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let rs=await this.ctx.service.order.SelectOrderByID(this.ctx.query.gid);
			this.ctx.body=rs;
		}
	}
}
module.exports = OrderController;