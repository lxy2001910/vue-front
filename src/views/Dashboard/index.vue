<template>
  <div class="dashcon">
    <div class="message">
      <div class="background" :style="{ backgroundImage: 'url(' + user.avatar + ')' }"></div>
      <div class="content">
        <div class="avatar">
          <el-image style="width: 90px; height: 90px; border-radius: 50%" :src="user.avatar" class="image" />
        </div>
        <div class="tip">
          <div class="shang">
            {{ judgeTime() + user.uname }}。{{ one }}
            <span> </span>
          </div>
          <div class="xia">
            <span>
              本项目由 Vite+ Vue3+ Element Plus+ Pinia+ Axios+ Mock.js+ ECharts+
              Vue-Router 等技术栈构建而成，欢迎使用！
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="teacherup">
        <el-card style="width: 300px">
          <template #header>
            作业发布数：
            <el-tag type="success" style="position: absolute; right: 10px">总数</el-tag>
          </template>
          <!-- <span style="font-size: 30px;">{{ d.num }}</span> -->
          <animated-number :finalNumber="d.num" style="font-size: 30px" />
        </el-card>
      </div>
      <div class="studentup">
        <el-card style="width: 300px">
          <template #header>
            作业提交数：
            <el-tag type="success" style="position: absolute; right: 10px">Tag 1</el-tag>
          </template>
          <!-- <span style="font-size: 30px;">{{ d.num }}</span> -->
          <animated-number :finalNumber="d.num" style="font-size: 30px" />
        </el-card>
      </div>
      <div class="noup">
        <el-card style="width: 300px">
          <template #header>
            作业未提交数：
            <el-tag type="success" style="position: absolute; right: 10px">Tag 1</el-tag>
          </template>
          <!-- <span style="font-size: 30px;">{{ d.num }}</span> -->
          <animated-number :finalNumber="d.num" style="font-size: 30px" />
        </el-card>
      </div>
    </div>
    <div class="initChart">
      <el-row style="padding-top: 40px">
        <el-col :span="8" class="piecol">
          <el-card shadow="hover" class="card">
            <template #header>
              作业提交情况

            </template>
            <template #default>
              <div ref="pie" class="pie" style="height: 250px"></div>
            </template>
            <template #footer> 今天你交作业了吗？😀 </template>
          </el-card>
        </el-col>
        <el-col :span="16" class="barcol">
          <el-card shadow="hover" class="card">
            <template #header>
              作业提交情况
              <span class="sun">🌞️</span>
              <span class="cloud">☁️☁️☁️</span>
            </template>
            <template #default>
              <div ref="bar" class="bar" style="height: 250px"></div>
            </template>
            <template #footer>
              今天你内卷了吗？🐕
              <span class="person">🚴</span>
              <span class="car">🚌</span>

              <span class="tree">🌳🌳🌳🌳🌳</span>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import AnimatedNumber from "@/components/AnimatedNumber.vue";
import { useUserStore } from "@/store/user";
import axios from "axios";
import { onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils/debounce";
const { user } = useUserStore();


const judgeTime = () => {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 6) {
    return "凌晨好!";
  } else if (hour < 9) {
    return "早上好!";
  } else if (hour < 12) {
    return "上午好!";
  } else if (hour < 14) {
    return "中午好!";
  } else if (hour < 17) {
    return "下午好!";
  } else if (hour < 19) {
    return "傍晚好!";
  } else if (hour < 22) {
    return "晚上好!";
  } else {
    return "夜里好!";
  }
};
const one = ref("");
const oneSay = async () => {
  return await axios.get("https://v1.hitokoto.cn/?/c=d");
};

const d = reactive({
  num: 999,
});

// const reSize = (...charts) => {
//   charts.forEach((chart) => {
//     chart.resize();
//   })
// }

// debounce(reSize, 1000);

const resizeCharts = debounce(() => {
  chart.resize();
  chart2.resize();
  console.log('resizeCharts function executed'); // 在控制台输出，观察防抖效果
}, 300);


const pie = ref(null);
const bar = ref(null);
let chart, chart2;

onMounted(async () => {
  oneSay().then((res) => {
    one.value = res.data.hitokoto;
  });

  chart = echarts.init(pie.value);
  const option = {
    animation: true,
    tooltip: {
      // trigger: 'item'
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  chart.setOption(option);

  chart2 = echarts.init(bar.value);
  const option2 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    series: [
      {
        name: "直接访问",
        type: "bar",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "邮件营销",
        type: "bar",
        stack: "广告",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "联盟广告",
        type: "bar",
        stack: "广告",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "视频广告",
        type: "bar",
        stack: "广告",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "搜索引擎",
        type: "bar",
        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        markLine: {
          lineStyle: {
            type: "dashed",
          },
          data: [[{ type: "min" }, { type: "max" }]],
        },
      },
    ],
  };
  chart2.setOption(option2);


  window.addEventListener('resize', resizeCharts);

});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCharts);
  
  // 释放图表资源
  chart.dispose();
  chart2.dispose();

});





