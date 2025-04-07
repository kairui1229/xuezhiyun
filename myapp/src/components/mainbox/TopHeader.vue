<template>
  <el-header>
    <div>
      智学数据分析系统
    </div>
    <div>
      <span  style="line-height: 40px;">欢迎{{username}}回来</span>
      <!-- @command="handleCommand" -->
      <el-dropdown>
    <span> <el-avatar :size="40" src="https://nicedprk.com/kindeditor/attached/image/20160922/20160922155465976597.jpg" /></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>{{ roleName }}</el-dropdown-item>
        <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/useUserStore';
import { useRouterStore } from '../../store/useRouterStore';
const router = useRouter()
const { changeUser,user:{role:{roleName},username} } = useUserStore()
const { changeRouter } = useRouterStore()

const handleExit = () => {
  //清空user
  changeUser({})
  //isGetterRouter为false
  changeRouter(false)
  //跳转到登录页
  router.push('/login')
}
</script>
<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0d47a1;
  color: #fff;
}
</style>