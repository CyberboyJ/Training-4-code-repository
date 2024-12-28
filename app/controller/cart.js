const { Controller } = require('egg');

//导入paramter组件
const Parameter = require('parameter'); 
const parameter = new Parameter();

class CartController extends Controller {
  
    async selectCartByTelldByGoodsld(){
        console.log(this.ctx.request.body);
		const rule = {
			tel: { type: 'string', required: true ,message:"请输入正确的手机号码"},
			gid:{type:'string',required:true,message:"请输入正确的商品ID"}
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let params=this.ctx.request.body;
			let rs=await this.ctx.service.cart.selectCartByTelldByGoodsld(params.tel,params.pwd);
			this.ctx.body=rs;
		}
		
     }
    
    async insertCart(){
        console.log(this.ctx.request.body);
		const rule = {
			telId: { type: 'string', required: true ,message:"请输入正确的手机号码"},
			goodsId:{type:'string',required:true,message:"请输入正确的商品ID"},
            quantity:{type:'string',required:true,message:"需要正确的数量"} // 如何写，数量为数，至少大于1
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let params=this.ctx.request.body;
			let rs=await this.ctx.service.cart.newCartMessage(params);
			this.ctx.body=rs;
		}
    }
    
    async updateQuantityCart(){
        console.log(this.ctx.request.body);
		const rule = {
			telId: { type: 'string', required: true ,message:"请输入正确的手机号码"},
			goodsId:{type:'string',required:true,message:"请输入正确的商品ID"},
            quantity:{type:'string',required:true,message:"需要正确的数量"} // 如何写，数量为数，至少大于1
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let params=this.ctx.request.body;
			let rs=await this.ctx.service.cart.updateQuantityCartByTelIdBygid(params);
			this.ctx.body=rs;
		}
    }
    
    async selectCartByTelId(){
        console.log(this.ctx.params);
		const rule = {
			telId: { type: 'string', required: true ,message:"请输入正确的手机号码"}
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.params);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let params=this.ctx.params.telId;
			let rs=await this.ctx.service.cart.QueryByTelId(params);
			this.ctx.body=rs;
		}
    }
    async selectCartCountByTelId(){
        console.log(this.ctx.params);
		const rule = {
			telId: { type: 'string', required: true ,message:"请输入正确的手机号码"}
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.params);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let params=this.ctx.params.telId;
			let rs=await this.ctx.service.cart.QueryCountByTelId(params);
			this.ctx.body=rs;
		}
    }
    
    async updateCartCountByTelId(){
        console.log(this.ctx.params);
		const rule = {
			telId: { type: 'string', required: true ,message:"请输入正确的手机号码"},
            goodsId:{type:'string',required:true,message:"请输入正确的商品ID"},
            quantity:{type: 'string', required: true ,message:"请输入正确的数量"}
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.params);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let params=this.ctx.params;
			let rs=await this.ctx.service.cart.updateQuantityCartByTelIdBygid(params);
			this.ctx.body=rs;
		}
    }
    
    async updateCartState(){
        console.log(this.ctx.params);
		const rule = {
			telId: { type: 'string', required: true ,message:"请输入正确的手机号码"},
            goodsId:{type:'string',required:true,message:"请输入正确的商品ID"}
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.params);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let params=this.ctx.params;
			let rs=await this.ctx.service.cart.updateQuantityCartByTelIdBygid(params.telId,params.goodsId);
			this.ctx.body=rs;
		}
    }

    async deleteCartByTelIdByGoodsId(){
        console.log(this.ctx.params);
		const rule = {
			telId: { type: 'string', required: true ,message:"请输入正确的手机号码"},
            goodsId:{type:'string',required:true,message:"请输入正确的商品ID"}
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.params);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let params=this.ctx.params;
			let rs=await this.ctx.service.cart.deleteByGidByTelID(params.telId,params.goodsId);
			this.ctx.body=rs;
		}
    }
}
module.exports = CartController;