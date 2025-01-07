module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1735020482008_4987';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 添加 view 配置项
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.security = {
    csrf: {
      enable: false,
      // whiteList:['localhost:7001', 'sub2.test.com']
    }
  }
  //配置数据库连接
  config.mysql = {
    app: true,
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '248828',
      database: 'mi'
    }
  }

  // 配置 CORS（跨域资源共享）
  config.cors = {
    origin: '*',  // 允许所有来源的请求
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],  // 允许的请求方法
  };


  return {
    ...config,
    ...userConfig,
  };
};
