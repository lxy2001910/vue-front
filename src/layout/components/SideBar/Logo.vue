<template>
    <div class="logocon">

        <img v-if="setting.showSidebar" class="logo animate__animated animate__slideInRight"
            src="@/assets/images/logo.png" alt="logo" />
        <img v-else class="gif animate__animated animate__slideInLeft" src="@/assets/images/a.webp" alt="gif" />

    </div>
</template>

<script setup>
import { useSettingStore } from '@/store/setting';

const { setting } = useSettingStore();


</script>

<style lang="scss" scoped>
.logocon {
    height: 75px;

    overflow: hidden;

    .logo {
        // width: 75px;
        height: 75px;
    }

    .gif {
        width: 210px;
        height: 75px;
        scale: 1.3;
        animation-duration: .4s;


    }

}
</style>