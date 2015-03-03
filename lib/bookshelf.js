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

        var run = function* () {
          var result = yield Promise.resolve(true);
          console.log('fuck')
          return result;
        }

        // co(run).then(function (value) {
        //   console.log(value);
        // }, function (err) {
        //   console.error(err.stack);
        // });
        return co.wrap(run)();
    }
}

module.exports = BookshelfCls;
