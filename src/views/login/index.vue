<template>
    <div class="login">
        <h1>Login</h1>
        <br />
        <div>
            <input class="input" type="text" />
            <br />
            <br />
            <input class="input" type="text" />
            <br />
            <br />
            <button class="btn" @click="login">登录</button>
        </div>
        <br />
        <br />
        <test-btn style="display: inline-block; width: 300px;" @click="back">返回</test-btn>
    </div>
</template>

<script src="./index.ts"></script>

<style lang="scss" scoped>
.login {
    padding: 20px;
    text-align: center;
    .input {
        width: 300px;
        height: 30px;
        border: $border;
    }
    .btn {
        width: 300px;
        height: 30px;
        cursor: pointer;
        background-color: $c;
        color: #fff;
    }
}
</style>