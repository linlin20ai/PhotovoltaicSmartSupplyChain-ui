<template>
    <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
        <div style="flex: 1">
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="(item, index) in images" :key="index">
                  <img :src="item" alt="carousel image" style="width: 100%; height: 100%; object-fit: cover;" />
               </el-carousel-item>
            </el-carousel>
        </div>
        <div class="welcome-title">
            <div style="font-size: 70px;font-weight: bold">欢迎来到光伏产业供应链管理平台</div>
            <div style="margin-top: 50px">在这里你可以进行光伏设备的购买、租赁、管理、售后等一系列操作。</div>
            <div style="margin-top: 50px">在这里你可以享受到最新的光伏设备信息、价格、购买指导、租赁服务等。</div>
        </div>
        <div class="right-card">
            <router-view v-slot="{ Component }">
                <transition name="el-fade-in-linear" mode="out-in">
                    <component :is="Component" style="height: 100%"/>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>
import image1 from '@/assets/images/0ae49efd5835eea2f276dbd15a1596e.png';
import image2 from '@/assets/images/b65a8358cbb719d15d7d3993896729e.png';
import image3 from '@/assets/images/df3155d945ea8ef4c2bf479f16855e5.png';

const images = [image1, image2, image3];

</script>

<style scoped>
.right-card {
  width: 400px;
  z-index: 1;
  background-color: var(--el-bg-color);
}

.welcome-title {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: white;
    text-shadow: 0 0 10px black;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
