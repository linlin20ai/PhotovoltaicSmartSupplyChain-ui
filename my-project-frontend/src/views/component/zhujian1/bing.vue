<template>
  <v-chart ref="mychart1" class="chart" :option="optionPie"></v-chart>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { get } from '@/net';
import VChart from 'vue-echarts';
import 'echarts';

const data = ref({
  pieNumber: [],
  pieTitle: []
});

const renderPieOptions = () => {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} 个,占比： ({d}%)"
    },
    legend: {
      orient: "vertical",
      right: '2%',
      top: '20%',
      data: data.value.pieTitle // 渲染的数据需要与 series 里面渲染的数据中的 name 保持一致
    },
    series: [
      {
        name: "物料数量分布",
        type: "pie",
        radius: "70%",
        center: ["45%", "55%"],
        data: data.value.pieNumber, // 渲染的数据
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        label: {
          show: true, // 显示标签
          formatter: '{b}个数占比：{d}%'
        }
      }
    ]
  };
};


const mychart1 = ref(null);
const optionPie = ref(renderPieOptions());

const fetchDataAndUpdateChart = () => {
  get('/warehouses/warehouse', (response) => {
    //打印到控制台
    console.log(response);
    if (response && Array.isArray(response)) {
      const materialCounts = {};
      response.forEach(item => {
        if (materialCounts[item.materIalName]) {
          materialCounts[item.materIalName] += item.quantity;
        } else {
          materialCounts[item.materIalName] = item.quantity;
        }
      });

      data.value.pieNumber = Object.keys(materialCounts).map(name => ({
        value: materialCounts[name],
        name: name
      }));
      data.value.pieTitle = Object.keys(materialCounts);

      // 更新饼图的选项
      optionPie.value = renderPieOptions();

      // 设置新的选项到图表
      if (mychart1.value) {
        mychart1.value.setOption(optionPie.value);
      }
    } else {
      console.warn('请求失败或返回数据格式不正确');
    }
  }, (message, status, url) => {
    console.warn(`请求失败，地址: ${url}, 状态码: ${status}, 信息: ${message}`);
  });
};

let intervalId;

onMounted(() => {
  fetchDataAndUpdateChart();
  intervalId = setInterval(fetchDataAndUpdateChart, 3600000); // 每1个小时更新一次

  // 确保 mychart1 实例被正确初始化
  if (mychart1.value) {
    mychart1.value.setOption(optionPie.value);
  }
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
