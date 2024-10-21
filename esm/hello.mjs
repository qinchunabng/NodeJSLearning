//ESM模块默认启用strict模式，无需声明'use strict'。
let s = 'Hello';

export function out(prompt, name) {
    console.log(`${prompt},${name}!`);
}

export function greet(name) {
    out(s, name);
}

export function hi(name) {
    out('Hi', name);
}

