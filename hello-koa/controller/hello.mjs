async function hello(ctx, next) {
    //获取:name参数
    let s = ctx.params.name;
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1>Hello, ${s}</h1>`;
}

export default {
    'GET /hello/:name': hello
}