<template>
    <div id="index-view">
        <div class="layout">
            <div class="menu">
                <div class="menu-items" v-for="(item, i) in menu" :key="i">
                    <div class="menu-item" @click="handle(item)">
                        <i :class="item.icon"></i>
                        &nbsp;
                        <span>{{ $t(item.title) }}</span>
                    </div>
                    <ul>
                        <li class="child-item" v-for="(child, n) in item.children" :key="n" @click="handle(child)">
                            <i :class="child.icon"></i>
                            &nbsp;
                            <span>{{ $t(child.title) }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main">
                <div class="header">
                    <div class="link" :class="isActive(item.fullPath)" v-for="(item, i) in routes" :key="i">
                        <router-link class="w" :to="item.fullPath">{{ getName(item) }}</router-link>
                    </div>
                </div>
                <div class="content">
                    <keep-alive :include="keepAlive">
                        <router-view class="router-view" :key="$route.fullPath"></router-view>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.ts"></script>

<style lang="scss" scoped>
#index-view {
    .layout {
        width: 100%;
        height: 100%;
        display: flex;
        .menu {
            flex: none;
            width: 200px;
            height: 100%;
            padding: 10px;
            background-color: $c;
            .menu-items {
                padding-bottom: 5px;
            }
            .menu-item {
                padding: 10px;
                border-radius: 4px;
                background-color: $bg;
                margin-bottom: 10px;
                color: $c;
                cursor: pointer;
                user-select: none;
            }
            .child-item {
                padding: 5px 5px 5px 15px;
                color: #fff;
                cursor: pointer;
                user-select: none;
            }
        }
        .main {
            flex: auto;
            display: flex;
            flex-direction: column;
            .header {
                flex: none;
                padding: 10px;
                background-color: $bga;
                .link {
                    display: inline-block;
                    padding: 5px 8px;
                    margin: 6px;
                    background-color: $blue-dd;
                    .w {
                        color: #fff;
                    }
                    &.active {
                        background-color: $c;
                    }
                }
            }
            .content {
                flex: auto;
                position: relative;
                overflow: hidden;
            }
        }
    }
}
</style>
