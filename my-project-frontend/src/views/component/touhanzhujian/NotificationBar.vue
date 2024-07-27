<template>
    <div class="notification-bar">
      <el-alert
        v-for="notification in notifications"
        :key="notification.id"
        :title="notification.title"
        type="info"
        show-icon
        class="notification"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const notifications = ref([
    { id: 1, title: 'System maintenance scheduled for 12:00 AM.' },
    { id: 2, title: 'New feature release on Friday.' },
    { id: 3, title: 'Database backup completed successfully.' }
  ]);
  </script>
  
  <style scoped>
  .notification-bar {
    display: flex;
    flex-direction: column;
  }
  
  .notification {
    margin-bottom: 10px;
  }
  </style>
  