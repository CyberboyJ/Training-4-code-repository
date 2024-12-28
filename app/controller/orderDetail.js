'use strict';

const { Controller } = require('egg');

class OrderDetailController extends Controller {

  async selectOrderdetailsByOrderId() {
    console.log(this.ctx.params.orderId);
    const rule = {  //参数检验
      orderId: { type: 'string', required: true, message: "请输入正确的订单编号" }
    };
    const validateErrors = parameter.validate(rule, this.ctx.params.orderId);
    console.log(validateErrors)

    if (validateErrors) {
      this.ctx.body = validateErrors
    } else {
      let rs = await this.ctx.service.order.selectOrderdetailsByOrderId(this.ctx.params.orderId);
      this.ctx.body = rs;
    }
  }
}

module.exports = OrderDetailController;
