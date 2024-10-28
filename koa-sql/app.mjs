import { bodyParser } from '@koa/bodyparser';
import Koa from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';

import controler from './controller.mjs';
import templateEngine from './view.mjs';

const isProduction = process.env.NODE_ENV === 'production';
console.log(`start app in ${isProduction ? 'production' : 'development'} mode.`);

const app = new Koa();

app.context.render = function (view, model) {
    this.response.type = 'text/html; charset=utf-8';
    this.response.body = templateEngine.render(view, Object.assign({}, this.state || {}, model || {}));
}

async function initDb() {
    const email = 'admin@example.com';
    const name = 'Bob';
    const password = '123456';
    const db = createDatabase('test.db');
    await db.update`CREATE TABLE IF NOT EXISTS users(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL, password TEXT NOT NULL)`;
    let user = await db.fetch`SELECT * FROM users WHERE email=${email}`;
    if (user === null) {
        await db.insert`INSERT INTO users(email, name, password) VALUES(${email},${name},${password})`;
    }
    return db;
}

//绑定db到app.context
app.context.db = await initDb();

//log and benchmark
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    const start = Date.now();
    await next();
    const execTime = Date.now() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//处理静态文件
if (!isProduction) {
    app.use(mount('/static', serve('static')));
}

//解析request.body
app.use(bodyParser());

//使用controller()，注意controller模块导出的是async函数，要通过await调用
app.use(await controler());

app.listen(3000);
console.log('app started at port 3000');