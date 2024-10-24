async function index(ctx, next) {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}

export default {
    'GET /': index
}