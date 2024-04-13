<template>
   
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { watch } from 'vue';

const props=defineProps({
    content:{
        type: Object,
        default: () => null, // 使用函数返回 null
    }
})



const showNotification = (title, message, type = 'success', duration = 3000, position = 'top-right') => {
  return new Promise((resolve, reject) => {
    try {
        ElNotification({
        title: title,
        message: message,
        type: type,
        duration: duration,
        position: position,
        dangerouslyUseHTMLString: true

      });
      resolve('Notification displayed successfully');
    } catch (error) {
      reject('Failed to display notification: ' + error);
    }
  });
};


watch(()=>props.content,()=>{
    

    if(props.content.code==200){
        showNotification('成功😊',props.content.msg,'success')
    }
    if(props.content.code==400){
        showNotification('失败',props.content.msg,'error')
    }
   
 
})
    

   
</script>

<style lang="sass" scoped>

</style>