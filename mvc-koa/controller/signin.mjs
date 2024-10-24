async function signin(ctx, next) {
    let email = ctx.request.body.email || '';
    let password = ctx.request.body.password || '';
    if (email === 'admin@example.com' && password === '123456') {
        console.log('sign in ok!');
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr Bob'
        });

    } else {
        console.log('signin failed!');
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed'
        });
    }
}

export default {
    'POST /signin': signin
}