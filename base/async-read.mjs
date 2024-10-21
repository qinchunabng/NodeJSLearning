import { readFile } from 'node:fs/promises';

async function readTextFile(path) {
    return await readFile(path, 'utf-8');
}

readTextFile('sample.txt').then(s => console.log(s));