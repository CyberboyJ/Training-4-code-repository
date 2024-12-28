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
      password: '7252',
      database: 'im'
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
