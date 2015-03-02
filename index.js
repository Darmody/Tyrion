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

var aria2Ctrl = require('./controllers/aria2.js').middleware();
app.use(router(app));
app.use(mount('/aria2', aria2Ctrl));

//module.exports = app;
exports.app = app;
exports.controllers = [aria2Ctrl];
