<template>
  <div class="ManageContainer">
    <div class="homework-item">123</div>

    <div class="homework-info">123</div>
  </div>
</template>

<script setup>
import { findteacherPublicHomework } from '@/api/teacher'
import { useUserStore } from '@/store/user'

const homeworkList = ref([])
const loading = ref(false)
const { user } = useUserStore()

onMounted(async () => {
  loading.value = true
  const res = await findteacherPublicHomework(user.userId)
  homeworkList.value = res.data
  loading.value = false
})
</script>

<style lang="scss" scoped>
.ManageContainer {
  display: flex;
  align-items: stretch; // 默认值，确保子元素填满交叉轴的高度
  height: 100%; // 父元素需要有明确的高度设置
  .homework-item {
    width: 15%;
    background-color: blue;
  }
  .homework-info {
    width: 85%;
    background-color: red;
  }
}

</style>
