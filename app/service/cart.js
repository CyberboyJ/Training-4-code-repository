//1.导入Service对象
'use strict';
const Service = require('egg').Service;

//2.自定义类 继承 Service
//CustomerService 此类处理 Customer对应的业务逻辑 和访问数据库的增删改查
class CartService extends Service {
    //4.写自定义函数
    async selectCartByTelldByCartld(tel, cid) {
        let rs;
        try {
            rs = this.app.mysql.count("cart", {telId: tel, cartId: cid } );
        }
        catch (error) {
            console.log(error);
        }
        return rs;
    }

    //插入新商品记录
    async newCartMessage(cart) {
        let rs;
        try {
            let cartNo = await this.createNo();
            console.log("in the insert Fuction");
            console.log(cartNo);
            console.log(cart);
            rs = await this.app.mysql.insert("cart", {
                cartId: cartNo,
                goodsId: cart.goodsId,
                telId: cart.tel,
                quantity: cart.quantity,
                state: 0
            })
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;

    }

    //更新商品数量
    async updateQuantityCartByTelIdBygid(cart) {
        let rs;
        try {
            rs = await this.app.mysql.update("cart", {
                quantity: cart.quantity
            }, { where: { telId: cart.telId, cartId: cart.cartId } });
            console.log(rs);
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
        let rs;
        try {
            rs = this.app.mysql.count("cart", { telId: tel });
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    //更新勾选状态
    async updateState(tel, cid) {
        let rs;
        try {
            rs = await this.app.mysql.update("cart", { state: 1 }, { where: { telId: tel, cartId: cid } });
        } catch (error) {
            console.log(error);
        }
        return rs.affectedRows > 0;
    }

    //删除
    async deleteByGidByTelID(tel, cid) {
        let rs;
        try {
            rs = await this.app.mysql.delete("cart", {telId: tel, cartId: cid });
        } catch (error) {
            console.log(error);
            return error;
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