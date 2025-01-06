const { Controller } = require('egg');

//导入paramter组件
const Parameter = require('parameter');
const parameter = new Parameter();

class GoodsController extends Controller {

	async getGoodsByGroupId() {
		// console.log(this.ctx.query.gid)
		// // const rule={
		// // 	gid:{type:"integer",required: true,
		// // 		message:"请正确传入商品组编号"}
		// // }
		// const rule={
		// 	gid: "int"
		// }  /////???? 参数检验有问题，但是不清楚具体原因

		// // let vErr=parameter.validate(rule,this.ctx.query);
		// // if(vErr){
		// // 	this.ctx.body=vErr
		// // }else{
		// 	const goods = await this.ctx.service.goods.getGroupByGid(this.ctx.query.gid);
		// 	this.ctx.body=goods;
		// // }
		const { ctx } = this;

		// 获取请求中的 goodsTypeId（前端会传递这个参数）
		console.log("query：")
		console.log(ctx.request.query)
		const goodsTypeId = ctx.request.query.goodsTypeId;
		console.log("Received goodsTypeId:", goodsTypeId); // 打印接收到的商品类型ID

		if (!goodsTypeId) {
			this.ctx.body = { error: "goodsTypeId is required" };
			return;
		}

		// 调用 service 层获取商品数据
		const goods = await this.ctx.service.goods.getGroupByGid(goodsTypeId);
		this.ctx.body = goods;
	}



	async getByGoodId() {
		// console.log(this.ctx.params)
		// const rule = {
		// 	gid: {
		// 		type: "string", required: true,
		// 		message: "请正确传入商品编号"
		// 	} /////?? 正确的参数检测条件
		// }
		// let vErr = parameter.validate(rule, this.ctx.params);
		// if (vErr) {
		// 	this.ctx.body = vErr
		// } else {

		// 	this.ctx.body = await this.ctx.service.goods.getByGid(this.ctx.params.gid);
		// }
		console.log("query：");
		console.log(this.ctx.request.query)
		const goodsId = this.ctx.request.query.goodsId;  // 从请求体中获取商品 ID
		const goods = await this.ctx.service.goods.getByGid(goodsId);  // 查询商品信息
		this.ctx.body = goods;  // 返回商品信息

	}

	async list() {
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