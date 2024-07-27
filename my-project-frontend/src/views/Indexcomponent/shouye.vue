<template>
  <div class="home-page">
    <h1 class="title">这是首页</h1>
    <el-row :gutter="60">
      <el-col :span="12">
        <div class="card">
          <h2 class="subtitle">仓库实时数据</h2>
          <Bing />
        </div>
      </el-col>
      <!-- 将来可以在此处添加其他组件 -->
      <!-- <el-col :span="6"><Zhuzhangtu /></el-col> -->
      <el-col :span="12">
        <div class="card">
          <h2 class="subtitle">仓库分配评分</h2>
          <Yibiaopan />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

// 显式导入每个组件
const Bing = defineAsyncComponent(() => 
  import('@/views/component/zhujian1/Bing.vue').catch(err => {
    console.error('加载Bing组件失败', err);
    return { default: () => '加载失败' };
  })
);

const Zhuzhangtu = defineAsyncComponent(() => 
  import('@/views/component/zhujian1/zhuzhuangtu.vue').catch(err => {
    console.error('加载Zhuzhangtu组件失败', err);
    return { default: () => '加载失败' };
  })
);

const Yibiaopan = defineAsyncComponent(() => 
  import('@/views/component/zhujian1/yibiaopan.vue').catch(err => {
    console.error('加载Yibiaopan组件失败', err);
    return { default: () => '加载失败' };
  })
);

export default {
  components: {
    Bing,
    Zhuzhangtu,
    Yibiaopan
  }
};
</script>

<style scoped>
.home-page {
  padding: 20px;
  background-color: #f5f5f5;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.subtitle {
  margin-bottom: 10px;
  font-size: 18px;
  color: #666;
}

.card {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .el-row {
    flex-direction: column;
  }

  .el-col {
    width: 100% !important;
    margin-bottom: 20px;
  }
}
</style>
