import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";


//打开流
let rs = createReadStream('sample.txt', 'utf-8');

//读取数据
rs.on('data', (chunk) => {
    console.log('---- chunk ----');
    console.log(chunk);
})

//读取结束
rs.on('end', () => {
    console.log('---- end ----');
});

//出错
rs.on('error', () => {
    console.log(err);
});

//写入文件
// let ws = createWriteStream('output.txt', 'utf-8');
// ws.write('使用stream写入文本数据...\n');
// ws.write('继续写入...\n');
// ws.write('DONE.\n');
// ws.end();


//pipeline
async function copy(src, dest) {
    let rs = createReadStream(src, 'utf-8');
    let ws = createWriteStream(dest, 'utf-8');
    await pipeline(rs, ws);
}

copy('sample.txt', 'output.txt')
    .then(() => console.log('copied'))
    .catch(e => console.log(e));


