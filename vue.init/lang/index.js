console.log('初始化多语言开始');

console.time('初始化多语言用时');

const { cn, tw, type } = require('./config');

const { toTw, decode } = require('./utils');

const fs = require('fs');

const langfile = fs.readFileSync(cn);

const langs = JSON.parse(decode(langfile));

const langKeys = [], twLangs = {};

for (const key in langs) {
    langKeys.push(key);
    twLangs[key] = toTw(langs[key]);
};

fs.writeFileSync(type, `type LangKeys = '${langKeys.join('\'\n | \'')}';`);

fs.writeFileSync(tw, JSON.stringify(twLangs, null, '\t'));

console.log('初始化多语言结束');

console.timeEnd('初始化多语言用时');

console.log('\n');