import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()], // ✅ 正确引入 Vue 插件
  server: {
    allowedHosts: ['ringtail-alive-intensely.ngrok-free.app'],
    proxy: {
      '/adminapi': {
        target: 'http://120.26.222.203:3000',
        changeOrigin: true,
        //secure: false
      }
    }
  }
});
