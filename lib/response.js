'use strict';

var response = {

    handle(err, status, code, msg, data) {
        if(err) console.error(err);

        return {
            status: status,
            body: {
                code: code,
                msg: msg,
                data: data
            }
        };
    },

    normal(result) {
        return this.handle(null, 200, result.code || 200, result.msg || '一切正常', result.data || {});
    },

    error(err, result) {
        if(!err)    return this.normal(result);
        return this.handle(null, 500, result.code || 500, result.msg || '貌似出错了，怪我咯', result.data || {});
    },

    badRequest(err, result) {
        if(!err)    return this.normal(result);
        return this.handle(null, 400, result.code || 400, result.msg || '你的请求有问题啦，怪你咯', result.data || {});
    }
};

module.exports = response;
