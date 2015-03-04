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
    if(is.not.empty(this.request.query) && this.request.query.action != 'default') return yield next;

    //获取参数
    this.p_path = this.request.query.path;
    let check = null;

    //校验
    check = v.check(this.p_path).null().string('path必须是string啦');

    if(check && check.response.msg){     //校验未通过
        let ret = response.badRequest(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
    }

    //业务
    let ret = yield bookshelf.readPath(this.p_path);
    this.status = ret.status;
    this.body = ret.body;

}, function*(next) {        //判断路径是否存在
    if(is.empty(this.request.query) || this.request.query.action != 'exist') return yield next;

    //获取参数
    this.p_path = this.request.query.path;
    let check = null;

    //校验
    check = v.check(this.p_path).null().string('path必须是string啦');

    if(check && check.response.msg){     //校验未通过
        let ret = response.badRequest(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
    }

    //业务
    let ret = yield bookshelf.existPath(this.p_path);
    this.status = ret.status;
    this.body = ret.body;
});


/**
 * 删除路径
 */
router.delete('/', function*(next){     //default方法
    if(is.not.empty(this.request.query) && this.request.query.action != 'default') return yield next;

    //获取参数
    this.p_path = this.request.body.path;
    let check = null;

    //校验
    check = v.check(this.p_path).string('path必须是string啦');

    if(check && check.response.msg){     //校验未通过
        let ret = response.badRequest(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
    }

    //业务
    let ret = yield bookshelf.removePath(this.p_path);
    this.status = ret.status;
    this.body = ret.body;
});

/**
 * 修改路径
 */
router.put('/', function*(next){     //default方法
    if(is.not.empty(this.request.query) && this.request.query.action != 'default') return yield next;

    //获取参数
    this.p_path = this.request.body.path;
    this.p_newPath = this.request.body.newPath;
    let check = null;

    //校验
    check = v.check(this.p_path).string('path必须是string啦');
    check = v.check(this.p_newPath).string('newPath必须是string啦');

    if(check && check.response.msg){     //校验未通过
        let ret = response.badRequest(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
    }

    //业务
    let ret = yield bookshelf.movePath(this.p_path, this.p_newPath);
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
