'use strict';

var Router = require('koa-router');
var is = require('is_js');
var Bookshelf = require('../lib/bookshelf');
var response = require('../lib/response');
var v = require('../lib/validate');
var router = new Router();
var bookshelf = new Bookshelf();

/**
 * 读取路径
 */
router.get('/', function*(next){      //default方法
    if(is.not.empty(this.request.query) && is.not.existy(this.request.query.default)) return yield next;

    //获取参数
    this.p_path = this.request.query.path;
    let check = null;

    //校验
    check = v.check(this.p_path).null().string('path必须是string啦');

    if(check && check.response.msg){     //校验未通过
        let ret = response.handle_400(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
    }

    //业务
    let ret = yield bookshelf.readPath(this.p_path);
    console.log('ret', ret);

    this.status = ret.status;
    this.body = ret.body;

},function*(next){      //inWait方法, 等待中的任务
    if(is.empty(this.request.query) || is.not.existy(this.request.query.inWait)) return yield next;

    //获取参数
    this.p_keys = this.request.query.keys ? this.request.query.keys : null;
    this.p_skip = this.request.query.skip ? this.request.query.skip : null;
    this.p_limit = this.request.query.limit ? this.request.query.limit : null;
    let check = null;

    //校验
    check = v.check(this.p_keys).null().object('keys必须是json啦');
    check = v.check(this.p_skip).number('skip必须是数字啦');
    check = v.check(this.p_limit).number('limit必须是数字啦');

    if(check && check.response.msg){     //校验未通过
        let ret = response.handle_400(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
    }

    //业务
    let ret = yield aria2.tellActive(this.p_skip, this.p_limit, this.p_keys).then();
    ret = response.handle_500(ret.err, ret.response);

    this.status = ret.status;
    this.body = ret.body;

},function*(next){      //inStop方法，已停止的任务
    if(is.empty(this.request.query) || is.not.existy(this.request.query.inStop)) return yield next;

    //获取参数
    this.p_keys = this.request.query.keys ? this.request.query.keys : null;
    this.p_skip = this.request.query.skip ? this.request.query.skip : null;
    this.p_limit = this.request.query.limit ? this.request.query.limit : null;
    let check = null;

    //校验
    check = v.check(this.p_keys).null().object('keys必须是json啦');
    check = v.check(this.p_skip).number('skip必须是数字啦');
    check = v.check(this.p_limit).number('limit必须是数字啦');

    if(check && check.response.msg){     //校验未通过
        let ret = response.handle_400(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
    }

    //业务
    let ret = yield aria2.tellActive(this.p_skip, this.p_limit, this.p_keys).then();
    ret = response.handle_500(ret.err, ret.response);

    this.status = ret.status;
    this.body = ret.body;

});


/**
 * 添加aria2任务
 */
router.post('/', function*(next){     //default方法

    //获取参数
    this.p_uris = this.request.body.uris ? this.request.body.uris : null;
    this.p_option = this.request.body.option ? this.request.body.option : null;
    let check = null;

    //校验
    check = v.check(this.p_uris).array('uris参数必须为数组啦');
    check = v.check(this.p_option).null().object('option必须是json啦');

    if(check && check.response.msg){     //校验未通过
        let ret = response.handle_400(check.response.msg, check.response);
        this.body = ret.body;
        this.type = 'json';
        return this.status = ret.status;
    }

    if(is.not.empty(this.request.query) && is.not.existy(this.request.query.default)) return yield next;

    let ret = yield aria2.addUri(this.p_uris, this.p_option).then();
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
