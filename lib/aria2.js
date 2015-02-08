"use strict";

var Aria2 = require('aria2');

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
        let p = new Promise(function(resolve) {
            aria2.open(function(err) {
                if(err) throw new Error(err);
                resolve();
            });
        });

        return p.then();
    }

    /**
     * 添加下载任务
     * @param 下载链接列表
     * @param 文件存放位置
     */
    addUri(uris, dir){
        let aria2 = this.aria2;
        return new Promise(function(resolve){
            aria2.send('addUri', uris, {dir}, function(err, response) {
                response = {data: response};
                resolve({err, response});
            });
        });
    }

}

module.exports = AriaCls;
