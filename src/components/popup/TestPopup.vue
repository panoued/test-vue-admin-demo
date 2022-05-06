<template>
    <div class="popup-mobile">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="popup-mobile-mask" v-show="visible" @click="hide"></div>
        </transition>
        <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <div class="popup-mobile-container" v-show="visible">
                <div class="popup-mobile-box">
                    <div class="popup-mobile-slot">
                        <slot></slot>
                    </div>
                </div>
                <div class="popup-mobile-sep"></div>
                <div class="popup-mobile-btn" @click="hide">{{ cancel }}</div>
            </div>
        </transition>
    </div>
</template>

<script src="./TestPopup.ts"></script>

<style lang="scss" scoped>
$rem: 1px;
.popup-mobile {
    position: fixed;
    top: 100%;
    bottom: -100%;
    left: 0;
    right: 0;
    z-index: 2001;
    .popup-mobile-mask {
        position: absolute;
        bottom: 100%;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    }
    .popup-mobile-container {
        position: absolute;
        bottom: 100%;
        width: 100%;
        max-height: 80%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .popup-mobile-box {
        flex: auto;
        height: 100%;
        font-size: 56 * $rem;
        overflow: auto;
    }
    .popup-mobile-sep {
        flex: none;
        width: 100%;
        height: 8 * $rem;
        background-color: #f5f6f8;
    }
    .popup-mobile-btn {
        flex: none;
        line-height: 48 * $rem;
        font-size: 16 * $rem;
        color: #999;
        text-align: center;
    }
    .popup-mobile-slot {
        font-size: 15 * $rem;
    }
}
</style>