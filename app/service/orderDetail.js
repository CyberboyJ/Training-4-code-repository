'use strict';

const { Service } = require('egg');

class OrderDetailService extends Service {
  // 根据订单编号查询订单明细并关联商品信息

  async selectOrderdetailsByOrderId(orderId) {
    const { app } = this;

    try {
      // 查询订单明细
      const orderDetails = await this.app.mysql.select('orderdetails', { where: { orderId: orderId } });

      const result = [];

      // 遍历订单明细，获取每个商品信息
      for (const detail of orderDetails) {
        // 查询商品信息
        const goods = await this.app.mysql.get('goods', { goodsId: detail.goodsId });

        const od = {
          odId: detail.odId,
          goodsName: goods ? goods.goodsName : '未知商品', // 如果没有找到商品名称，则使用默认值
          quantity: detail.quantity
        };

        result.push(od);
      }

      console.log("查询到详细订单信息为：");
      console.log(result);

      // 返回最终的数组
      return result;
    } catch (err) {
      console.error("Error in selectOrderdetailsByOrderId:", err);
      return null; // 查询失败时返回 null
    }
  }
}


module.exports = OrderDetailService;

