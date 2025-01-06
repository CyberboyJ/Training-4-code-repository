'use strict';

const { Service } = require('egg');

class OrderDetailService extends Service {
  // 根据订单编号查询订单明细并关联商品信息
  async selectOrderdetailsByOrderId(orderId) {
    const { app } = this;

    try {
      // 使用 SELECT 查询连接查询订单明细表和商品表

      const result = await app.mysql.select('orderdetails', {

        // where 子句指定查询条件
        where: { orderId },
        // 使用 JOIN 查询商品信息
        columns: ['odId', 'orderId', 'goodsId', 'quantity'], // 需要查询的列
        join: {
          goods: {
            on: 'orderdetails.goodsId = goods.goodsId', // 连接条件
            columns: ['goodsName', 'goodsPrice', 'goodsImg'], // 关联的商品表字段
          },
        },
      });


      return result; // 返回查询结果

    } catch (err) {
      throw new Error('Failed to fetch order details: ' + err.message);
    }
  }

}


module.exports = OrderDetailService;

