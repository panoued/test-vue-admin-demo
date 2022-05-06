<template>
    <div class="test-view1">
        <h1 class="tac">{{ title }}</h1>
        <br />
        <test-btn @click="toTest2">to test2</test-btn>
        <br />
        <test-btn @click="back">back</test-btn>
    </div>
</template>

<script src="./view1.ts"></script>

<style lang="scss" scoped>
.test-view1 {
    padding: 14px;
    background-color: $blue-ll;
}
</style>