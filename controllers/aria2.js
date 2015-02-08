'use strict';

var Router = require('koa-router');
var Aria = require('../lib/aria2');
var response = require('../lib/response');
var v = require('../lib/validate');
var router = new Router();
var aria2 = new Aria();

router.get('/', function*(next){

    this.body = 'fuck';
});


/**
 * 添加url
 */
router.post('/', function*(next){
    //validate
   let uris = this.request.body.uris;

   let check = v.check(uris).array('uris参数必须为数组啦');

   console.log(check.response)
   if(check.response.msg){
        let ret = response.handle_400(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
   }
   yield next;

}, function*(next){

    let ret = null;
    let uris = this.request.body.uris;
    let dir = this.request.body.dir;

    yield aria2.addUri(['http://example.com/test']).then(function(result) {

        ret = result;
    });

    ret = response.handle_500(ret.err, ret.response);
    this.status = ret.status;
    this.body = ret.body;
});

router.put('/', function*(next){
 this.body = 'you tried to put';
});

router.delete('/', function*(next){
 this.body = 'you tried to delete';
});

module.exports = router;
