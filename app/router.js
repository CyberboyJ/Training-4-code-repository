/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get("/home",controller.home.home);
  router.post("/cust/register",controller.customer.register);


  //goods
  router.get("/goods/list",controller.goods.list);
	router.get("/goods/getGroup",controller.goods.getGoodsByGroupId);
  router.get("/goods/selectGoodsById/:gid",controller.goods.getByGoodId);
  //goodtypes
  router.get('/selectGoodsTypeAll',controller.goodsType.listAllType);
  router.get('/selectGoodsTypeAllByPC',controller.goodsType.selectGoodsTypeAllByPC);
   
  //customer
  router.get('/customer/login',controller.customer.login);

  //adress
  router.get('/address',controller.address.getAddress);
};
