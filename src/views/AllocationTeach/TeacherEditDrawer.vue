<template>
  <div>
    <el-drawer
      v-model="drawerVisible"
      size="40%"
      :before-close="handleDrawerClose"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <template #header>
        正在修改&nbsp;<span>{{ selectedTeacher.teacherName }}</span>
      </template>

      <template #default>
        <div class="undistributed">
          <el-form
            :model="selectedTeacher"
            :rules="ruleFrom"
            ref="formRef"
            label-width="80px"
            :validate-on-rule-change="false"
          >
            <el-form-item label="选择班级" prop="selectClasses">
              <el-select
                v-model="selectedTeacher.selectClasses"
                multiple
                value-key="classId"
                placeholder="请选择班级"
                style="width: 100%"
              >
                <!-- 显示可添加的班级 -->
                <el-option
                  v-if="selectedTeacher.operation === 'add'"
                  v-for="item in availableClassesForAdd"
                  :key="'add-' + item.classId"
                  :label="item.className"
                  :value="item"
                ></el-option>
                <!-- 显示已分配的班级（用于删除） -->
                <el-option
                  v-else
                  v-for="item in classesForDelete"
                  :key="'delete-' + item.classId"
                  :label="item.className"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择课程" prop="selectCourses">
              <el-select
                v-model="selectedTeacher.selectCourses"
                multiple
                placeholder="请选择课程"
                style="width: 100%"
                value-key="courseId"
              >
                <!-- 显示可添加的课程 -->
                <el-option
                  v-if="selectedTeacher.operation === 'add'"
                  v-for="item in availableCoursesForAdd"
                  :key="'add-' + item.courseId"
                  :label="item.courseName"
                  :value="item"
                ></el-option>
                <!-- 显示已分配的课程（用于删除） -->
                <el-option
                  v-else
                  v-for="item in coursesForDelete"
                  :key="'delete-' + item.courseId"
                  :label="item.courseName"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="distributed">
          <el-table
            :data="selectedTeacher.classes"
            border
            style="margin-top: 20px"
          >
            <el-table-column label="已选择班级名称" align="center">
              <el-table-column prop="classId" label="课程ID"></el-table-column>
              <el-table-column
                prop="className"
                label="课程名称"
              ></el-table-column>
            </el-table-column>
          </el-table>

          <el-table
            :data="selectedTeacher.courses"
            border
            style="margin-top: 20px"
          >
            <el-table-column label="已选择课程名称" align="center">
              <el-table-column prop="courseId" label="课程ID">
              </el-table-column>
              <el-table-column prop="courseName" label="课程名称">
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template #footer>
        <el-button type="primary" @click="submitButton">确 定</el-button>

        <el-button @click="handleDrawerClose">取 消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { getAllClassesCourses, addOrDeleteAllocationTeach } from "@/api/admin";
import { toast, showMessage } from "@/utils/message";

const props = defineProps({
  visible: Boolean,
  teacher: Object,
});

const drawerVisible = ref(props.visible);

const selectedTeacher = ref(props.teacher);
const ruleFrom = reactive({
  selectClasses: [
    { required: true, message: "请至少选择一个班级", trigger: "submit" },
  ],
  selectCourses: [
    { required: true, message: "请至少选择一门课程", trigger: "submit" },
  ],
});
const formRef = ref();
const allClassCourses = ref([]);
const emit = defineEmits(["update:visible", "update:teacher"]);

const submitButton = async () => {
  // 验证表单
  const valid = await formRef.value.validate();
  if (valid) {
    console.log("表单验证成功，处理提交逻辑");
    const upform = {
      userId: selectedTeacher.value.userId.toString(),
      courses: selectedTeacher.value.selectCourses,
      classes: selectedTeacher.value.selectClasses,
      operation: selectedTeacher.value.operation,
    };

    try {
      const res = await addOrDeleteAllocationTeach(upform);
      // console.log(res);

      // 关闭加载提示

      if (res.code == 200) {
        // 显示操作成功消息

        emit("update:teacher", true);

        toast("操作成功", "", "success");

        handleDrawerClose();
      } else {
        // 根据实际情况可能还要处理其他响应码的情况
        showMessage("error", "操作失败");
      }
    } catch (error) {
      showMessage("error", "操作失败");
    }
  } else {
    toast("表单验证失败", "", "error");
    // console.log("表单验证失败");
  }
};

//filter里面的函数是判断条件 如果为true就返回当前的选项 如果为false就丢掉当前的选项 用于创建一个新数组
//some 用于检查数组中是否有元素满足指定条件 如果条件为真返回true
// 计算属性：过滤未被选中的班级和课程
const availableClassesForAdd = computed(() => {
  if (selectedTeacher.value.operation === "add") {
    return allClassCourses.value.classes;
  }
  return [];
});

const availableCoursesForAdd = computed(() => {
  if (selectedTeacher.value.operation === "add") {
    return allClassCourses.value.courses;
  }
  return [];
});

// 过滤数据以便删除操作
const classesForDelete = computed(() => {
  if (selectedTeacher.value.operation === "delete") {
    return selectedTeacher.value.classes;
  }
  return [];
});

const coursesForDelete = computed(() => {
  if (selectedTeacher.value.operation === "delete") {
    return selectedTeacher.value.courses;
  }
  return [];
});

watch(
  () => props.visible,
  (newVal) => {
    drawerVisible.value = newVal;
  },
);

watch(
  () => props.teacher,
  (newVal) => {
    selectedTeacher.value = { ...newVal };
  },
  { deep: true },
);

const handleDrawerClose = () => {
  drawerVisible.value = false;
  emit("update:visible", false); // 通知父组件更新状态
};

// 获取所有班级和课程的数据
onMounted(async () => {
  const res = await getAllClassesCourses();
  allClassCourses.value = res.data;
});

watch(drawerVisible, (newVal) => {
  if (newVal) {
    nextTick(() => {
      // 确保 DOM 已更新，此时 formRef 应该已经绑定到表单元素上
      if (formRef.value) {
        formRef.value.validate((valid) => {
          formRef.value.resetFields();
          formRef.value.clearValidate();
        });
      }
    });
  }
});
</script>

<style lang="scss" scoped>
:deep(.el-drawer__footer) {
  margin-right: 60px;
  margin-bottom: 20px;
}
</style>
