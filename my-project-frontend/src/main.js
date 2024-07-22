import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Echarts from "vue-echarts"
import * as echarts from "echarts"


/* import 'element-plus/theme-chalk/dark/css-vars.css'  */

axios.defaults.baseURL = 'http://localhost:8080'

const app = createApp(App)
app.component("v-chart", Echarts)
app.config.globalProperties.$echarts = echarts


app.use(ElementPlus)
app.use(router)

app.mount('#app')
