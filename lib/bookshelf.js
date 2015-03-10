"use strict";

var fs = require('fs');
var co = require('co');
var resolve = require('resolve-path');
var res = require('./response');

const ROOT = process.env.NODE_ENV === 'prod' ? '/' : '/Users/caihuanyu/Downloads/';

class BookshelfCls {

    constructor() {}

    /**
     * resolve path
     * @param root 根目录
     * @param path 文件路径
    */
    resolvePath(root, path) {

        try {
            return resolve(root, path);
        } catch(error) {
            return null;
        }
    }

    /**
     * 判断路径是否存在
     * @param path 文件路径
     */
    existPath(path) {
        var self = this;
        let run = function() {
            let abpath = self.resolvePath(ROOT, path);
            if(!abpath) {
                let err = '我擦，' + path + '这个地方你可是没有权限进去的。';
                return res.forbidden(err, {msg: err});
            }
            let exist = fs.existsSync(abpath);

            return res.normal({data: {exist}});
        };

        return co.wrap(run)();
    }

    /**
     * 删除路径文件
     * @param path 文件路径
     */
    removePath(path) {
        var self = this;
        let run = function() {
            let abpath = self.resolvePath(ROOT, path);
            if(!abpath) {
                let err = '我擦，' + path + '这个地方你可是没有权限进去的。';
                return res.forbidden(err, {msg: err});
            }

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
     * 导入文件
     * @param path 文件路径
     * @param filePath 需导入的文件路径
     */
    importPath(path, filePath) {
        var self = this;
        var run = function() {

            let abpath = filePath;
            let abNewPath = self.resolvePath(ROOT, path);
            if(!abNewPath) {
                let err = '我擦，' + path + '这个地方你可是没有权限进去的。';
                return res.forbidden(err, {msg: err});
            }

            if(!fs.existsSync(abpath))  {
                let err = filePath + '，这个路径不存在好伐';
                return res.badRequest(err, {msg: err});
            }

            fs.renameSync(abpath, abNewPath);

            return res.normal({msg: '帮你导入了'});
        };

        return co.wrap(run)();
    }

    /**
     * 读取路径内容，如果为文件，返回文件，如果为文件夹，返回文件列表
     * @param path  文件路径
     */
    readPath(path) {
        var self = this;
        let run = function() {

            let abpath = self.resolvePath(ROOT, path);
            if(!abpath) {
                let err = '我擦，' + path + '这个地方你可是没有权限进去的。';
                return res.forbidden(err, {msg: err});
            }


            if(!fs.existsSync(abpath))  {
                let err = path + '，这个路径不存在好伐';
                return res.badRequest(err, {msg: err});
            }

            if(fs.statSync(abpath).isDirectory()) {     //路径为文件夹
                let files = fs.readdirSync(abpath);

                files.forEach(function(file, i, arr) {
                    let filepath = self.resolvePath(abpath, file);
                    arr[i] += fs.statSync(filepath).isDirectory() ? '/' : '';
                });

                return res.normal({data: files});
            } else {        //路径为文件
                return res.normal({data: {isFile: true, path: abpath}});
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
        var self = this;
        var run = function() {

            let abpath = self.resolve(ROOT, path);
            if(!abpath) {
                let err = '我擦，' + path + '这个地方你可是没有权限进去的。';
                return res.forbidden(err, {msg: err});
            }
            let abNewPath = self.resolve(ROOT, newPath);
            if(!abNewPath) {
                let err = '我擦，' + newPath + '这个地方你可是没有权限进去的。';
                return res.forbidden(err, {msg: err});
            }

            if(!fs.existsSync(abpath))  {
                let err = path + '，这个路径不存在好伐';
                return res.badRequest(err, {msg: err});
            }

            fs.renameSync(abpath, abNewPath);

            return res.normal({msg: '帮你改好了'});
        };

        return co.wrap(run)();
    }
}

module.exports = BookshelfCls;
