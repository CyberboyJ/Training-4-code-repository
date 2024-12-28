//1.导入controller 对象
const {
	Controller
} = require('egg');

//导入paramter组件
const Parameter = require('parameter'); 
const parameter = new Parameter();

//2.自定义一个Controller类 继承 Controller
class CustomerController extends Controller {

	//4.自定义函数 处理客户端请求 并响应客户端
	//5.在router.js中为该函数配置路由规则（请求路径和请求方式）

	async register() {
		//1、取  取"请求"request(query、param、body)中的参数
		const rule={
			telId:{
				type:'number',
				required: true,
				message:"请正确输入手机号"
			},
			password:{type:'string',min:3,max:8,required:true,message:"请输入3-8位密码"},
			customerName:{type:'string',min:3,max:8,required:true,message:"请输入用户名"},
			remarks:{type:'string',required:false}
		}
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{	
			let params= this.ctx.request.body;
			// params 
			// {
			// 	tel:"18971239012",
			// 	uname:"sam",
			// 	pwd:"111111"
			// }
			//2、调 调用业务逻辑层函数 
			//当前对象.上下对象.service.文件名.函数名(参数)
			let rs= await this.ctx.service.customer.addCustomer(params);
			//3. 转 输入json数据 向客户端输出json内容
			this.ctx.body={result:rs}	
		}
	}


	async login(){ //pass test
		//1、取  取"请求"request(query、param、body)中的参数
		// 验证规则

		console.log("test login");
		console.log(this.ctx.request.body);
		const rule = {
			tel: { type: 'string', required: true ,message:"请输入正确的手机号码"},
			pwd:{type:'string',min:3,max:8,required:true,message:"请输入3-8位密码"}
		};  
		
		//验证请求中参数
		const validateErrors = parameter.validate(rule, this.ctx.request.body);
		console.log(validateErrors)
		
		if(validateErrors){
			this.ctx.body=validateErrors
		}else{
			let params=this.ctx.request.body;
			let rs=await this.ctx.service.customer.selectCustByTelAndPwd(params.tel,params.pwd);
			this.ctx.body=rs
		}
		
	
	}

	// async queryCustomerByTelByPwd()
	// {
	// 	//参数检验 need ddd
	// 	const rule = {
	// 		tel: { type: 'string', required: true ,message:"请输入正确的手机号码"},
	// 		pwd:{type:'string',min:3,max:8,required:true,message:"请输入3-8位密码"}
	// 	};  
		
	// 	//验证请求中参数
	// 	const validateErrors = parameter.validate(rule, this.ctx.request.body);
	// 	let params = this.ctx.request.body;
	// 	let rs = await this.ctx.service.customer.selectCustByTelAndPwd(params.telId,params.password);
	// 	this.ctx.body = rs;
	// }

}

//3.导出自定义Controller类
module.exports = CustomerController;