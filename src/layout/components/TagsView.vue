<template>
  <div class="tagcon">

    <!-- <el-tag v-for="tag in tabList" :key="tag.path"
        :closable="(activePath === '/dashboard' && tag.path !== '/dashboard') || (tag.path !== '/dashboard' && tag.path === activePath)"
        @close="handleClose(tag)" @click="changeTab(tag.path)" :class="{ 'active-tag': tag.path == activePath }"
    
        class="animate__animated animate__slideInLeft animate__faster"
        >

        {{ tag.title }}

      </el-tag> -->
    <!-- 
      <el-tabs v-model="activePath" type="card" closable @tab-remove="handleClose" @tab-change="changeTab">
        <el-tab-pane v-for="tag in tabList" :key="tag.path" :label="tag.title" :name="tag.path">
         
        </el-tab-pane>  
      </el-tabs> -->
    <el-tabs v-model="activePath" style="min-width:100px;" type="card" @tab-remove="handleClose"  class="animate__animated animate__slideInLeft animate__faster"
      @tab-change="changeTab">
      <el-tab-pane v-for="tag in tabList" :key="tag.path" :label="tag.title" :name="tag.path" 
        :closable="tag.path != '/dashboard'">
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script setup>
import Cookies from "js-cookie";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { router } from "@/router/index";


const route = useRoute();

const activePath = ref(route.path);
const tabList = ref([
  {
    path: "/dashboard",
    title: "首页",
  },
]);

//监听路由变化
onBeforeRouteUpdate((to, from) => {
  activePath.value = to.path;
  addTab({ path: to.path, title: to.name });
});

//添加标签
const addTab = (tab) => {
  let noTab = tabList.value.findIndex((item) => item.path == tab.path);
  if (noTab == -1) {
    tabList.value.push(tab);
  }
  Cookies.set("tabList", JSON.stringify(tabList.value));
};

// const handleClose = (tag) => {
//   let index = tabList.value.findIndex((item) => item.path == tag.path);

//   tabList.value.splice(index, 1);

//   Cookies.set("tabList", JSON.stringify(tabList.value));
//   if (activePath.value == tag.path) {
//     router.push(tabList.value[index - 1].path);
//   }
// };

// const changeTab = (path) => {
//   router.push(path);
// };




const handleClose = (path) => {
  let index = tabList.value.findIndex((item) => item.path == path);

  if (index !== -1) {
    tabList.value.splice(index, 1);
    Cookies.set("tabList", JSON.stringify(tabList.value));
    if (activePath.value == path) {
      let newIndex = index > 0 ? index - 1 : 0;
      router.push(tabList.value[newIndex].path);
    }
  }
};



const changeTab = (path) => {
  router.push(path);
};



const initTabList = () => {
  let tabListStr = Cookies.get("tabList");
  if (tabListStr) {
    tabList.value = JSON.parse(tabListStr);
  }
};

onMounted(() => {
  initTabList();
});
</script>

<style lang="scss" scoped>
.tagcon {
  height: 40px;


  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid #ebeef5;


  :deep(.el-tabs__header){
    border: none;
  }

  :deep(.el-tabs__nav) {
    border: none;


    .el-tabs__item {
      margin-left: 20px;
     
      border: 1px solid #ebeef5;
      border-radius: 8px;
     
      &.is-active {
        background-color: #f5f7fa;
        border: 1px solid #ebeef5;
      }
   
    }

  }








}



// .el-tag {
//     height: 40px;
//     width: 130px;
//     line-height: 40px;
//     margin-left: 10px;
//     user-select: none;
//     cursor: pointer;
//     border-radius: 8px;
//     background-color: #abc6f8;
//     color: #ffffff;
//     transition: none;

//     &:hover {
//       background-color: #5c8ee6;

//       // transition: all 0.3s;
//     }


//   }



// .active-tag {
//     background-color: rgb(92, 230, 163) !important;
//     color: black;
//   }</style>
