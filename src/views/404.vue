<template>
    <div class="juzhong">
        <el-col :sm="12" :lg="6" >
        <el-result
          icon="warning"
          title="404"
          sub-title="你找的页面不存在"
        >
          <template #extra >
            
          </template>
        </el-result>
      </el-col>
    </div>
  </template>
  
  <style scoped>
  .juzhong{
    display: flex;
    align-items: center;
    justify-content: center;
    }
  </style>
  