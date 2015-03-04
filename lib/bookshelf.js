"use strict";

var fs = require('fs');
var co = require('co');
var res = require('./response');

const ROOT = process.env.NODE_ENV === 'prod' ? '/' : '/';

class BookshelfCls {

    constructor() {}

    /**
     * 文件夹后缀处理
     * @param path 文件路径
    */
    pathHandle(path) {
        return path += path.charAt(path.length - 1) !== '/' ? '/' : '';
    }

    /**
     * 判断路径是否存在
     * @param path 文件路径
     */
    existPath(path) {
        let run = function*() {
            let abpath = ROOT + path;
            let exist = fs.existsSync(abpath);

            return res.normal({data: {exist}});
        };

        return co.wrap(run)();
    }

    /**
     * 删除路径文件
     */
    removePath(path) {
        let run = function*() {
            let abpath = ROOT + path;

            if(!fs.existsSync(abpath)) {
                let err = path + '，这个路径不存在好伐';
                return res.badRequest(err, {msg: err});
            }
            if(fs.statSync(abpath).isDirectory()) {
                fs.rmdirSync(abpath);
            }else {
                fs.unlinkSync(abpath);
            }

            return res.normal({msg: '帮你删掉了'});
        };

        return co.wrap(run)();
    }

    /**
     * 读取路径内容，如果为文件，返回文件数据，如果为文件夹，返回文件列表
     * @param path  文件路径
    */
    readPath(path) {
        var self = this;
        let run = function* () {
            path = self.pathHandle(path);

            let abpath = ROOT + path;

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

    /**
     * 移动路径对象，重命名或移动
     * @param path 文件路径
     * @param newPath 新的路径
    */
    movePath(path, newPath) {
        var run = function*() {

            let abpath = ROOT + path;
            let abNewPath = ROOT + newPath;

            if(!fs.existsSync(abpath))  {
                let err = path + '，这个路径不存在好伐';
                return res.badRequest(err, {msg: err});
            }

            console.log(abNewPath);
            fs.renameSync(abpath, abNewPath);

            return res.normal({msg: '帮你改好了'});
        };

        return co.wrap(run)();
    }
}

module.exports = BookshelfCls;
