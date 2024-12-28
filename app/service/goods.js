'use strict';
const Service = require('egg').Service;

class GoodsService extends Service { 
  async getAll() {
    // 查全表
	let result;
	try{
	    // let sql = `select goodsId,goodsName from goods`;
	    result = await this.app.mysql.select("goods");
	}catch(error){
	    console.log(error);
	}
	return result;
  }
  
  async getGroupByGid(gid){
	let rs;
	try{
		rs = await this.app.mysql.select("goods",{where:{goodsTypeId:gid},columns:['goodsId','goodsName','goodsExplain','goodsImg','goodsPrice']})
	}catch(error){
		console.log(error);
	}
	return rs;
  }
  async getByGid(gid){
	let rs;
	try{
		rs = await this.app.mysql.select("goods",{where:{goodsId:gid},columns:['goodsId','goodsName','goodsExplain','goodsImg','goodsPrice']})
	}catch(error){
		console.log(error);
	}
	return rs;
  }
}

module.exports = GoodsService;