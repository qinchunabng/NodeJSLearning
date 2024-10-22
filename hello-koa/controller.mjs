import Router from '@koa/router';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function scan(router, controllerPath) {
    //扫描controller目录
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    console.log(`scan dir ${dirname}...`);
    let files = readdirSync(path.join(dirname, controllerPath)).filter(f => f.endsWith('.mjs'));
    for (let file of files) {
        //导入模块
        console.log(`import controller/${file}...`);
        let { default: mapping } = await import(`./${controllerPath}/${file}`);
        //把每个映射添加到router
        for (let url in mapping) {
            if (url.startsWith('GET')) {
                let p = url.substring(url.indexOf('/'));
                router.get(p, mapping[url]);
                console.log(`mapping: GET ${p}`);
            } else if (url.startsWith('POST')) {
                let p = url.substring(url.indexOf('/'));
                router.post(p, mapping[url]);
                console.log(`mapping: POST ${p}`);
            } else {
                console.warn(`invalid mapping: ${url}`);
            }
        }
    }
}

export default async function (controllerPath = 'controller') {
    const router = new Router();
    await scan(router, controllerPath);
    return router.routes();
}