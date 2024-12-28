const { Controller } = require('egg');

const Parameter = require('parameter'); 
const parameter = new Parameter();

class AddressController extends Controller { // pass test 
  
    async getAddress(){
        // console.log("test get Address");
        console.log(this.ctx.request.body);
		const rule = {
			tel: { type: 'string', required: true ,message:"请输入正确的手机号码"},
            default:{type:'string',required:true,message:"请输入正确的类型"}
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{

        // {
        //     tel:
        //     default:
        // }
        const rs= await this.ctx.service.address.selectAddressByTelAndDefault(this.ctx.request.body.tel,this.ctx.request.body.default);
        this.ctx.body=rs
        }
    }

}
module.exports = AddressController;