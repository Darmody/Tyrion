'use strict';

var Router = require('koa-router');
var koaSend = require('koa-send');
var Path = require('path');
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

    if(ret.body && ret.body.data.isFile) {
        yield koaSend(this, ret.body.data.path, {hidden: true});
        let filename = Path.basename(ret.body.data.path);
        this.set('Content-Disposition', 'filename=' + filename);
    } else {
        this.status = ret.status;
        this.body = ret.body;
    }

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

/**
 * 导入文件
 */
router.post('/', function*(next){     //default方法
    if(is.not.empty(this.request.query) && this.request.query.action != 'default') return yield next;

    //获取参数
    let files = this.request.body.files;
    let fields = this.request.body.fields;
    this.p_file = files ? files.file : null;
    this.p_path = fields ? fields.path : null;
    let check = null;

    //校验
    check = v.check(this.p_path).string('path必须是string啦');
    check = v.check(this.p_file).notNull('你没有传文件的好吧');

    if(check && check.response.msg){     //校验未通过
        let ret = response.badRequest(check.response.msg, check.response);
        this.body = ret.body;
        return this.status = ret.status;
    }

    //业务
    let ret = yield bookshelf.importPath(this.p_path, this.p_file.path);
    this.status = ret.status;
    this.body = ret.body;
});

module.exports = router;
