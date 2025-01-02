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
  router.post("/selectGoodsByGoodsTypeId", controller.goods.getGoodsByGroupId);
  router.post("/selectGoodsById", controller.goods.getByGoodId);
  //goodtypes
  router.post('/selectGoodsTypeAll', controller.goodsType.listAllType);
  router.get('/selectGoodsTypeAllByPC', controller.goodsType.selectGoodsTypeAllByPC);

  //customer
  router.get("/cust/register", controller.customer.registerPage)
  router.post("/cust/register", controller.customer.register)
  router.get('/cust/login', controller.customer.loginPage);
  router.post('/selectCustByTelAndPwd', controller.customer.login);


  //adress
  router.get('/address', controller.address.getAddress);

  //cart
  router.post('/insertCart', controller.cart.insertCart);
  router.post('/selectCartByTelId', controller.cart.selectCartByTelId);
  router.post('/selectCartCountByTelId', controller.cart.selectCartCountByTelId);
  router.post('/updateQuantityCart', controller.cart.updateQuantityCart);
  router.post('/updateCartState', controller.cart.updateCartState);
  router.post('/deleteCartByTeIdByGoodsId', controller.cart.deleteCartByTelIdByGoodsId);
  router.post('/searchCartByTelIdByGoodsId', controller.cart.searchCartByTelIdByGoodsId);
  //order
  router.post('/createOrder', controller.order.creartOrder);
  router.get('/orders/:gid', controller.order.QueryOrderById);
  //orderDetail
  router.get('/order-details', controller.orderDetail.selectOrderdetailsByOrderId);


};
