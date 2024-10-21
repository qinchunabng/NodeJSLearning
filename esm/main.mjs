import { greet, hi } from './hello.mjs';

let name = 'Bob';
greet(name);
hi(name);

//nodejs内置对象
console.log(global.console);

console.log("process", process === global.process);
console.log(process.version);
console.log(process.platform);
console.log(process.arch);
console.log(process.cwd());
//修改目录
// process.chdir('~');
// console.log(process.cwd());

//process.nextTick()将在下一轮事件循环中调用
process.nextTick(function () {
    console.log('nextTick callback');
});

console.log('nextTick was set!');


//程序将在退出时的回调函数
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});

//判断javascript环境
if (typeof (window) === 'undefined') {
    console.log('node.js');
} else {
    console.log('browser');
}
