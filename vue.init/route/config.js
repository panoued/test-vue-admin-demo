module.exports = {
    views: 'src/views',
    excludes: [
        'src/views/layout/index.vue',
        'src/views/home/view.vue'
    ],
    custom: [
        {
            path: '/',
            name: 'HomeView',
            component: 'home/view.vue'
        },
        {
            path: '/test/view0',
            name: 'TestView0',
            component: 'test/view1.vue'
        }
    ],
    output: {
        json: 'src/router/routes.json',
        path: 'src/utils/enums/RoutePathList.ts',
        name: 'src/utils/enums/RouteNameList.ts'
    }
}