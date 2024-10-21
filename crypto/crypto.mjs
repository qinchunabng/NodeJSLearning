import crypto from 'node:crypto';
import fs from 'node:fs';

//如果要计算SHA1，只需要把'md5'改成'sha1'，就可以得到SHA1的结果。
//还可以使用更安全的sha256和sha512。
const hash = crypto.createHash('md5');

hash.update('Hello,world!');
hash.update('Hello,nodejs!');

console.log('md5', hash.digest('hex'));

//hmac
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
console.log('hmac', hmac.digest('hex'));

//aes
//加密
function aes_encrypt(key, iv, msg) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(msg, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

//解密
function aes_decrypt(key, iv, encrypted) {
    const cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = cipher.update(encrypted, 'hex', 'utf8');
    decrypted += cipher.final('utf8');
    return decrypted;
}

//key的长度必须为32bytes
let key = 'Passw0rdPassw0rdPassw0rdPassw0rd';
//iv的长度必须为16bytes
let iv = 'a1b2c3d4e5f6g7h8';
let msg = 'Hello, world!';
//加密
let encrypted_msg = aes_encrypt(key, iv, msg);
//解密
let decrypted_msg = aes_decrypt(key, iv, encrypted_msg);

console.log(`AES encrypt: ${encrypted_msg}`);
console.log(`AES decrypt: ${decrypted_msg}`);


//----------RSA-------------
//1.生成RSA公私钥，执行以下命令：
//openssl genrsa -aes256 -out rsa-key.pem 2048
//根据提示输入密码，这个密码是用来加密RSA密钥的，加密方式指定为AES256，
//生成的RSA的密钥长度是2048位。执行成功后，我们获得了加密的rsa-key.pem文件。
//2.根据生成的rsa-key.pem文件导出私钥：
//openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
//输入第一步的密码，我们获得了解密后的私钥。
//3.导出公钥：
//openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem

//从文件加载key
function loadKey(file) {
    //key实际上就是PEM编码的字符串：
    return fs.readFileSync(file, 'utf-8');
}

let
    prvKey = loadKey('./rsa-prv.pem'),
    pubKey = loadKey('./rsa-pub.pem'),
    message = 'Hello, world!';

//使用私钥
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf-8'));
console.log(enc_by_prv.toString('hex'));

let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log(dec_by_pub.toString('utf8'));

//使用公钥加密
let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
console.log(enc_by_pub.toString('hex'));

//使用私钥解密
let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub);
console.log(dec_by_prv.toString('utf8'));