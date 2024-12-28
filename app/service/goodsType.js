'use strict';
const Service = require('egg').Service;

class GoodsTypeService extends Service { 
  async getAll() {
    // 查全表
	let result;
	try{
	    // `select goodsTypeId,goodsTypeName from goodstype`;
	    result = await this.app.mysql.select("goodstype",{columns:['goodsTypeId','goodsTypeName','goodsTypeImg','remarks']}); // which colmn?
	}catch(error){
	    console.log(error);
	}
	return result;
  }

  async getAllCascade(){  //查询每个分组的商品，并按照分类组成list返回

    let typesList = await this.app.mysql.select("goodstype",{columns:['goodsTypeId','goodsTypeName']});
    console.log("in getALL cascade\n");
    console.log(typesList);
    let rs = [];
    for(let i in typesList){
        let typeRsList = await this.app.mysql.select("goods",{where:{goodsTypeId:typesList[i].goodsTypeId},columns:['goodsId',"goodsName",'goodsExplain','goodsImg','goodsPrice']})
        // console.log(i);
        // console.log("how typeRsList length look like :"+typeRsList.length);
        let pushOne = {
            typeName: typesList[i].goodsTypeName,
            typeList: typeRsList
        }
        rs.push(pushOne);
    }
    // console.log("how rs length look like :"+rs.length);
    return rs;
  }
}

module.exports = GoodsTypeService;