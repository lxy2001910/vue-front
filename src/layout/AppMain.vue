<template>
  <div class="AppMain">
    <TagsView />
    <div class="scroll-content">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>


<script setup>
import TagsView from './components/TagsView.vue';


</script>

<style lang="scss" scoped>
.AppMain {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-x: hidden;

  .scroll-content {

    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
    width: 100%;
  
  }
}
</style>