import { readFile, readFileSync, stat, writeFile } from 'node:fs';

console.log('BEGIN');

//读取文本文件
readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

//读取图片
readFile('dinosaur.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data instanceof Buffer);
        console.log(data.toString('base64'));
    }
});

//同步读取文件
try {
    let s = readFileSync('sample.txt', 'utf-8');
    console.log(s);
} catch (e) {
    console.log(e);
}

//写文件
let data = 'Hello, Node.js';
writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    }
});

//读取文件信息
stat('dinosaur.png', function (err, st) {
    if (err) {
        console.log(err);
    } else {
        //是否是文件
        console.log('isFile: ' + st.isFile());
        //是否是目录
        console.log('isDirectory: ' + st.isDirectory());
        if (st.isFile()) {
            //文件大小
            console.log('size: ' + st.size);
            //创建时间，Date对象
            console.log('birth time: ' + st.birthtime)
            //修改时间
            console.log('modified time: ' + st.mtime)
        }
    }
});

console.log('END');