<template>
  <div class="allocation">
    <div class="search-input">
      <el-input
        v-model="searchQuery"
        placeholder="请输入搜索关键词..."
        clearable
      />
    </div>
    <el-table
      class="eltable"
      :data="displayedData"
      align="center"
      border
      v-loading="loading"
      element-loading-text="Loading..."
    >
      <el-table-column
        prop="teacherId"
        label="ID"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="teacherName"
        label="教师名称"
        align="center"
        width="200"
      ></el-table-column>
      <!-- 班级列，合并所有班级信息 -->
      <el-table-column label="班级" align="center">
        <template #default="{ row }">
          <el-tag
            v-if="row.classes.length > 0"
            v-for="item in row.classes"
            :key="item.classId"
            class="hasinfo"
          >
            {{ item.className }}
          </el-tag>
          <el-tag type="danger" v-else>无</el-tag>
        </template>
      </el-table-column>
      <!-- 课程列，合并所有课程信息 -->
      <el-table-column label="课程" align="center" width="300">
        <template #default="{ row }">
          <el-tag
            v-if="row.courses.length > 0"
            v-for="item in row.courses"
            :key="item.courseId"
            style="margin-left: 4px"
            class="hasinfo"
          >
            {{ item.courseName }}
          </el-tag>
          <el-tag type="danger" v-else>无</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="{ row }">
          <el-button type="primary" @click="addAllocation(row)">添加</el-button>
          <el-button type="danger" @click="deleteAllocation(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 抽屉内容 -->

    <TeacherEditDrawer
      :visible="drawerVisible"
      :teacher="selectedTeacher"
      @update:teacher="handleUpdateNeeded"
      @update:visible="handleDrawerVisibility"
    />

    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalItems"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import TeacherEditDrawer from "./TeacherEditDrawer.vue";
import { getAllocationTeach } from "@/api/admin";

//表格加载状态
const loading = ref(true);
// 搜索关键词
const searchQuery = ref("");
// 教师数据
const teachers = ref([]);
// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);

// 所有班级和课程数据
// const allClassCourses = ref([])

// 抽屉相关
const drawerVisible = ref(false);
const selectedTeacher = ref({
  selectClasses: [],
  selectCourses: [],
});

// 在您的场景中，selectedTeacher 对象是用来在抽屉组件中展示和编辑一个教师的详细信息的。当您点击编辑按钮时，这个对象会被填充为当前行教师的信息。这是因为您希望在编辑表单中包含额外的功能，比如让用户能够为教师选择多个班级和课程。因此，selectedTeacher 对象需要有 selectClasses 和 selectCourses 属性来存储这些额外的信息。
// 这里的 selectClasses: [] 和 selectCourses: [] 是初始化这些属性为空数组的步骤。它们确保了当抽屉组件打开时，相关的 <el-select> 组件有明确的初始值。这对于 Vue 的数据绑定机制是必要的，因为它允许 Vue 跟踪这些值的变化，并在用户进行选择时更新视图。如果不初始化这些属性，您可能会遇到一些问题，如：
// 数据绑定失败：如果 selectedTeacher 对象没有 selectClasses 和 selectCourses 属性，那么与这些属性绑定的 <el-select> 组件将无法正常工作，因为它们试图绑定一个不存在的属性。
// 无法收集选择的数据：当用户在表单中选择班级和课程时，您需要一个地方来存储这些选择。selectClasses 和 selectCourses 正是为此目的而设。
// 当您点击“确定”按钮提交表单时，可以从 selectedTeacher.selectClasses 和 selectedTeacher.selectCourses 中获取到用户所选的班级和课程的 ID 数组。然后，您可以使用这些数据进行进一步的操作，如发送请求到服务器。
// 简而言之，selectedTeacher 对象中的 selectClasses: [] 和 selectCourses: [] 初始化是为了确保表单控件绑定正确，并且能够存储和管理用户的选择。这是实现动态表单和复杂数据绑定场景的常见做法。
// 点击编辑按钮的处理函数
// const handleEdit = (teacher) => {
//   console.log('选中的教师111:', teacher)
//   selectedTeacher.value = { ...teacher, selectClasses: [], selectCourses: [] } // 确保包含用于表单的属性
//   console.log('选中的教师:', selectedTeacher.value)
//   drawerVisible.value = true
// }
const addAllocation = (teacher) => {
  selectedTeacher.value = { ...teacher, operation: "add" };
  drawerVisible.value = true;
};

const deleteAllocation = (teacher) => {
  selectedTeacher.value = { ...teacher, operation: "delete" };
  drawerVisible.value = true;
};

const handleDrawerVisibility = (visible) => {
  drawerVisible.value = visible;
};

const handleUpdateNeeded = async (needUpdate) => {
  if (needUpdate) {
    const res = await getAllocationTeach();
    teachers.value = res.data.teachers;
    // console.log("教师数据:", teachers.value);
    totalItems.value = teachers.value.length; // 初始化总项目数
    loading.value = false;
  }
};

// 获取教师数据
onMounted(async () => {
  const res = await getAllocationTeach();
  teachers.value = res.data.teachers;
  console.log("教师数据:", teachers.value);
  totalItems.value = teachers.value.length; // 初始化总项目数
  loading.value = false;
});

// 根据搜索查询过滤数据
const filteredData = computed(() => {
  if (!searchQuery.value.trim()) return teachers.value;
  const queryLower = searchQuery.value.toLowerCase();

  return teachers.value.filter(
    (teacher) =>
      teacher.teacherName.toLowerCase().includes(queryLower) ||
      teacher.classes.some((classItem) =>
        classItem.className.toLowerCase().includes(queryLower),
      ) ||
      teacher.courses.some((course) =>
        course.courseName.toLowerCase().includes(queryLower),
      ),
  );
});

// 计算当前页面显示的数据，基于过滤后的数据
const displayedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

// 监听页码变化或搜索查询变化以更新分页
watch([currentPage, searchQuery], () => {
  totalItems.value = filteredData.value.length; // 更新总数以适应过滤后的结果
});

// 分页大小变化处理
function handleSizeChange(newSize) {
  pageSize.value = newSize;
  currentPage.value = 1; // 回到第一页
}

// 当前页变化处理
function handleCurrentChange(newPage) {
  currentPage.value = newPage;
}
</script>

<style lang="scss" scoped>
.allocation {
  width: 100%;

  .search-input {
    .el-input {
      width: 300px;
      margin-bottom: 20px;
    }
  }

  .eltable {
    // width: calc(100% - 200px);
    width: 100%;
    min-height: 600px;
    /* 或您希望的任何高度 */

    .hasinfo {
      background-color: #a0cfff;
      margin-left: 4px;
    }
  }

  span {
    color: rgb(193, 40, 40);
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
