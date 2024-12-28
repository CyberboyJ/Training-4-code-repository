const { Controller } = require('egg');

class AddressController extends Controller {
  
    async getAddress(){
        console.log(this.ctx.body);
		const rule = {
			tel: { type: 'string', required: true ,message:"请输入正确的手机号码"},
            default:{type:'string',required:true,message:"请输入正确的类型"}
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.body);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{

        // {
        //     tel:
        //     default:
        // }
        const rs=this.ctx.service.order.insertOrder(this.ctx.request.body.tel,this.ctx.request.body.default);
        this.ctx.body=rs
        }
    }
    
}
module.exports = AddressController;