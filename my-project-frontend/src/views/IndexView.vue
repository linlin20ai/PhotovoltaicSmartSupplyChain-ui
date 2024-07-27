<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="header-content">
          <div class="left-section">
            <el-button type="primary" @click="userLogout">Logout</el-button>
            <Atavao />
          </div>
          <div class="right-section">
            <NotificationBar />
            <UserInfo />
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <Menu />
          <div class="contact-info">
            管理员联系方式：15280260130@163.com
          </div>
        </el-aside>
        <el-main class="main">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" class="view-component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { logout } from '@/net';
import router from "@/router";
import { defineAsyncComponent } from 'vue';

// Lazy load the components with dynamic import
const Menu = defineAsyncComponent(() => import('@/views/component/zhujian1/Menu.vue'));
const Atavao = defineAsyncComponent(() => import('@/views/component/touhanzhujian/atavao.vue'));
const UserInfo = defineAsyncComponent(() => import('@/views/component/touhanzhujian/UserInfo.vue'));
const NotificationBar = defineAsyncComponent(() => import('@/views/component/touhanzhujian/NotificationBar.vue'));

function userLogout() {
  logout(() => {
    try {
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  });
}
</script>

<style scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: var(--el-color-primary-dark);
  color: var(--el-text-color-primary);
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  align-items: center;
}

.aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  width: 200px;
  height: calc(100vh - 64px); /* 64px is the height of the header */
  overflow-y: auto;
  padding: 20px;
}

.contact-info {
  margin-top: 20px;
  font-size: 14px;
}

.main {
  padding: 20px;
  overflow-y: auto;
  background: #f5f5f5;
}

.view-component {
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
