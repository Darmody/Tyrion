var koa = require('koa'),
    mount = require('koa-mount'),
    router = require('koa-router'),
    logger = require('koa-logger'),
    koaBody = require('koa-body'),
    app;

app = koa();

/* istanbul ignore if  */
if(process.env.NODE_ENV !== 'test'){
  app.use(logger());
}

if(process.env.NODE_ENV === 'dev'){
  app.use(require('koa-cors')());
}

app.use(koaBody({
    multipart:true,
    formidable: {
        uploadDir: __dirname + '/tmp'
    }
}));

app.use(router(app));
app.use(mount('/aria2', require('./controllers/aria2.js').middleware()));
//module.exports = app;
exports.app = app;
