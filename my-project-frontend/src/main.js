import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Echarts from "vue-echarts"
import * as echarts from "echarts"


// 设置Axios的默认基础URL
axios.defaults.baseURL = 'http://localhost:8080'

const app = createApp(App)

// 全局注册Echarts组件
app.component("v-chart", Echarts)

// 在Vue实例上全局注册Echarts
app.config.globalProperties.$echarts = echarts

// 使用ElementPlus
app.use(ElementPlus)

// 使用路由
app.use(router)

// 挂载应用到#app元素
app.mount('#app')
