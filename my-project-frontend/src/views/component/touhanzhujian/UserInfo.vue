<template>
    <div class="user-info">
        <img :src="user.avatar" alt="User Avatar" class="avatar" @error="handleImageError" />
        <div class="user-details">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-role">{{ user.role }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from '@/net';

const user = ref({
    avatar: 'https://via.placeholder.com/40', // 使用占位符图像作为示例
    name: 'John Doe',
    role: 'Administrator'
});

// 处理图片加载错误
const handleImageError = (event) => {
    event.target.src = 'https://via.placeholder.com/40?text=Avatar+Error'; // 使用默认错误图片
};

const getUserInfo = () => {
    get('/userDto/getUserInfo', (response) => {
        try {
            //打印到控制台
            console.log(response);
            if (response && response.username) {
                user.value = {
                    name: response.username || 'Unknown User',
                    role: response.role === '1' ? 'Administrator' : 'User',
                    avatar: 'https://via.placeholder.com/40' // 在实际使用时可以使用 response.avatar 或其他适当的字段
                };
            } else {
                throw new Error('Invalid response structure');
            }
        }
        catch (error) {
            console.error("Error fetching user info:", error);
            user.value = {
                name: 'Error User',
                role: 'User',
                avatar: 'https://via.placeholder.com/40?text=Error'
            };
        }
    })
};

// 在组件挂载时获取用户信息
import { onMounted } from 'vue';
onMounted(getUserInfo);
</script>

<style scoped>
.user-info {
    display: flex;
    align-items: center;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-details {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-weight: bold;
    color: var(--el-text-color-primary);
}

.user-role {
    font-size: 14px;
    color: var(--el-text-color-secondary);
}
.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 确保填满整个视口 */
    width: 100%; /* 确保宽度也填满整个视口 */
  }
</style>
