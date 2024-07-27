<template>
    <el-row :gutter="16">
        <el-col :span="8">
            <div class="statistic-card">
                <el-statistic :value="totalAmount">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            交易总金额
                            <el-tooltip effect="dark" content="总金额以人民币（元）显示" placement="top">
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <div class="footer-item">
                        <span>与昨日相比</span>
                        <span class="green">
                            24%
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                        </span>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ArrowRight, CaretBottom, CaretTop, Warning } from '@element-plus/icons-vue';
import { get } from '@/net';
      


const totalAmount = ref(0);

const getOrderVo = () => {
    get('/order/sum', (response) => {
        if (response ) {
            totalAmount.value = response.sum;
        }
    }, (error) => {
        console.error('获取交易总金额失败', error);
    });
};

onMounted(() => {
    getOrderVo();
});
</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
}

.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}
</style>
