var response = {

    handle_200(result) {
        return {
            status: 200,
            body: {
                code: result.code ? result.code : 200,
                msg: result.msg ? result.msg : '一切正常',
                data: result.data ? result.data : {}
            }
        };
    },

    handle_500(err, result) {

        if(!err) return this.handle_200(result);

        console.error(err);
        return {
            status: 500,
            body: {
                code: result.code ? result.code : 500,
                msg: result.msg ? result.msg : '貌似出错了，怪我咯',
                data: result.data ? result.data : {}
            }
        };
    },

    handle_400(err, result) {

        if(!err) return this.handle_200(result);

        console.error(err);
        return {
            status: 400,
            body: {
                code: result.code ? result.code : 400,
                msg: result.msg ? result.msg : '你的请求有问题啦，怪你咯',
                data: result.data ? result.data : {}
            }
        };
    }

};

module.exports = response;
