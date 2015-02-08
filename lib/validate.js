'use strict';

var is = require('is_js');

var validator = {

    response: {
        code: null,
        msg: null,
        data: null
    },

    clean(){
        this.response = {
            code: null,
            msg: null,
            data: null
        }
    },

    check(param) {
        this.clean();
        this.response.data = param;
        return this;
    },

    notNull(msg, code) {
        if(is.not.null(this.response.msg)) return this;

        if(is.null(this.response.data)) {
            this.response.msg = msg ? msg : '参数为空';
            this.response.code = code ? code : 400;
        }

        return this;
    },

    array(msg, code) {
        if(is.not.null(this.response.msg)) return this;
        if(is.not.array(this.response.data)) {
            this.response.msg = msg ? msg : '参数为空';
            this.response.code = code ? code : 400;
        }

        return this;
    }

}

module.exports = validator;
