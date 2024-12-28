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
            rs = this.app.mysql.count("cart", { where: { telId: tel, goodsId: gid } });
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
            let cartNo = this.createNo();
            rs = this.app.mysql.insert("cart", {
                cartId: cartNo,
                goodsId: cart.goodsId,
                telId: cart.telId,
                quantity: cart.quantity,
                state: 0
            })
        } catch (error) {
            console.log(error);
        }
        return rs;

    }

    //更新商品数量
    async updateQuantityCartByTelIdBygid(cart) {
        let rs;
        try {
            rs = this.app.mysql.update("cart", {
                quantity: cart.quantity
            }, { where: { telId: cart.telId, goodsId: cart.goodsId } });
        } catch (error) {
            console.log(error);
        }
        return rs;
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
            rs = this.app.mysql.count("cart", { where: { telId: tel } });
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    //更新勾选状态
    async updateState(tel, gid) {
        let rs;
        try {
            rs = this.app.mysql.update("cart", { state: 1 }, { where: { telId: tel, goodsId: gid } });
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    //删除
    async deleteByGidByTelID(gid, tel) {
        let rs;
        try {
            rs = this.app.mysql.delete("cart", { where: { telId: tel, goodsId: gid } });
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    //生成订单编号
    async createNo() {
        while (true) {
            // 1、生成订单编号，并验证编号是否存在
            let Id = () => {
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
            const oId = Id()
            const total = await this.app.mysql.count('cart', { cartId: oId });
            if (total == 0)
                return oId;
        }


    }

}

//3.导出类
module.exports = CartService;