/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get("/home", controller.home.home);
  router.post("/cust/register", controller.customer.register);


  //goods
  router.get("/goods/list", controller.goods.list);
  router.get("/goods/getGroup", controller.goods.getGoodsByGroupId);
  router.get("/goods/selectGoodsById/:gid", controller.goods.getByGoodId);
  //goodtypes
  router.get('/selectGoodsTypeAll', controller.goodsType.listAllType);
  router.get('/selectGoodsTypeAllByPC', controller.goodsType.selectGoodsTypeAllByPC);

  //customer
  router.get("/cust/register", controller.customer.registerPage)
  router.post("/cust/register", controller.customer.register)
  router.get('/cust/login', controller.customer.loginPage);
  router.post('/cust/login', controller.customer.login);


  //adress
  router.get('/address', controller.address.getAddress);

  //cart
  router.post('/cart/new',controller.cart.insertCart);
  router.get('/cart/query/:tel',controller.cart.selectCartByTelId);
  router.get('/cart/count/:tel',controller.cart.selectCartCountByTelId);
  router.put('/cart/updateCart',controller.cart.updateQuantityCart);
  router.put('/cart/check',controller.cart.updateCartState);
  router.delete('/cart/delete',controller.cart.deleteCartByTelIdByGoodsId);
  router.get('/cart/query',controller.cart.selectCartByTelldByGoodsld);


  //order
  router.post('/createOrder', controller.order.creartOrder);
  router.get('/orders/:gid', controller.order.QueryOrderById);

  //orderDetail
  router.get('/order-details', controller.orderDetail.selectOrderdetailsByOrderId);
};
