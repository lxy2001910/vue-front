<template>
  <div class="container">
    <div class="createHomework">
      <el-form
        :model="homeworkForm"
        :rules="homeworkRules"
        ref="homeworkRef"
        label-width="70px"
      >
        <el-form-item label="作业标题" prop="title">
          <el-input
            v-model="homeworkForm.title"
            placeholder="请输入作业标题"
          ></el-input>
        </el-form-item>

        <el-form-item label="作业描述" prop="description">
          <el-input
            v-model="homeworkForm.description"
            type="textarea"
            placeholder="请输入作业描述"
          ></el-input>
        </el-form-item>

        <el-form-item label="截止日期" prop="dueDate">
          <el-date-picker
            v-model="homeworkForm.dueDate"
            type="datetime"
            placeholder="选择日期"
            style="width: 100%"
            format="YYYY/MM/DD HH:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-select v-model="classId" placeholder="请选择班级" multiple>
            <template #header>
              <el-checkbox
                v-model="checkAll"
                :indeterminate="indeterminate"
                @change="handleCheckAll"
              >
                全选
              </el-checkbox>
            </template>
            <el-option
              v-for="item in filterClass"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="homeworkForm.courseId"
            :placeholder="
              filterCourse.length === 1
                ? filterCourse[0].courseName
                : '请选择课程'
            "
            :disabled="filterCourse.length === 1"
          >
            <el-option
              v-for="item in filterCourse"
              :key="item.courseId"
              :label="item.courseName"
              :value="item.courseId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-upload
            ref="fileRef"
            :auto-upload="false"
            list-type="text"
            class="el-upload-ui"
            drag
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleFileChange"
            :before-remove="handleRemove"
          >
            <el-icon class="el-icon--upload"
              ><upload-filled style="font-size: 50px"
            /></el-icon>
            <div class="el-upload__text">
              （选择上传）将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button
            :loading="uploading"
            style="width: 100%"
            type="primary"
            @click="submitHomework"
            >发布</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { findClassesCourseByUserId, createHomework } from '@/api/teacher'
import { toast } from '@/utils/message'

const { user } = useUserStore()

const uploading = ref(false)

const fileRef = ref(null)
const upfile = ref(null)
const checkAll = ref(false)
const homeworkRef = ref(null)
const homeworkForm = reactive({
  title: '',
  description: '',
  dueDate: '',
  teacherId: `${user.userId}`,
  courseId: '',
})
const classId = ref([])

const indeterminate = computed(
  () =>
    classId.value.length > 0 && classId.value.length < filterClass.value.length
)

const handleCheckAll = (val) => {
  classId.value = val ? filterClass.value.map((item) => item.classId) : []
}

const homeworkRules = {
  title: [{ required: true, message: '请输入作业标题', trigger: 'submit' }],
  description: [
    { required: true, message: '请输入作业描述', trigger: 'submit' },
  ],
  dueDate: [{ required: true, message: '请选择截止日期', trigger: 'submit' }],
  teacherId: [{ required: true, message: '请输入教师ID', trigger: 'submit' }],
}
const handleFileChange = (file, fileList) => {
  // 假设你只关心最新的一个文件，因为你设置了 :limit="1"
  // fileList 是当前的文件列表，它应该包含了最新上传的文件
  const latestFile = fileList[fileList.length - 1]
  if (latestFile) {
    // 直接保存 File 对象
    upfile.value = latestFile.raw || latestFile // 兼容性写法，确保是 File 对象
  }
}

const handleRemove = (file, fileList) => {
  upfile.value = null
}

const handleExceed = (files) => {
  fileRef.value.clearFiles()
  const newFile = files[0] // 修改变量名以避免与外部的 ref 变量冲突
  fileRef.value.handleStart(newFile) // 使用新的变量名
}

const submitHomework = async () => {
  uploading.value = true

  try {
    const valid = await homeworkRef.value.validate()
    if (!valid) return

    const homeworkClassBO = {
      homeworks: { ...homeworkForm },
      classId: classId.value ? classId.value : [],
    }

    let formData = new FormData()
    if (upfile.value) formData.append('file', upfile.value)
    formData.append('homework', JSON.stringify(homeworkClassBO))

    // 发送 formData 到服务器
    const res = await createHomework(formData)

    if (res.code == 200) {
      homeworkRef.value.resetFields()
      fileRef.value.clearFiles()
      classId.value = []
      toast(res.msg, '发布成功')
    } else {
      toast(res.msg, '发布失败', 'error')
    }
  } catch (error) {
    // toast('error', '发布失败');
    toast('error', '请输入完整', 'error')
  } finally {
    uploading.value = false
  }
}

let classesCourse = ref([])
const filterClass = computed(() =>
  classesCourse.value.map((item) => item.classes)
)
const filterCourse = computed(() =>
  Array.from(
    new Set(classesCourse.value.map((item) => JSON.stringify(item.courses)))
  ).map((courseStr) => JSON.parse(courseStr))
)

onMounted(async () => {
  const res = await findClassesCourseByUserId(user.userId)
  classesCourse.value = res.data
  const courses = filterCourse.value
  if (courses.length === 1) {
    homeworkForm.courseId = courses[0].courseId
  }
})
</script>

<style lang="scss" scoped>
// .el-form-item__content {
//   width: 1000px;
// }
.container {
  display: flex;
  justify-content: space-around;
  background-color: rgba(111, 107, 113,0.3);
  border-radius: 8px;
  padding: 40px;
  height: 100vh;

  .createHomework {
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
  }
}

.el-input,
.el-select,
.el-date-picker {
  width: 100%;
}
:deep(.el-upload-ui) {
  flex-grow: 1;
  .el-upload-list__item-name {
    justify-content: center;
  }
}
</style>
