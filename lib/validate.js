'use strict';

var is = require('is_js');

var validator = {

    response: {
       // code: null,
       // msg: null,
       // data: null
    },
    option: false,

    clean(){
        this.response.code = null;
        this.response.data = null;
        this.option =  false;
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
        console.log(this.response.data)
        let message = this.response.msg ? this.response.msg : null;
        if(this.option || is.not.null(message)) return this;

        if(is.not.existy(this.response.data)) {
            this.response.msg = msg || '参数为空';
            this.response.code = code || 400;
        }

        return this;
    },

    string(msg, code) {
        let message = this.response.msg ? this.response.msg : null;
        if(this.option || is.not.null(message)) return this;

        if(is.not.string(this.response.data)) {
            this.response.msg = msg || '参数为空';
            this.response.code = code || 400;
        }

        return this;
    },

    array(msg, code) {
        let message = this.response.msg ? this.response.msg : null;
        if(this.option || is.not.null(message)) return this;

        if(is.not.array(this.response.data)) {
            this.response.msg = msg || '参数为空';
            this.response.code = code || 400;
        }

        return this;
    },

    object(msg, code) {
        let message = this.response.msg ? this.response.msg : null;
        if(this.option || is.not.null(message)) return this;

        if(is.not.object(this.response.data)) {
            this.response.msg = msg || '参数为空';
            this.response.code = code || 400;
        }

        return this;
    },

    number(msg, code) {
        let message = this.response.msg ? this.response.msg : null;
        if(this.option || is.not.null(message)) return this;

        if(is.not.number(this.response.data) || is.nan(this.response.data)) {
            this.response.msg = msg || '参数为空';
            this.response.code = code || 400;
        }

        return this;
    }
};

module.exports = validator;
