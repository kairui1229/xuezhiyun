<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column label="角色名称" width="180" >
      <template #default="scope">
        <div>{{ scope.row.role.roleName }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column label="操作">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-button round type="primary" @click="handleUpdate(scope.row)" :disabled="scope.row.default">
              更新</el-button>
            <el-popconfirm title="你确定要删除吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row)"
            >
    <template #reference>
      <el-button round type="danger" :disabled="scope.row.default">删除</el-button>
    </template>
  </el-popconfirm>
          </div>
        </template>
      </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    title="添加用户"
  >
  <el-form 
      :model="addForm" 
      status-icon
      label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"/>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select
      v-model="addForm.role"
      placeholder="请选择角色"
      size="large"
      style="width: 100%"
    >
      <el-option
        v-for="item in roleList"
        :key="item._id"
        :label="item.roleName"
        :value="item._id"
      />
    </el-select>
        </el-form-item>
   </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddConfirm()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogUpdateVisible"
    title="更新用户"
  >
  <el-form 
      :model="updateForm" 
      status-icon
      label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="updateForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="updateForm.password" type="password"/>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select
      v-model="updateForm.role"
      placeholder="请选择角色"
      size="large"
      style="width: 100%"
    >
      <el-option
        v-for="item in roleList"
        :key="item._id"
        :label="item.roleName"
        :value="item._id"
      />
    </el-select>
        </el-form-item>
   </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdateConfirm()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>
<script setup>
import { ref,onMounted, reactive } from 'vue';
import axios from 'axios';
const tableData = ref([])
const roleList = ref([])
//添加对话框
const dialogVisible = ref(false)
const addForm = reactive({
   username:'',
   password:'',
   role:''
})
//更新对话框
const dialogUpdateVisible = ref(false)
const updateForm = reactive({
   username:'',
   password:'',
   role:''
})
const currentItem = ref({})

onMounted(()=>{
  getList()
  getRoleList()
})
const getList = async()=>{
  const res = await axios.get('/adminapi/users')
  tableData.value = res.data
}
const getRoleList = async () => {
   var res = await axios.get('/adminapi/roles')
   roleList.value = res.data
}
const handleAddConfirm = async ()=>{
  dialogVisible.value = false
  //添加接口
  await axios.post('/adminapi/users',addForm)
  //获取列表
  await getList()
  //清空表单
  addForm.username = '',
  addForm.password = '',
  addForm.role = ''
 }
 const handleUpdate = (item)=>{
   dialogUpdateVisible.value = true
   updateForm.username = item.username
   updateForm.password = item.password
   updateForm.role = item.role._id
   currentItem.value = item
 }
 const handleUpdateConfirm = async () => {
   dialogUpdateVisible.value = false
   await axios.put(`/adminapi/users/${currentItem.value._id}`,updateForm)

   await getList()
 }
 const handleDelete = async (item)=>{
   await axios.delete(`/adminapi/users/${item._id}`)
   await getList()
 }
</script>