</script>

<style lang="scss" scoped>
.dashcon {
  display: flex;
  justify-content: center;
  flex-direction: column;

  .message {
    width: 100%;
    height: 100px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    border-radius: 8px;

    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-size: cover;
      background-position: center;
      filter: blur(8px); // 应用模糊效果
      z-index: 1;
    }

    .content {
      position: relative; // 确保内容在背景之上
      z-index: 2;
      display: flex;
      justify-content: start;
      align-items: center;
      height: 100%;

      .avatar {
        width: 90px; // 修正宽度以匹配图像的实际大小
        height: 90px; // 添加高度以匹配宽度，确保圆形
        margin-left: 40px;
        overflow: hidden; // 确保图片放大时超出部分不会显示
        border-radius: 50%; // 确保容器是圆形的

        .image {
          transition: all 0.3s ease-in-out;
          width: 100%; // 图像宽度填满容器
          height: 100%; // 图像高度填满容器

          &:hover {
            transform: scale(1.1); // 仅在鼠标悬停时放大图像
          }
        }
      }

      .tip {
        margin-left: 20px;
        color: white;
        font-weight: bolder;



        .xia {
          text-align: right;
          width: 100%;
          margin-left: 100px;

          span {
            color: rgb(224, 220, 214);
            font-weight: lighter;
          }
        }
      }
    }
  }

  .info {
    display: flex;
    justify-content: space-around;

    margin-top: 20px;

    .teacherup {
      position: relative;

      height: 100px;
    }

    .studentup {
      position: relative;
      height: 100px;
    }

    .noup {
      position: relative;
      height: 100px;
    }
  }

  .initChart {

    // padding: 40px;
    // // margin-top: 40px;
    .piecol {
      padding: 40px;

      .card {
        position: relative;

        height: 400px;

        .pie {

          height: 350px;

        }
      }
    }

    .barcol {

      padding: 40px;

      .card {
        position: relative;
        height: 400px;

        :deep(.el-card__footer) {
          background-color: rgb(188, 153, 220);
        }

        :deep(.el-card__header) {
          background-color: antiquewhite;
        }


        .sun {
          position: absolute;
          top: 0;
          right: 35px;
          font-size: 25px;

        }

        .cloud {
          position: absolute;
          right: 60px;
          top: 8px;
          font-size: 25px;
          animation: moveAndFade 10s linear infinite; // 应用动画，调整时间以匹配所需速度
        }

        .bar {
          height: 350px; // 将这个值调整为所需的高度
        }


        .person {
          font-size: 30px;
          position: absolute;
          z-index: 2;
          bottom: 1px; // 根据需要调整
          right: 20px; // 假设car的宽度大约为20px，这将确保person出现在car前面
          animation: moveLeft 20s linear infinite; // 应用动画，调整时间以匹配所需速度
        }

        .car {
          font-size: 30px;

          position: absolute;
          right: 0; // car开始于最右边
          z-index: 2;
          bottom: 1px;

          animation: moveLeft 17s linear infinite; // 应用动画，调整时间以匹配所需速度        

          &::after {
            content: "💨";
            position: absolute;
            right: -30px;
            font-size: 20px;
            top: 2px;
            animation: fadeInOut 2s linear infinite; // 应用动画，调整时间以匹配所需速度

          }

        }


        .tree {
          position: absolute;
          z-index: 1;
          bottom: 0;
          left: 200px;
          font-size: 40px;
        }
      }
    }


  }
}



@keyframes moveLeft {

  0% {
    right: 0; // 动画开始时，person和car移动到屏幕右侧外
  }

  100% {
    right: 110%; // 动画结束时，person和car移动到屏幕左侧外，然后重新开始
  }
}



@keyframes fadeInOut {

  0%,
  100% {
    opacity: 0.2; // 开始和结束时较不可见
  }

  50% {
    opacity: 1; // 中间时完全可见
  }
}


@keyframes moveAndFade {

  0% {
    transform: translate(-8px);
    opacity: 0.2;
  }

  50% {
    transform: translate(40px);
    opacity: 1;
  }

  100% {
    transform: translate(-8px);
    opacity: 0.2;
  }

}
</style>
