console.log('初始化路由开始');

console.time('初始化路由用时');

const fs = require('fs');

const { views, excludes, custom, output } = require('./config');

const { firstToUpperCase } = require('./utils');

function read(...path) {
    const dir = path.filter(s => !!s).join('/');
    let files = [];
    try {
        files = fs.readdirSync(dir);
    } catch { }
    files.forEach(file => {
        if (/\.vue$/.test(file)) {
            const vue = dir + '/' + file;
            const fit = vue != 'src/views/index.vue' && !excludes.includes(vue);
            if (fit) {
                list.push(vue);
            };
        } else {
            read(dir, file);
        };
    });
};

const list = [], routes = [], pathList = [], nameList = [];

read(views);

list.forEach(filePath => {
    const component = filePath.replace(new RegExp(views + '\/'), '');
    const arr = component.replace(/.vue$/, '').split('/');
    const name = arr.filter(str => !/_|index/.test(str)).map(str => firstToUpperCase(str)).join('');
    let path = '';
    if (arr[arr.length - 1] == 'index') {
        path = arr.slice(0, arr.length - 1).map(str => str.replace('_', ':')).join('/');
    } else {
        path = arr.map(str => {
            if (/_/.test(str)) {
                return str.replace('_', ':') + '?'
            } else {
                return str;
            };
        }).join('/');
    };
    path = '/' + path;
    routes.push({ path, name, component });
});

routes.push(...custom);

routes.forEach(route => {
    pathList.push(`${route.name} = '${route.path.replace(/\:.*$/, '')}'`);
    nameList.push(`${route.name} = '${route.name}'`);
});

fs.writeFileSync(output.json, JSON.stringify(routes, null, '\t'));

fs.writeFileSync(output.path, `export enum ${output.path.split('/')[output.path.split('/').length - 1].replace('.ts', '')} {
    ${pathList.join(',\n\t')}
};`);

fs.writeFileSync(output.name, `export enum ${output.name.split('/')[output.name.split('/').length - 1].replace('.ts', '')} {
    ${nameList.join(',\n\t')}
};`);

console.log('初始化路由结束');

console.timeEnd('初始化路由用时');

console.log('\n');
