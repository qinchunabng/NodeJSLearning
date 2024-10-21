import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';

//设定www根目录为当前目录
const wwwRoot = path.resolve('.');
console.log(`set www root:${wwwRoot}`);

//根据扩展名确定MIME类型
function guessMime(pathname) {
    return 'text/html';
}

//创建http file server，并传入回调函数
const server = http.createServer(async (req, res) => {
    //获取HTTP请求的method和url
    console.log(req.method + ': ' + req.url);
    if (req.method !== 'GET') {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h1>400 Bad Request</h1>')
    } else {
        //解析path
        let url = new URL(`http://localhost${req.url}`);
        let pathname = url.pathname;
        let filepath = path.join(wwwRoot, pathname);
        //检查文件状态

        await writeFile(filepath, pathname, res);
    }
});

async function writeFile(filepath, pathname, res) {
    try {
        let st = await stat(filepath);
        if (st.isFile()) {
            console.log('200 OK');
            //发送200响应
            res.writeHead(200, { 'Content-Type': guessMime(pathname) });
            //将文件流导向response
            createReadStream(filepath).pipe(res);
        } else {
            //查找index.html和default.html
            let pathname = path.join(filepath, 'index.html');
            if (!existsSync(pathname)) {
                pathname = path.join(filepath, 'default.html');
                if (!existsSync(pathname)) {
                    throw new Error(filepath + 'does not exist.');
                }
            }
            console.log('200 OK');
            //发送200响应
            res.writeHead(200, { 'Content-Type': guessMime(pathname) });
            //将文件流导向response
            createReadStream(pathname).pipe(res);
        }
    } catch (e) {
        console.log(e);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
}

//出错时返回
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

// 让服务器监听8080端口:
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');