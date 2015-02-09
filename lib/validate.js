'use strict';

var is = require('is_js');

var validator = {

    response: {
        code: null,
        msg: null,
        data: null
    },
    option: false,

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

    null() {
        if(is.null(this.response.data)) this.option = true;

        return this;
    },

    notNull(msg, code) {
        if(this.option || is.not.null(this.response.msg)) return this;

        if(is.null(this.response.data)) {
            this.response.msg = msg ? msg : '参数为空';
            this.response.code = code ? code : 400;
        }

        return this;
    },

    string(msg, code) {
        if(this.option || is.not.null(this.response.msg)) return this;

        if(is.not.string(this.response.data)) {
            this.response.msg = msg ? msg : '参数为空';
            this.response.code = code ? code : 400;
        }

        return this;
    },

    array(msg, code) {
        if(this.option || is.not.null(this.response.msg)) return this;

        if(is.not.array(this.response.data)) {
            this.response.msg = msg ? msg : '参数为空';
            this.response.code = code ? code : 400;
        }

        return this;
    },

    object(msg, code) {
        if(this.option || is.not.null(this.response.msg)) return this;

        if(is.not.object(this.response.data)) {
            this.response.msg = msg ? msg : '参数为空';
            this.response.code = code ? code : 400;
        }

        return this;
    }

}

module.exports = validator;
