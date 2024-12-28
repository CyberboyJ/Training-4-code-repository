const { Controller } = require('egg');

//导入paramter组件
const Parameter = require('parameter'); 
const parameter = new Parameter();

class GoodsController extends Controller {
  
	async getGoodsByGroupId(){
		console.log(this.ctx.query.gid)
		// const rule={
		// 	gid:{type:"integer",required: true,
		// 		message:"请正确传入商品组编号"}
		// }
		const rule={
			gid: "int"
		}  /////???? 参数检验有问题，但是不清楚具体原因
		
		// let vErr=parameter.validate(rule,this.ctx.query);
		// if(vErr){
		// 	this.ctx.body=vErr
		// }else{
			const goods = await this.ctx.service.goods.getGroupByGid(this.ctx.query.gid);
			this.ctx.body=goods;
		// }
	}
	
	
	
	async getByGoodId(){
		console.log(this.ctx.params)
		const rule={
			gid:{type:"string",required: true,
				message:"请正确传入商品编号"} /////?? 正确的参数检测条件
		}
		let vErr=parameter.validate(rule,this.ctx.params);
		if(vErr){
			this.ctx.body=vErr
		}else{
				
			this.ctx.body = await this.ctx.service.goods.getByGid(this.ctx.params.gid);
		}
		

	}
	
	async list(){
		const { ctx } = this;
		const goods = await ctx.service.goods.getAll();
		const list = JSON.parse(JSON.stringify(goods));
		console.log(list);
		const dataList = {
			list: list
		};
		await this.ctx.render('goods.tpl', dataList);
	}
	
}
module.exports = GoodsController;