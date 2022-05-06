<template>
    <div class="home-view">
        <h1 class="tac">{{ title }}</h1>
        <br />
        <test-btn @click="toTest1">to test1</test-btn>
        <br />
        <test-btn @click="toTest2">to test2</test-btn>
        <br />
        <test-btn @click="changeLang">切换语言，当前: {{ lang }}</test-btn>
        <br />
        <test-btn @click="logout">登出</test-btn>
        <br />
        <!-- <ol>
            <li v-for="path in routes" :key="path">
                <router-link :to="{ path }">{{ path }}</router-link>
            </li>
        </ol> -->
    </div>
</template>

<script src="./view.ts"></script>

<style lang="scss" scoped>
.home-view {
    padding: 14px;
    background-color: $bg;
}
</style>