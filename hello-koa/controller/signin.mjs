async function index(ctx, next) {
    ctx.response.type = 'text/html';
    ctx.response.body = `
        <h1>Index Page</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><button type="submit">Submit</button></p>
        </form>
    `;
}

async function signin(ctx, next) {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    console.log(`try signin: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.type = 'text/html';
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`
    } else {
        ctx.response.type = 'text/html';
        ctx.response.body = '<h1>Signin failed!</h1><p><a href="/">Retry</a></p>'
    }
}

//导出函数
export default {
    'GET /': index,
    "POST /signin": signin
}