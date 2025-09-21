//md5算法
//ts版本
//同样适用于uniappx中的uts语言
//auth:auleaf@hotmail.com
//date:2025-08-22
//参考https://www.webtoolkit.info/javascript-md5.html
//原作者blueimp
//https://github.com/blueimp/JavaScript-MD5/blob/master/js/md5.js
function safeAdd(x: number, y: number): number {
    let lsw = (x & 0xffff) + (y & 0xffff);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}

function bitRotateLeft(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
}

function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}
function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

function binlMD5(x: number[], len: number): number[] {
    // 确保数组长度足够
    let requiredLength = (((len + 64) >>> 9) << 4) + 16;
    while (x.length < requiredLength) {
        x.push(0);
    }
    
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < x.length; i += 16) {
        let olda = a;
        let oldb = b;
        let oldc = c;
        let oldd = d;

        // 确保访问的索引不超出数组边界
        let getValue = (index: number): number => {
            return (index < x.length) ? x[index] : 0;
        };

        a = md5ff(a, b, c, d, getValue(i), 7, -680876936)
        d = md5ff(d, a, b, c, getValue(i + 1), 12, -389564586)
        c = md5ff(c, d, a, b, getValue(i + 2), 17, 606105819)
        b = md5ff(b, c, d, a, getValue(i + 3), 22, -1044525330)
        a = md5ff(a, b, c, d, getValue(i + 4), 7, -176418897)
        d = md5ff(d, a, b, c, getValue(i + 5), 12, 1200080426)
        c = md5ff(c, d, a, b, getValue(i + 6), 17, -1473231341)
        b = md5ff(b, c, d, a, getValue(i + 7), 22, -45705983)
        a = md5ff(a, b, c, d, getValue(i + 8), 7, 1770035416)
        d = md5ff(d, a, b, c, getValue(i + 9), 12, -1958414417)
        c = md5ff(c, d, a, b, getValue(i + 10), 17, -42063)
        b = md5ff(b, c, d, a, getValue(i + 11), 22, -1990404162)
        a = md5ff(a, b, c, d, getValue(i + 12), 7, 1804603682)
        d = md5ff(d, a, b, c, getValue(i + 13), 12, -40341101)
        c = md5ff(c, d, a, b, getValue(i + 14), 17, -1502002290)
        b = md5ff(b, c, d, a, getValue(i + 15), 22, 1236535329)

        a = md5gg(a, b, c, d, getValue(i + 1), 5, -165796510)
        d = md5gg(d, a, b, c, getValue(i + 6), 9, -1069501632)
        c = md5gg(c, d, a, b, getValue(i + 11), 14, 643717713)
        b = md5gg(b, c, d, a, getValue(i), 20, -373897302)
        a = md5gg(a, b, c, d, getValue(i + 5), 5, -701558691)
        d = md5gg(d, a, b, c, getValue(i + 10), 9, 38016083)
        c = md5gg(c, d, a, b, getValue(i + 15), 14, -660478335)
        b = md5gg(b, c, d, a, getValue(i + 4), 20, -405537848)
        a = md5gg(a, b, c, d, getValue(i + 9), 5, 568446438)
        d = md5gg(d, a, b, c, getValue(i + 14), 9, -1019803690)
        c = md5gg(c, d, a, b, getValue(i + 3), 14, -187363961)
        b = md5gg(b, c, d, a, getValue(i + 8), 20, 1163531501)
        a = md5gg(a, b, c, d, getValue(i + 13), 5, -1444681467)
        d = md5gg(d, a, b, c, getValue(i + 2), 9, -51403784)
        c = md5gg(c, d, a, b, getValue(i + 7), 14, 1735328473)
        b = md5gg(b, c, d, a, getValue(i + 12), 20, -1926607734)

        a = md5hh(a, b, c, d, getValue(i + 5), 4, -378558)
        d = md5hh(d, a, b, c, getValue(i + 8), 11, -2022574463)
        c = md5hh(c, d, a, b, getValue(i + 11), 16, 1839030562)
        b = md5hh(b, c, d, a, getValue(i + 14), 23, -35309556)
        a = md5hh(a, b, c, d, getValue(i + 1), 4, -1530992060)
        d = md5hh(d, a, b, c, getValue(i + 4), 11, 1272893353)
        c = md5hh(c, d, a, b, getValue(i + 7), 16, -155497632)
        b = md5hh(b, c, d, a, getValue(i + 10), 23, -1094730640)
        a = md5hh(a, b, c, d, getValue(i + 13), 4, 681279174)
        d = md5hh(d, a, b, c, getValue(i), 11, -358537222)
        c = md5hh(c, d, a, b, getValue(i + 3), 16, -722521979)
        b = md5hh(b, c, d, a, getValue(i + 6), 23, 76029189)
        a = md5hh(a, b, c, d, getValue(i + 9), 4, -640364487)
        d = md5hh(d, a, b, c, getValue(i + 12), 11, -421815835)
        c = md5hh(c, d, a, b, getValue(i + 15), 16, 530742520)
        b = md5hh(b, c, d, a, getValue(i + 2), 23, -995338651)

        a = md5ii(a, b, c, d, getValue(i), 6, -198630844)
        d = md5ii(d, a, b, c, getValue(i + 7), 10, 1126891415)
        c = md5ii(c, d, a, b, getValue(i + 14), 15, -1416354905)
        b = md5ii(b, c, d, a, getValue(i + 5), 21, -57434055)
        a = md5ii(a, b, c, d, getValue(i + 12), 6, 1700485571)
        d = md5ii(d, a, b, c, getValue(i + 3), 10, -1894986606)
        c = md5ii(c, d, a, b, getValue(i + 10), 15, -1051523)
        b = md5ii(b, c, d, a, getValue(i + 1), 21, -2054922799)
        a = md5ii(a, b, c, d, getValue(i + 8), 6, 1873313359)
        d = md5ii(d, a, b, c, getValue(i + 15), 10, -30611744)
        c = md5ii(c, d, a, b, getValue(i + 6), 15, -1560198380)
        b = md5ii(b, c, d, a, getValue(i + 13), 21, 1309151649)
        a = md5ii(a, b, c, d, getValue(i + 4), 6, -145523070)
        d = md5ii(d, a, b, c, getValue(i + 11), 10, -1120210379)
        c = md5ii(c, d, a, b, getValue(i + 2), 15, 718787259)
        b = md5ii(b, c, d, a, getValue(i + 9), 21, -343485551)
        
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
}

