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
  router.get("/selectGoodsByGoodsTypeId", controller.goods.getGoodsByGroupId);
  router.get("/selectGoodsById", controller.goods.getByGoodId);

  //goodtypes
  router.get('/selectGoodsTypeAll', controller.goodsType.listAllType);
  router.get('/selectGoodsTypeAllByPC', controller.goodsType.selectGoodsTypeAllByPC);

  //customer
  router.get("/cust/register", controller.customer.registerPage)
  router.post("/cust/register", controller.customer.register)
  router.get('/cust/login', controller.customer.loginPage);
  router.post('/selectCustByTelAndPwd', controller.customer.login);


  //adress
  router.get('/address', controller.address.getAddress);

  //cart
  router.post('/insertCart', controller.cart.insertCart); //check
  router.get('/selectCartByTelId/:telId', controller.cart.selectCartByTelId);
  router.get('/selectCartCountByTelId', controller.cart.selectCartCountByTelId); //你们到底用哪一个
  router.put('/updateQuantityCart', controller.cart.updateQuantityCart); // check
  router.put('/updateCartState', controller.cart.updateCartState); //checked
  router.delete('/deleteCartByTeIdByGoodsId', controller.cart.deleteCartByTelIdByGoodsId);
  router.get('/searchCartByTelIdByGoodsId', controller.cart.searchCartByTelIdByGoodsId); //checked
  //order
  router.post('/createOrder', controller.order.creartOrder);
  router.get('/orders/:gid', controller.order.QueryOrderById);
  //orderDetail
  router.get('/order-details', controller.orderDetail.selectOrderdetailsByOrderId);


};
