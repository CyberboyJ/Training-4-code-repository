const { Controller } = require('egg');

//导入paramter组件
const Parameter = require('parameter'); 
const parameter = new Parameter();

class GoodsTypeController extends Controller {
  
    // async getGoodsById(){
    //     // console.log(this.ctx.query.gid)
    //     const rule={
    //         gid:{type:"number",required: true,
    //             message:"请正确传入商品编号"}
    //     }
    //     let vErr=parameter.validate(this.ctx.query)
    //     if(vErr){
    //         this.ctx.body=vErr
    //     }else{
    //         //2
    //         //3
    //         this.ctx.body="ok"
    //     }
    // }
    
    
    
    // async getGoodsById2(){
    //     console.log(this.ctx.params)
    //     const rule={
    //         gid:{type:"number",required: true,
    //             message:"请正确传入商品编号"}
    //     }
    //     let vErr=parameter.validate(this.ctx.params)
    //     if(vErr){
    //         this.ctx.body=vErr
    //     }else{
    //         //2
    //         //3
    //         this.ctx.body="ok"
    //     }
        

    // }
    
    async listAllType(){   //// need test
        const { ctx } = this;
        const goodsTypes = await ctx.service.goodsType.getAll();
        const list = JSON.parse(JSON.stringify(goodsTypes));
        console.log("Select GOOdsTypeAll normal "+ list);
        // console.log(list);
        // const dataList = {
        //     list: list
        // };
        // await this.ctx.render('goods.tpl', dataList);
        this.ctx.body = list;
    }

    async selectGoodsTypeAllByPC(){
        const{ctx} = this;
        const goodsTypes = await ctx.service.goodsType.getAllCascade();
        const list = JSON.parse(JSON.stringify(goodsTypes));
        console.log("Select GOOdsTypeAll by PC "+ list);
        // const dataList = {
        //     list: list
        // };
        // await this.ctx.render('goods.tpl', dataList);
        this.ctx.body = list;
    }
    
}
module.exports = GoodsTypeController;