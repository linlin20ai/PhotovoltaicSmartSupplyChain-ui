<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header-content">
          <el-button type="primary" @click="userLogout">Logout</el-button>
          <atavao />
        </div>
      </el-header>
      <el-container>
        <el-aside class="aside-width">
          <Menu />
          <div class="contact-info">
            管理员联系方式：15280260130@163.com
          </div>
        </el-aside>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="12">
              <Bing />
            </el-col>
            <el-col :span="12">
              <Zhuzhangtu />
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { logout } from '@/net';
import { useRouter } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const router = useRouter();

// Lazy load the components with dynamic import
const Menu = defineAsyncComponent(() => import('@/views/component/zhujian1/Menu.vue'));
const Bing = defineAsyncComponent(() => import('@/views/component/zhujian1/Bing.vue'));
const Zhuzhangtu = defineAsyncComponent(() => import('@/views/component/zhujian1/zhuzhuangtu.vue'));
const atavao = defineAsyncComponent(() => import('@/views/component/atavao.vue'));

async function userLogout() {
  try {
    await logout();
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
</script>

<style scoped>
.common-layout .el-header {
  background-color: var(--el-color-primary-dark);
  color: var(--el-text-color-primary);
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.common-layout .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  width: 200px;
  height: 100vh;
  overflow-y: auto;
}

.contact-info {
  padding: 20px;
  font-size: 14px;
}

.common-layout .el-main {
  padding: 20px;
}

.common-layout .el-menu {
  border-right: none;
}
</style>
