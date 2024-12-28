//1.导入Service对象
'use strict';
const Service = require('egg').Service; 

//2.自定义类 继承 Service
//CustomerService 此类处理 Customer对应的业务逻辑 和访问数据库的增删改查
class AddressService extends Service {
	//4.写自定义函数
	async selectAddressByTelAndDefault(Tel,DefaultState){
		// console.log(Tel+"  "+DefaultState);
		let rs;
		try{
            rs = await this.app.mysql.select("address",{where:{telId:Tel,defaultState:DefaultState}})
			// console.log("show address :");
			// console.log(rs);
		}catch(e){
			console.log(e)
            return false;
		}
        return rs;
	}
	

}

//3.导出类
module.exports = AddressService;