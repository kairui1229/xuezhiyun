<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-button round type="primary" @click="handleUpdate(scope.row)">更新</el-button>
            <el-popconfirm title="你确定要删除吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row)"
            >
    <template #reference>
      <el-button round type="danger">删除</el-button>
    </template>
  </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
    v-model="dialogVisible"
    title="更新角色"
  >
  <el-form 
      :model="updateForm" 
      status-icon>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="updateForm.roleName" />
        </el-form-item>
        <el-form-item label="角色权限" prop="rights">
    <el-tree
    style="max-width: 600px"
    :data="rightsList"
    show-checkbox
    node-key="path"
    :props="{ label: 'title' }"
    ref="treeRef"
    :check-strictly="true"
  />
        </el-form-item>
   </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>
<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import axios from 'axios'

//控制对话框显示隐藏
const dialogVisible = ref(false)
//保存更新的item
const currentItem = ref({})
//更新表单
const updateForm = reactive({
    roleName: '',
    rights:[]
})
//获取tree对象
const treeRef = ref(null)

const tableData = ref([]) //保存角色列表
const rightsList = ref([]) //保存权限列表

onMounted(() => {
    getList()
    getRightList()
})
const getList = async () => {
   var res = await axios.get('/adminapi/roles')
   tableData.value = res.data
}
const getRightList = async () => {
   var res = await axios.get('/adminapi/rights')
   rightsList.value = res.data
}
const handleUpdate = (item) => {
   dialogVisible.value = true
   updateForm.roleName = item.roleName
   updateForm.rights = item.rights
   currentItem.value = item
   nextTick(() => {
    treeRef.value.setCheckedKeys(item.rights)
   })
  }
const handleConfirm = async () => {
    dialogVisible.value = false
    await axios.put(`/adminapi/roles/${currentItem.value._id}`,{
      roleName:updateForm.roleName,
      rights:treeRef.value.getCheckedKeys()
    })
    await getList()
 }
const handleDelete = async (item) => {
  await axios.delete(`/adminapi/roles/${item._id}`,)
  
  await getList()
}
</script>
