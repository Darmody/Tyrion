var mount = require('koa-mount');

/* istanbul ignore if  */
if(process.env.NODE_ENV !== 'test'){
  require('./lib/logger.js');
}

(function(){
  var app = require('./').app;
  //app.use(mount('/Koanect', require('../Koanect')));

  module.exports = app.listen(4000, '0.0.0.0');
})();
