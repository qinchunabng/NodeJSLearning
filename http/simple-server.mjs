import http from 'node:http';

//创建http server，并传入回调函数
const server = http.createServer((req, res) => {
    //回调函数接收request和response
    //获取HTTP请求的method和url
    console.log(req.method + ': ' + req.url);
    //将响应200写入response，同时设置Content-Type: text/html
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //将http响应的HTML内容写入response
    res.end('<h1>Hello world!</h1>');
});

//出错时返回
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});


//让服务器监听8080端口
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');