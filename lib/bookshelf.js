"use strict";

var fs = require('fs');
var co = require('co');

const ROOT = '/';

class BookshelfCls {

    constructor() {}

    /**
     * 读取路径内容，如果为文件，返回文件数据，如果为文件夹，返回文件列表
     * @param path  文件路径
    */
    readPath(path, cb) {
        let abpath = ROOT + path;
        let exist;

        co(function*(){
            exist = yield fs.exists(abpath);
            console.log('exist', exist);
            return yield Promise.resolve(true);
        }).then();

        return exist;
    }
}

module.exports = BookshelfCls;
