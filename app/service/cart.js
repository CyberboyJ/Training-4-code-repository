//1.导入Service对象
'use strict';
const Service = require('egg').Service;

//2.自定义类 继承 Service
//CustomerService 此类处理 Customer对应的业务逻辑 和访问数据库的增删改查
class CartService extends Service {
    //4.写自定义函数
    //根据电话和商品编号查询商品是否存在
    async findExistByTelIdByGoodsId(telId, goodId) {
        console.log("findExistByTelIdByGoodsId 参数:" + "电话：" + telId + " gid：" + goodId);
        let rs;
        try {
            rs = await this.app.mysql.count("cart", { telId: telId, goodsId: goodId });
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    // 根据电话和商品编号查询商品信息
    async selectCartByTelIdByGoodsId(telId, goodId) {
        console.log("searchCartByTelIdByGoodsld 参数:" + "电话：" + telId + " gid：" + goodId);
        let rs;
        try {
            // 使用 find 方法查询商品信息，而不是 count 方法
            rs = this.app.mysql.select("cart", {
                where: { telId: telId, goodsId: goodId }, limit: 1 // 如果你只想获取一个商品对象
            });

            if (rs.length === 0) {
                return null;
            }
            rs = rs[0]; // 如果有结果，取第一个对象
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    //插入新商品记录
    async newCartMessage(cart) {
        let rs;
        try {
            let cartNo = this.createNo();
            const quantity = parseInt(cart.quantity, 10);
            console.log("加入购物车的商品信息：");
            console.log("电话" + cart.telId);
            rs = await this.app.mysql.insert("cart", {
                cartId: cart.cartNo,
                goodsId: cart.goodsId,
                telId: cart.telId,
                quantity: quantity,
                state: 0
            })
        } catch (error) {
            console.log(error);
        }
        return rs;

    }

    //更新商品数量
    async updateQuantityCartByTelIdBygid(params) {
        let rs;
        try {
            rs = await this.app.mysql.query(
                'UPDATE cart SET quantity = quantity + 1 WHERE telId = ? AND goodsId = ?',
                [params.telId, params.goodsId]
            )
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    //关联查询，商品信息
    async QueryByTelId(telId) {
        let rs;
        try {
            rs = await this.app.mysql.select("cart", { where: { telId: telId } });
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    async QueryCountByTelId(telId) {
        let rs;
        try {
            rs = await this.app.mysql.count("cart", { where: { telId: telId } });
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    //更新勾选状态
    async updateState(params) {
        let rs;
        try {
            // 执行 SQL 查询，取反 `state` 字段
            rs = await this.app.mysql.query(
                'UPDATE cart SET state = NOT state WHERE telId = ? AND goodsId = ?',
                [params.telId, params.goodsId]
            );
        } catch (error) {
            console.log(error);
        }
        return rs;
    }

    //删除
    async deleteByGidByTelID(goodId, telId) {
        let rs;
        try {
            rs = await this.app.mysql.delete("cart", { where: { telId: telId, goodsId: goodId } });
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