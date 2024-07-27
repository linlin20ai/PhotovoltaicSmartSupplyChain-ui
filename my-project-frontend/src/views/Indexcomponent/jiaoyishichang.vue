<template>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '900px', height: '400px' }"></div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="chart-description">
      <p>这是一个展示每月订单数量的折线图。</p>
    </div>
    <div>
      <el-row :gutter="16">
        <el-col :span="24">
          <div class="statistic-card">
            <el-statistic :value="52068521" :precision="0" prefix="￥">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  交易总金额
                  <el-tooltip
                    effect="dark"
                    content="与昨日相比"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>与昨日相比</span>
                <span class="green">
                  24%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { get } from '@/net';
import { ArrowRight, CaretBottom, CaretTop, Warning } from '@element-plus/icons-vue';

const error = ref(null);
let chartInstance = null;
const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

onMounted(() => {
  initChart();
  getChartData();
  setupAutoRefresh();
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  clearAutoRefresh();
});

// 基础配置一下Echarts
function initChart() {
  chartInstance = echarts.init(document.getElementById("myEcharts"), "light");

  // 把配置和数据放这里
  chartInstance.setOption({
    title: {
      text: '市场月订单交易总数（每日更新）',
      left: 'center',
      textStyle: {
        color: '#333',
        fontSize: 24,
      }
    },
    xAxis: {
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        color: '#333'
      }
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderColor: '#333',
      textStyle: {
        color: '#fff'
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0.1)'
        }
      },
      axisLabel: {
        color: '#333'
      }
    },
    series: [
      {
        name: '订单数量',
        data: [],
        type: "line",
        smooth: true,
        lineStyle: {
          color: '#ff5722',
          width: 4
        },
        itemStyle: {
          color: '#ff5722',
          borderWidth: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 87, 34, 0.4)'
            },
            {
              offset: 1,
              color: 'rgba(255, 87, 34, 0)'
            }
          ])
        }
      }
    ],
    backgroundColor: '#ffffff', // 设置图表背景为白色
    animationDuration: 2000
  });
  window.addEventListener('resize', handleResize);
}

function handleResize() {
  if (chartInstance) {
    chartInstance.resize();
  }
}

const getChartData = () => {
  error.value = null;
  get('/order/listorder', (response) => {
    
    if (response) {
      updateChart(response);
    } else {
      error.value = '获取数据失败或数据格式不正确';
      console.error('获取数据失败或数据格式不正确');
    }
  }, (errorResponse) => {
    error.value = '请求失败';
    console.error('请求失败', errorResponse);
  });
};

function updateChart(data) {
  if (chartInstance) {
    chartInstance.setOption({
      series: [
        {
          data: data
        }
      ]
    });
  }
}

// 设置自动刷新
let refreshTimeout;

function setupAutoRefresh() {
  refreshTimeout = setTimeout(() => {
    getChartData();
    setupAutoRefresh(); // 递归调用，确保持续自动刷新
  }, REFRESH_INTERVAL);
}

function clearAutoRefresh() {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }
}
</script>

<style scoped>
.echarts-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.chart-description {
  margin-top: 20px;
  text-align: center;
  color: #333;
}

.chart-description p {
  margin: 5px 0;
}

.statistic-card {
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>