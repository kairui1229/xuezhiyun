import { createApp } from 'vue'
//导入路由
import router from './router'
//导入pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//导入样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//粒子效果
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
//可视化大屏
import DataVVue3 from '@kjgl77/datav-vue3'
//配置axios拦截器
import "./util/axios.config"

import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
.use(router)
.use(pinia)
.use(ElementPlus)
.use(Particles, {
  init: async engine => {
    await loadSlim(engine)
  },
})
.use(DataVVue3)
.mount('#app')
