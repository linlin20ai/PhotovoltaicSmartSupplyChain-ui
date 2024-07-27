<template>
  <div class="tac">
    <el-row>
      <el-col :span="24" style="width: 100%;">
        <h5 class="mb-2">光伏供应链管理系统</h5>
        <el-button link @click="tozhuye">返回首页</el-button>
        <div class="el-menu-vertical-demo">
          <el-menu :default-active="activeIndex" @open="handleOpen" @close="handleClose" :collapse="isCollapsed">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <Location />
                </el-icon>
                <span>仓库管理</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <Location />
                </el-icon>
                <span>市场交易</span>
              </template>
              <el-menu-item-group title="交易中心">
                <el-menu-item index="2-1" @click="tojiaoyishichang">交易市场</el-menu-item>
                <el-menu-item index="2-2" @click="tojiaoyidingdan">订单列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="订单中心">
                <el-menu-item index="2-3" @click="toCreatePreOrder">创建订单</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="2-4">
                <template #title>相关交易</template>
                <el-menu-item index="2-4-1">订单</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3">
              <el-icon>
                <Setting />
              </el-icon>
              <span>账号设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import router from '../../../router'

const isCollapsed = ref(false);
const activeIndex = ref('');




const tozhuye = () => {
  router.push('/');
  // 重置 activeIndex 和 isCollapsed
  activeIndex.value = '';
  isCollapsed.value = false;
}

const tojiaoyishichang = () => {
  console.log("tojiaoyishichang");
  try {
    router.push('/jiaoyishichang');
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

const tojiaoyidingdan = () => {
  router.push('/jiaoyidingdan');
}


const toCreatePreOrder = () =>{
  console.log("toCreatePreOrder");
  router.push('/createpreorder');

}
</script>

<style scoped>
.tac {
  text-align: center;
}

.mb-2 {
  margin-bottom: 16px;
}

.el-menu-vertical-demo {
  width: 100%;
}
</style>
