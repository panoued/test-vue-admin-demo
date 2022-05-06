<template>
    <div class="test-view2">
        <h1 class="tac">{{ title }}</h1>
        <h2 class="tac">{{ count }}</h2>
        <br />
        <test-btn @click="showPopup">show popup</test-btn>
        <br />
        <test-btn @click="back">back</test-btn>
        <br />
        <h2 class="tac">{{ content }}</h2>
        <test-popup v-model="visible">
            <ul>
                <li class="item" v-for="i in 5" :key="i" @click="select(i)">{{ i }}</li>
            </ul>
        </test-popup>
    </div>
</template>

<script src="./index.ts"></script>

<style lang="scss" scoped>
.test-view2 {
    padding: 14px;
    background-color: $red-ll;
    .item {
        line-height: 44px;
        text-align: center;
        & + .item {
            border-top: $border;
        }
    }
}
</style>