<template>
  <el-form :model="orderForm" :rules="rules" ref="orderFormRef" label-width="120px">
    <el-form-item label="产品" prop="item">
      <el-input v-model="orderForm.item"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="quantity">
      <el-input-number v-model="orderForm.quantity" :min="1"></el-input-number>
    </el-form-item>
    <el-form-item label="单价" prop="pricePerUnit">
      <el-input v-model="orderForm.pricePerUnit"></el-input>
    </el-form-item>
    <el-form-item label="地点" prop="location">
      <el-input v-model="orderForm.location"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="orderForm.status"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref } from 'vue';
import { post } from '@/net';
import { ElMessage } from 'element-plus';

export default {
  name: 'OrderForm',
  setup() {
    const orderForm = ref({
      item: '',
      quantity: 1,
      pricePerUnit: '',
      location: '',
      status: ''
    });

    const rules = ref({
      item: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
      quantity: [{ required: true, type: 'number', message: '请输入数量', trigger: 'blur' }],
      pricePerUnit: [{ required: true, message: '请输入单价', trigger: 'blur' }],
      location: [{ required: true, message: '请输入地点', trigger: 'blur' }],
      status: [{ required: true, message: '请输入状态', trigger: 'blur' }]
    });

    const orderFormRef = ref(null);

    const submitOrder = () => {
      const { item, quantity, pricePerUnit, location, status } = orderForm.value;
      post('/preOrder/creatPreOrder', {
        item,
        quantity,
        pricePerUnit,
        location,
        status
      },(res)=>{
        if(res){
          ElMessage.success('创建预订单成功');
          orderForm.value = {
            item: '',
            quantity: 1,
            pricePerUnit: '',
            location: '',
            status: ''
          };
          orderFormRef.value.resetFields();
        }else{
          ElMessage.error('创建预订单失败');
        }
      })

    };

    const submitForm = () => {
      orderFormRef.value.validate((valid) => {
        if (valid) {
          submitOrder();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };

    const resetForm = () => {
      orderFormRef.value.resetFields();
    };

    return {
      orderForm,
      rules,
      orderFormRef,
      submitForm,
      resetForm
    };
  }
};
</script>

<style scoped>
.el-form {
  max-width: 600px;
  margin: 50px auto;
}
</style>
