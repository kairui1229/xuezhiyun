<template>
  <div>
    <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" :options="options">
    </vue-particles>
    <div class="formContainer">
      <h3>学智云分析平台</h3>
      <el-form 
      ref="loginFormRef" 
      style="max-width: 600px" 
      :model="loginForm" 
      :rules="rules" 
      label-width="auto"
      class="demo-ruleForm" 
      status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useUserStore } from '../store/useUserStore'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import options from '../util/config'
import axios from 'axios'
const particlesLoaded = async container => {
  console.log("Particles container loaded", container);
};

const router = useRouter()
const { changeUser } = useUserStore()
const loginFormRef = ref(null)
const loginForm = reactive({
  username: '',
  password: ""
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})
//登录校验方法
const submitForm = async (formEl) => {
  if (!formEl) return;

  formEl.validate()
    .then(async () => {
      try {
        const res = await axios.post('/adminapi/users/login', loginForm);
        let { ActionType, data } = res.data;
        
        if (ActionType === "OK") {
          changeUser(data);
          router.push('/index');
        } else {
          ElMessage.error('用户名或密码错误'); // 账号或密码错误时弹窗
        }
      } catch (error) {
        console.error("请求错误:", error);
        ElMessage.error('用户名或密码错误');
      }
    })
    .catch(() => {
      ElMessage.error('请输入用户名和密码'); // 校验不通过时弹窗
    });
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #fff, $alpha: 0.2);
  color: white;
  text-align: center;
  border-radius: 10px;
  padding: 20px;

  h3 {
    font-size: 30px;
  }

  :deep(.el-form-item__label) {
    color: white;
  }
}
.demo-ruleForm {
  margin-top: 50px;
}
</style>