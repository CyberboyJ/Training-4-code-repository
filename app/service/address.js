//1.导入Service对象
'use strict';
const Service = require('egg').Service; 

//2.自定义类 继承 Service
//CustomerService 此类处理 Customer对应的业务逻辑 和访问数据库的增删改查
class AddressService extends Service {
	//4.写自定义函数
	async selectAddressByTelAndDefault(Tel,DefaultState){
		let rs=0;
		try{
            rs = this.app.mysql.select("address",{where:{contactTel:Tel,defaultState:DefaultState}})
		}catch(e){
			console.log(e)
            return false;
		}
        return rs;
	}
	
	
	async createOrderNo(){
		while(true){
			// 1、生成订单编号，并验证编号是否存在
			let orderId=() => {
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
			const oId=orderId()
			const total=await this.app.mysql.count('orders', { orderId:oId}); 
			if(total==0)
				return oId;	
		}
		
		
	}

}

//3.导出类
module.exports = AddressService;