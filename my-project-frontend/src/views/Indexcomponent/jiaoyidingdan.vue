<template>
  <el-container class="order-page-container">
    <el-main>
      <h1>订单列表</h1>
      <show-order />
    </el-main>
  </el-container>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const showOrder = defineAsyncComponent({
  loader: () => import('@/views/component/neirongzhujian/showOrder.vue'),
  delay: 200, // 增加延迟以优化加载体验
  timeout: 3000, // 设置超时时间以处理加载失败情况
  errorComponent: () => import('@/views/component/errorComponent.vue'), // 引入错误处理组件
  loadingComponent: () => import('@/views/component/loadingComponent.vue') // 引入加载中组件
});
</script>

<style scoped>
.order-page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 调整靠顶部对齐 */
  flex-direction: column;
  height: 100vh; /* 让容器占据整个视口高度 */
}

.el-main {
  width: 100%; /* 调整宽度以使表格占满 */
  padding: 20px; /* 添加内边距以增加空间感 */
  box-sizing: border-box; /* 确保内边距在宽度之内 */
  display: flex;
  flex-direction: column;
}
</style>
