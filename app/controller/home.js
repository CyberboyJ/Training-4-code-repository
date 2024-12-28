const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async home() {
  	const { ctx } = this;
  	  	const dataList = {
  	        list: [
  	          { id: 1, title: 'This is news 1', url: '/news/1' },
  	          { id: 2, title: 'This is news 2', url: '/news/2' }
  	        ]
  	      };
  	      ctx.body = 'Hello world Egg home';
    }
}

module.exports = HomeController;
