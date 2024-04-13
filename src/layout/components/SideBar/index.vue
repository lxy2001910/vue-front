<template>
  <div class="sidebar-wrapper" :class="{ 'active-sidebar-wrapper': setting.showSidebar }">
    <div class="top-sidebar">
      <Logo />
    </div>
    <el-menu :collapse="setting.showSidebar" unique-opened router :default-active="route.path"
      class="el-menu-vertical-demo" :collapse-transition="false">
      <template v-for="menu in user.menus" :key="menu.menuId">
        <!-- 检查 menu.children 是否存在和非空 -->
        <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path.toString()"
          popper-class="active-popper" :teleported="false">
          <template #title>
            <el-icon>
              <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.menuName }}</span>
          </template>
          <!-- 在这里分别处理有 children 和没有 children 的情况 -->
          <template v-for="item in menu.children" :key="item.menuId">
            <el-sub-menu v-if="item.children && item.children.length" :index="item.menuId.toString()">
              <template #title>
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.menuName }}</span>
              </template>
              <el-menu-item v-for="subItem in item.children" :key="subItem.menuId" :index="subItem.path.toString()">
                <el-icon>
                  <component :is="subItem.icon" />
                </el-icon>
                {{ subItem.menuName }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item.path.toString()">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              {{ item.menuName }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.path.toString()">
          <el-icon>
            <component :is="menu.icon" />
          </el-icon>
          <span>{{ menu.menuName }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import Logo from "./Logo.vue";

import { useUserStore } from "@/store/user.js";
import { useSettingStore } from "@/store/setting";

import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";


const route = useRoute();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const settingStore = useSettingStore();
const { setting } = storeToRefs(settingStore);


</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  padding: 0 5px;
  //动画默认 200  后面 80
  width: 210px;
  height: 100%;
  background-color: rgb(33, 37, 43);
  box-sizing: content-box;
  transition: width .5s;
  user-select: none;

  &.active-sidebar-wrapper {
    width: 65px;
  }



  .top-sidebar {
    margin: 0 -5px;
  }

  :deep(.el-menu) {
    border-right: none;
    padding-top: 10px;
    background-color: rgb(33, 37, 43);

    .el-menu-item {
      color: rgba(255, 255, 255, 0.9);
      transition: width 0.3s;

      //菜单激活样式
      &.is-active {
        border-radius: 5px;
        background-color: #409eff;
        // background-color: rgba(40, 115, 186, 0.3);
        color: #fff;
        transition: all .3s;
      }

      &:hover {
        background-color: rgba(40, 115, 186, 0.3);
        color: #fff;
        border-radius: 5px;
      }
    }

    .el-sub-menu {
      background-color: rgba(0, 0, 0, 0);

      .el-sub-menu__title {
        color: rgba(255, 255, 255, 0.9);

        &:hover {
          background-color: rgba(40, 115, 186, 0.3);
          color: #fff;
          border-radius: 5px;
        }

      }

      .active-popper {
        background-color: transparent !important;
        box-shadow: none !important;
        border: none !important;

        .el-menu.el-menu--popup.el-menu--popup-right-start {
          background-color: rgba(33, 37, 43) !important;
        }
      }
    }

    

  }
  .el-icon {
      font-size: 16px;
      color: rgb(255, 255, 255);
    }

}


</style>
