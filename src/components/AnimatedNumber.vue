<template>
    <div>{{ animatedNumber }}</div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { gsap } from 'gsap';
  
  // 接收一个prop: finalNumber，这是动画完成时的数字
  const props = defineProps({
    finalNumber: {
      type: [Number, String],
      required: true
    }
  });
  
  // 用于动画的反应式引用
  const animatedNumber = ref(0);
  
  // 监视finalNumber的变化，并在变化时启动动画
  watch(() => props.finalNumber, (newVal) => {
    gsap.to(animatedNumber, { 
      value: newVal, 
      duration: 1,
      onUpdate: () => {
        animatedNumber.value = Math.round(gsap.getProperty(animatedNumber, 'value'));
      }
    });
  }, { immediate: true });
  </script>
  