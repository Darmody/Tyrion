"use strict";

var fs = require('fs');
var co = require('co');
var res = require('./response');

const ROOT = '/';

class BookshelfCls {

    constructor() {}

    /**
     * 读取路径内容，如果为文件，返回文件数据，如果为文件夹，返回文件列表
     * @param path  文件路径
    */
    readPath(path) {
        var run = function* () {

            path += path.charAt(path.length - 1) !== '/' ? '/' : '';        //文件夹后缀处理

            let abpath = ROOT + path;
            let exist;

            if(!fs.existsSync(abpath))  {
                let err = path + '，这个路径不存在好伐';
                return res.badRequest(err, {msg: err});
            }

            if(fs.statSync(abpath).isDirectory()) {
                let files = fs.readdirSync(abpath);

                files.forEach(function(file, i, arr) {
                    arr[i] += fs.statSync(abpath + file).isDirectory() ? '/' : '';
                });

                return res.normal({data: files});
            }
        };

        return co.wrap(run)();
    }
}

module.exports = BookshelfCls;
