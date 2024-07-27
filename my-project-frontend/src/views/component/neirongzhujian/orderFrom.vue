<template>
    <el-form :model="form">
      <el-form-item label="订单ID">
        <el-input v-model="form.orderId"></el-input>
      </el-form-item>
      <el-form-item label="买家ID">
        <el-input v-model="form.buyerId"></el-input>
      </el-form-item>
      <el-form-item label="卖家ID">
        <el-input v-model="form.sellerId"></el-input>
      </el-form-item>
      <el-form-item label="商品">
        <el-input v-model="form.item"></el-input>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="form.quantity"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="form.pricePerUnit"></el-input>
      </el-form-item>
      <el-form-item label="总金额">
        <el-input v-model="form.totalAmount"></el-input>
      </el-form-item>
      <el-form-item label="交易日期">
        <el-input v-model="form.transactionDate"></el-input>
      </el-form-item>
      <el-form-item label="地点">
        <el-input v-model="form.location"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="form.status"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const form = ref({
    orderId: '',
    buyerId: '',
    sellerId: '',
    item: '',
    quantity: '',
    pricePerUnit: '',
    totalAmount: '',
    transactionDate: '',
    location: '',
    status: ''
  });
  
  const submitForm = () => {
    console.log('Form submitted', form.value);
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  