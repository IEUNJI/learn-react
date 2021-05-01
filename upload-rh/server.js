const fs = require('fs');
const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');

const app = new Koa();

// 跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, POST');

  if (ctx.method === 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

// 文件存储
app.use(koaBody({
  formidable: {
    uploadDir: path.resolve(__dirname, 'uploads')
  },
  multipart: true
}));

// 静态资源服务
app.use(koaStatic(path.resolve(__dirname, 'uploads')));

// upload 接口
app.use(async (ctx, next) => {
  if (ctx.url === '/upload') {
    const file = ctx.request.files.file;
    const filename = path.basename(file.path) + path.extname(file.name);
    fs.renameSync(file.path, path.join(path.dirname(file.path), filename));
    ctx.body = {
      url: 'http://localhost:8080/' + filename
    };
  } else {
    await next();
  }
});

app.listen(8080, () => {
  console.log('8080 port');
});
