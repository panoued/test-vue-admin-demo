<template>
    <button class="test-btn" @click="handle">
        <slot></slot>
    </button>
</template>

<script src="./TestBtn.ts"></script>

<style lang="scss" scoped>
.test-btn {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: $c;
    color: #fff;
    border-radius: 6px;
    font-size: 15px;
    cursor: pointer;
}
</style>