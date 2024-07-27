<template>
    <div class="container">
      <EChartsGLComponent />
      <div class="right-card">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component" class="form-container" />
          </transition>
        </router-view>
      </div>
    </div>
  </template>
  
  <script setup>
  import EChartsGLComponent from './Indexcomponent/EChartsGLComponent.vue';
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  
  .right-card {
    width: 400px;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.8); /* 调整透明度 */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .form-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  </style>
  