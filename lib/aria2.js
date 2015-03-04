"use strict";

var Aria2 = require('aria2');
var res = require('./response');

const options = {
    host: '192.168.1.100',
    port: 6800
    //secret: '123456'
};

class AriaCls {

    constructor() {
        this.aria2 = new Aria2(options);
        this.open();
    }

    /**
    * 打开aria2 rpc连接
    */
    open(){
        let aria2 = this.aria2;

        return new Promise(function(resolve) {
            aria2.open(function(err) {
                resolve(res.error(err, {}));
            });
        });
    }

    /**
     * 添加下载任务
     * @param uris 下载链接列表
     * @param option 配置选项
     */
    addUri(uris, option){
        let aria2 = this.aria2;

        return new Promise(function(resolve){
            aria2.send('addUri', uris, option, function(err, response) {
                resolve(res.error(err, {data: response}));
            });
        });
    }

    /**
     * 获取任务状态
     * @param gid 任务id
     * @param keys 查询字段
     */
    tellStatus(gid, keys){
        let aria2 = this.aria2;

        return new Promise(function(resolve){
            aria2.send('tellStatus', gid,  keys, function(err, response) {
                resolve(res.error(err, {data: response}));
            });
        });
    }

    /**
     * 获取下载中的任务
     * @param keys 查询字段
     */
    tellActive(keys){
        let aria2 = this.aria2;
        keys = keys ? keys : [];

        return new Promise(function(resolve){
            aria2.send('tellActive', keys, function(err, response) {
                resolve(res.error(err, {data: response}));
            });
        });
    }

    /**
     * 获取等待的任务
     * @param skip 跳过的条目数
     * @param limit 查询限制的条目数
     * @param keys 查询字段
     */
    tellWaiting(skip, limit, keys){
        let aria2 = this.aria2;

        return new Promise(function(resolve){
            aria2.send('tellWaiting', skip, limit, keys, function(err, response) {
                response = {data: response};
                resolve(res.error(err, {data: response}));
            });
        });
    }

    /**
     * 获取停止的任务
     * @param skip 跳过的条目数
     * @param limit 查询限制的条目数
     * @param keys 查询字段
     */
    tellStopped(skip, limit, keys){
        let aria2 = this.aria2;

        return new Promise(function(resolve){
            aria2.send('tellStopped', skip, limit, keys, function(err, response) {
                response = {data: response};
                resolve(res.error(err, {data: response}));
            });
        });
    }
}

module.exports = AriaCls;
