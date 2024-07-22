<template>
    <div class="avatao">
        <div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
</script>

<style scoped>
.avatao {
    display: flex;
}

.avatao>div {
    flex: 1;
    text-align: center;
}

.avatao>div:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
}
</style>