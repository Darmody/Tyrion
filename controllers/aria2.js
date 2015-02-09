'use strict';

var Router = require('koa-router');
var Aria = require('../lib/aria2');
var response = require('../lib/response');
var v = require('../lib/validate');
var router = new Router();
var aria2 = new Aria();

router.get('/', function*(next){

    let gid = this.request.query.gid ? this.request.query.gid : null;
    yield aria2.tellStatus(gid, []).then(function(result){
        console.log(result);
    });
});


/**
 * 添加url
 */
router.post('/', function*(next){
    //validate
   let uris = this.request.body.uris ? this.request.body.uris : null;
   let option = this.request.body.option ? this.request.body.option : null;

   let check = v.check(uris).array('uris参数必须为数组啦');
   check = v.check(option).null().object('dir必须是json啦');

   if(check.response.msg){
        let ret = response.handle_400(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
   }
   yield next;

}, function*(next){

    let ret = null;
    let uris = this.request.body.uris ? this.request.body.uris : null;
    let option = this.request.body.option ? this.request.body.option : null;

    yield aria2.addUri(uris, option).then(function(result) {

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
