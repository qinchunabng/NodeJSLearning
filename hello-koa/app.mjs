//导入Koa，注意导入的是大写开头的class:
import Koa from 'koa';

//创建一个koa实例表示webapp本身：
const app = new Koa();

//middleware顺序为其调用的顺序
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);//打印URL
    await next();//调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = Date.now();
    //调用下一个middleware
    await next();
    //消耗时间
    const ms = Date.now() - start;
    console.log(`Time: ${ms}ms`);
});


//对于任何请求，app将调用该异步函数处理：
app.use(async (ctx, next) => {
    await next();
    //设置响应类型和文本:
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello koa!</h1>';
});

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');

