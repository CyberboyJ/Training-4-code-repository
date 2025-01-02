'use strict';

const { Controller } = require('egg');

class OrderDetailController extends Controller {
  // 根据订单编号查询订单明细信息并关联商品信息
  async selectOrderdetailsByOrderId() {
    const { ctx, service } = this;
    const { orderId } = ctx.query;  // 从查询参数中获取订单编号

    if (!orderId) {
      ctx.throw(400, 'Order ID is required');  // 如果没有传递订单编号，返回错误
    }

    try {
      // 调用 service 层的方法获取订单明细
      const orderDetails = await service.orderDetail.selectOrderdetailsByOrderId(orderId);

      // 返回结果
      ctx.body = {
        code: 0,
        message: 'success',
        data: orderDetails,
      };
    } catch (err) {
      // 错误处理
      ctx.body = {
        code: 500,
        message: '查询失败',
        error: err.message,
      };
    }
  }
}

module.exports = OrderDetailController;
