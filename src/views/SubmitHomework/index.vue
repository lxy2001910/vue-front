<!--
 * @Author: 星忆 2500798479@qq.com
 * @Date: 2024-04-14 01:19:30
 * @LastEditors: 星忆 2500798479@qq.com
 * @LastEditTime: 2024-04-20 22:43:01
 * @FilePath: \up-cloud-front\src\views\SubmitHomework\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="submitcontinaer">
    <el-row>
      <el-col :span="24">
        <el-collapse accordion>
          <el-collapse-item
            v-for="(item, index) in homeworklist"
            :key="index"
            class="listitem"
          >
            <template #title>
              <div class="titleStyle">
                <span class="title">{{ item.title }}</span>
                <el-icon class="uploadstatus">
                  <template v-if="item.status == 0">
                    <el-tag type="danger">未提交</el-tag>
                  </template>
                  <template v-else>
                    <el-tag type="success">已提交</el-tag>
                  </template>
                </el-icon>
              </div>
            </template>
            <template #default>
              <div class="content">
                <el-col :span="12">
                  <div class="description">
                    <span>作业描述：{{ item.description }}</span>
                    <span>
                      <span>发布老师：{{ item.teacherName }}</span>
                      <span> 截至日期：{{ item.dueDate }} </span>
                    </span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="uploadhomework">
                    <h1>上传作业</h1>
                  </div>
                </el-col>
              </div>
            </template>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { findStudentHomework } from '@/api/student'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store/user'

const { user } = useUserStore()

let homeworklist = ref([])

onMounted(async () => {
  const res = await findStudentHomework(user.classId)
  homeworklist.value = res.data
  homeworklist.value.forEach((item) => {
    item.dueDate = dayjs(item.dueDate).format('YYYY-MM-DD HH:mm:ss')
  })
  console.log(homeworklist.value)
})
</script>

<style lang="scss" scoped>
.submitcontinaer {
  height: 100%;

  .listitem {
    &:not(:first-child) {
      margin-top: 20px;
    }

    :deep(.el-collapse-item__header) {
      font-family: 'myFont', sans-serif;
      width: 100%; // 适应父元素宽度
      height: 80px;
      padding: 10px;
      font-size: 30px;
      background-color: antiquewhite;
      border-radius: 8px;
    }

    :deep(.el-collapse-item__content) {
      display: flex;
      padding-bottom: 0;

      .content {
        width: 100%;
        display: flex;

        .description {
          //   width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          //   align-items: center;

          & > :nth-child(2) {
            margin-top: 20px;
            white-space: nowrap;
            text-align: right;
            font-size: small;
            color: #999999;
          }
        }

        .uploadhomework {
          //   width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          h1 {
            font-size: 30px;
          }
        }
      }
    }

    .titleStyle {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 20px;
      }

      .uploadstatus {
        padding-right: 50px;
        white-space: nowrap;
      }
    }
  }
}
</style>
