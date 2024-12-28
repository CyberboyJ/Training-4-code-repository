//1.导入Service对象
'use strict';
const Service = require('egg').Service;

//2.自定义类 继承 Service
//CustomerService 此类处理 Customer对应的业务逻辑 和访问数据库的增删改查
class CartService extends Service {
    //4.写自定义函数
    async selectCartByTelldByGoodsld(tel, gid) {
        let rs;
        try {
            rs = this.app.mysql.count("cart", { telId: tel, goodsId: gid  });
        }
        catch (error) {
            console.log(error);
        }
        return rs;
    }

    //插入新商品记录
    async newCartMessage(cart) {
        console.log(cart);
        let rs;
        try {
            const flag = await this.app.mysql.select("cart",{where:{telId:cart.tel,goodsId:cart.goodsId}});
            if(flag.length!=0)
            {
                console.log("here 2");
                console.log(flag);
                let newQuantity =flag[0].quantity+cart.quantity;
                rs = await this.app.mysql.update("cart",{quantity:newQuantity},{where:{telId: cart.tel, goodsId: cart.goodsId}})
                return rs.affectedRows > 0;
            }else
            {
                let cartNo = await this.createNo();
                rs =await this.app.mysql.insert("cart", {
                    cartId: cartNo,
                    goodsId: cart.goodsId,
                    telId: cart.tel,
                    quantity: cart.quantity,
                    state: 0
                })
                console.log(rs);
                return rs.affectedRows > 0;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //更新商品数量
    async updateQuantityCartByTelIdBygid(cart) {
        let rs;
        console.log("in the function "+ cart);
        console.log(cart);
        try {
            rs = await this.app.mysql.update("cart", {
                quantity: cart.quantity
            }, {where:{telId: cart.tel, goodsId: cart.goodsId} });
        } catch (error) {
            console.log(error);
        }
        return rs.affectedRows > 0;
    }

    //关联查询，商品信息
    async QueryByTelId(tel) {
        let rs;
        try {
            rs = this.app.mysql.select("cart", { where: { telId: tel } });
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    async QueryCountByTelId(tel) {
        console.log("in the function" + tel);
        let rs;
        try {
            rs = await this.app.mysql.count("cart", {telId:tel});
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    //更新勾选状态
    async updateState(tel, gid) {
        let rs;
        try {
            rs = await this.app.mysql.update("cart", { state: 1 }, { where: { telId: tel, goodsId: gid } });
        } catch (error) {
            console.log(error);
        }
        return rs.affectedRows > 0;
    }

    //删除
    async deleteByGidByTelID(tel, gid) {
        let rs;
        try {
            rs = await this.app.mysql.delete("cart", {telId: tel, goodsId: gid });
        } catch (error) {
            console.log(error);
        }
        return rs.affectedRows > 0;
    }

    //生成订单编号
    async createNo() {
        let id = 1;
        while (true) {
            const total = await this.app.mysql.count('cart', { cartId: id });
            if (total == 0)
                return id;
            id = id + 1;
        }
    }
}

//3.导出类
module.exports = CartService;