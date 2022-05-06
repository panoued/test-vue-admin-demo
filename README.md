## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

使用方法：
1. 配置根目录下vue.init -> route -> config.js 
    views: 路由所有文件夹
    excludes：该文件不自动生成路由
    custom：自定义路由
    output：输出结果所在文件

2. 配置根目录下vue.init -> lang -> config.js 
    cn: 简体语言文件路径
    tw：需要自动生成繁体的文件路径
    type：多语言keys类型文件路径(.d.ts)

3. 使用``` node vue.init ```自动生成路由及繁体翻译

4. 使用``` npm run dev ```启动项目

5. 配置src -> router -> meta.json
    auth： 权限
    keepalive： 路由是否缓存
    multiple： 相同路由是否可开启多个
    
5. 配置src -> router -> menus.json，生成菜单
    name： 目标路由name，用于跳转
    icon： 菜单
    title： 菜单名(多语言key)