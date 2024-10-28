import { User } from "../orm.mjs";

async function signin(ctx, next) {
    let email = ctx.request.body.email || '';
    let password = ctx.request.body.password || '';
    let user = await User.findOne({
        where: {
            email: email
        }
    })
    if (user !== null && user.password === password) {
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