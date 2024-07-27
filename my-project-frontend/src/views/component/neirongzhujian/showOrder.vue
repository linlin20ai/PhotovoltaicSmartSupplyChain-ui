<template>
  <div class="table-container">
    <el-table :data="pagedOrders" height="calc(100% - 60px)" style="width: 100%;">
      <el-table-column prop="orderId" label="订单编号" />
      <el-table-column prop="buyerId" label="买家ID" />
      <el-table-column prop="sellerId" label="卖家ID" />
      <el-table-column prop="item" label="商品" />
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="pricePerUnit" label="单价" />
      <el-table-column prop="totalAmount" label="总金额" />
      <el-table-column prop="transactionDate" label="交易日期" />
      <el-table-column prop="location" label="地点" />
      <el-table-column prop="status" label="状态" />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="orders.length"
      :page-size="5"
      @current-change="handlePageChange"
      style="margin-top: 20px;"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { get } from '@/net';

const orders = ref([]);
const currentPage = ref(1);
const pagedOrders = ref([]);

onMounted(() => {
  get('/order/list', (response) => {
    if (response) {
      orders.value = response;
      updatePagedOrders();
    } else {
      console.error('获取数据失败或数据格式不正确');
    }
  });
});

function handlePageChange(page: number) {
  currentPage.value = page;
  updatePagedOrders();
}

function updatePagedOrders() {
  if (orders.value) {
    const start = (currentPage.value - 1) * 5;
    const end = start + 5;
    pagedOrders.value = orders.value.slice(start, end);
  }
}
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px); /* 调整为合适的高度，可以根据实际情况调整 */
  width: 100%;
}

.el-table {
  flex: 1;
  overflow: auto;
}
</style>