function binl2rstr(input: number[]): string {
    let output: string = '';
    for (let i: number = 0; i < input.length * 32; i += 8) {
        let index = i >> 5;
        if (index < input.length) {
            output += String.fromCharCode((input[index] >>> (i % 32)) & 0xff);
        }
    }
    return output;
}

function rstr2binl(input: string): number[] {
    let output: number[] = new Array((input.length >> 2) + 1);
    for (let i: number = 0; i < output.length; i++) {
        output[i] = 0;
    }
    for (let i: number = 0; i < input.length * 8; i += 8) {
        let charCode:number = input.charCodeAt(i / 8)!;
        let index = i >> 5;
        if (index < output.length) {
            output[index] |= (charCode & 0xff) << (i % 32);
        }
    }
    return output;
}

function rstrMD5(s: string): string {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}

function rstr2hex(input: string): string {
    let hexTab:string = '0123456789abcdef';
    let output:string = '';
    for (let i:number = 0; i < input.length; i++) {
          let x:number = input.charCodeAt(i)!;
        output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
}

// Android平台优化的UTF-8编码函数
function str2rstrUTF8Android(input: string): string {
    let output = '';
    for (let i = 0; i < input.length; i++) {
          let c:number = input.charCodeAt(i)!;
        // 在Android平台上，确保正确处理字符编码
        if (c < 128) {
              output += String.fromCharCode(c!);
        } else if (c < 2048) {
            output += String.fromCharCode((c >> 6) | 192);
            output += String.fromCharCode((c & 63) | 128);
        } else if (c < 65536) {
            // 对于Android平台，确保正确处理高位字符
            output += String.fromCharCode((c >> 12) | 224);
            output += String.fromCharCode(((c >> 6) & 63) | 128);
            output += String.fromCharCode((c & 63) | 128);
        } else {
            output += String.fromCharCode((c >> 18) | 240);
            output += String.fromCharCode(((c >> 12) & 63) | 128);
            output += String.fromCharCode(((c >> 6) & 63) | 128);
            output += String.fromCharCode((c & 63) | 128);
        }
    }
    return output;
}

// Web平台的UTF-8编码函数
function str2rstrUTF8Web(input: string): string {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        let c = input.charCodeAt(i);
        if (c < 128) {
            output += String.fromCharCode(c);
        } else if (c < 2048) {
            output += String.fromCharCode((c >> 6) | 192);
            output += String.fromCharCode((c & 63) | 128);
        } else if (c < 65536) {
            output += String.fromCharCode((c >> 12) | 224);
            output += String.fromCharCode(((c >> 6) & 63) | 128);
            output += String.fromCharCode((c & 63) | 128);
        } else {
            output += String.fromCharCode((c >> 18) | 240);
            output += String.fromCharCode(((c >> 12) & 63) | 128);
            output += String.fromCharCode(((c >> 6) & 63) | 128);
            output += String.fromCharCode((c & 63) | 128);
        }
    }
    return output;
}

export function md5(str: string): string {
    try {
        // 根据平台选择不同的UTF-8编码函数
        // #ifdef APP-ANDROID
        return rstr2hex(rstrMD5(str2rstrUTF8Android(str)));
        // #endif
        
        // #ifndef APP-ANDROID
        return rstr2hex(rstrMD5(str2rstrUTF8Web(str)));
        // #endif
    } catch (error) {
        console.error('MD5计算错误:', error);
        // 返回一个简单的哈希作为降级处理
        return fallbackHash(str);
    }
}

// 降级哈希函数
function fallbackHash(str: string): string {
    let hash = 0;
    if (str.length === 0) return '0';
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i)!;
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转换为32位整数
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
}


// 测试函数（可在开发时使用）
export function testMd5(): boolean {
    try {
        let testStr = 'hello';
        let result = md5(testStr);
        console.log(`MD5测试: "${testStr}" => "${result}"`);
        return result.length === 32; // MD5应该返回32位十六进制字符串
    } catch (error) {
        console.error('MD5测试失败:', error);
        return false;
    }
}
