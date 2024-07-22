<template>
    <v-chart ref="mychart1" class="chart" :option="optionBar"></v-chart>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const mychart1 = ref(null);
const optionBar = ref(null);

// 定义数据
const data = {
    chartName: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    chartRows: [5, 20, 36, 10, 10, 20],
    colorList: ['#5470C6', '#91CC75', '#EE6666', '#73C0DE', '#FAC858', '#6E7074']
};

// 渲染柱状图选项
const renderLineOptions = () => {
    return {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            data: data.chartName,
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: 15 // 字体大小
                },
                rotate: 30 // 设置x轴标签旋转角度
            }
        },
        yAxis: {
            name: '工时/h',
            nameLocation: 'start',
            axisLabel: {
                show: true,
                fontSize: 16
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 1, // 线的大小
                    type: 'solid' // Y轴线的类型
                }
            }
        },
        series: [
            {
                data: data.chartRows,
                type: 'bar',
                barWidth: '20%',
                itemStyle: {
                    color: function (params) {
                        return data.colorList[params.dataIndex]
                    },
                    offset: 6 // 偏移量
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 14,
                    formatter: (params) => {
                        const reData = (params.data || 0).toString().replace(/(\d)(?=(?:\d{3}) + $)/g, '$1,')
                        return reData
                    }
                }
            }
        ]
    }
};

onMounted(() => {
    // 设置图表选项
    optionBar.value = renderLineOptions();
    // 初始化图表
    mychart1.value.setOption(optionBar.value);
});
</script>

<style scoped>
.chart {
    width: 100%;
    height: 400px;
    /* 可以根据需要调整高度 */
}
</style>