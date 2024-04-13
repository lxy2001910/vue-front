<template>
    <div class="layout-wapper">
        <div class="sidebar">
            <SideBar />
        </div>
        <div class="main">
            <div class="header">
                <TopMenu />
            </div>
            <div class="app-main">
                <AppMain />
            </div>
        </div>
    </div>
</template>

<script setup>
import SideBar from "@/layout/components/SideBar/index.vue"
import TopMenu from "@/layout/components/TopMenu/index.vue"
import AppMain from "@/layout/AppMain.vue"
</script>

<style lang="scss" scoped>
.layout-wapper {
    display: flex;
    width: 100vw;
    height: 100vh;
    /* 确保使用视口高度 */
}

.sidebar {
    height: 100vh;
}

.main {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    width: 100%;

    .header {
        height: 64px;
    }

    .app-main {
        position: absolute;
        top: 64px; /* 让 app-main 从 header 底部开始 */
        bottom: 0; /* 让 app-main 填充剩余空间 */
        left: 0;
        right: 0;
        overflow-y: auto; /* 允许垂直方向滚动 */
        
    }
}
</style>
