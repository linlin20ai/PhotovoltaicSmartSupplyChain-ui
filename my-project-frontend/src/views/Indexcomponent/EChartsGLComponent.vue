<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';

const chartContainer = ref(null);

onMounted(() => {
  initChart();
});

function initChart() {
  const myChart = echarts.init(chartContainer.value);
  const option = {
    backgroundColor: '#000',
    globe: {
      baseTexture: '/assets/world.topo.bathy.200401.jpg',
      heightTexture: '/assets/world.topo.bathy.200401.jpg',
      displacementScale: 0.04,
      shading: 'realistic',
      environment: '/assets/starfield.jpg',
      realisticMaterial: {
        roughness: 0.9
      },
      postEffect: {
        enable: true
      },
      light: {
        main: {
          intensity: 5,
          shadow: true
        },
        ambientCubemap: {
          texture: '/assets/pisa.hdr',
          diffuseIntensity: 0.2
        }
      }
    }
  };

  myChart.setOption(option);
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
