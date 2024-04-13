<template>
  <div class="topview">
    <div class="topMenu">
      <div class="leftMenu">
        <el-icon @click="changeSetting" class="icon-btn">
          <Expand v-if="setting.showSidebar" />
          <Fold v-else />

        </el-icon>
        <el-tooltip effect="dark" content="刷新">
          <el-icon class="icon-btn" @click="handleRefresh">
            <refresh />
          </el-icon>
        </el-tooltip>

      </div>
      <div class="rightMenu">
        <el-icon class="icon-btn" @click="changeFullScreen">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>

        <el-dropdown trigger="hover">
          <span class="el-dropdown-link">
            <el-avatar size="default" :src="user.avatar" />
            <i class="avatarText">{{ user.uname }}</i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>


      </div>
    </div>


  </div>
</template>

<script setup>
import { useSettingStore } from '@/store/setting';
import { useUserStore } from '@/store/user'
import Cookies from "js-cookie"
// import { useRouter } from 'vue-router';
import { router } from '@/router/index'

import { useFullscreen } from 'vue-hooks-plus'

// const route = useRouter()


const settingStore = useSettingStore();
// const { setting } = storeToRefs(settingStore);
const { setting } = useSettingStore()
const { user } = useUserStore()

const changeSetting = () => {
  settingStore.setSeidebar()
}
const handleRefresh = () => {
  window.location.reload()
}

const [isFullscreen, { toggleFullscreen }] = useFullscreen()

const changeFullScreen = () => {
  toggleFullscreen()
}




const logout = () => {
  Cookies.remove("token")
  Cookies.remove("refresh_token")
  Cookies.remove("tabList")
  localStorage.removeItem("user")
  localStorage.removeItem("setting")
  localStorage.removeItem("jinrishici-token")
  router.push('/login')
}


onMounted(() => {
  // console.log(user);
})





</script>

<style lang="scss" scoped>
.topview {

  height: 64px;

  background-color: white;

  .topMenu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;


    .leftMenu {

      .icon-btn {
        // color: #fff;
        font-size: 40px;
        margin: 0 10px;
        cursor: pointer;
        margin-left: 40px;
        scale: 1.3;
      }
    }

    .rightMenu {
      .icon-btn {
        font-size: 20px;
        margin: 0 10px;
        cursor: pointer;
        margin-right: 50px;
        scale: 1.3;
      }

      display: flex;
      align-items: center; // 确保 .rightMenu 内的所有内容垂直居中
      margin-right: 50px;

      // 去除鼠标移上去会显示一个边框
      :deep(.el-tooltip__trigger:focus-visible) {
        outline: unset;
      }

      .el-dropdown-link {
        display: flex;
        align-items: center;

        .avatarText {
          color: #201111;
          margin-left: 10px;
        }

      }
    }




  }
}
</style>