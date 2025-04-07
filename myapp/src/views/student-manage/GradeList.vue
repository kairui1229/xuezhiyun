<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">添加班级</el-button>

    <el-table :data="tableData" style="width: 100">
    <el-table-column label="班级名字" width="180">
      <template #default="scope">
        {{ scope.row.title }}
      </template>
    </el-table-column>
    <el-table-column prop="number" label="班级人数" width="180" />
    <el-table-column label="操作">
        <template #default="scope">
          <div style="display: flex; align-items: center">
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


    <el-dialog v-model="dialogVisible" title="添加班级">
      <el-form :model="addForm" status-icon label-width="80px">
        <el-form-item label="班级名称" prop="title">
          <el-input v-model="addForm.title" />
        </el-form-item>

        <el-form-item label="导入名单" prop="grade">
          <el-upload 
          :auto-upload="false" 
          :on-change="handleChange" 
          style="width: 100%;"
          v-model:file-list="addForm.fileList"
          >
            <el-button class="ml-3" type="primary">
              选择文件
            </el-button>
          </el-upload>
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
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import importExcel from '../../util/importExcel'
import axios from 'axios'

const dialogVisible = ref(false)
const tableData = ref([])

onMounted(()=>{
  getList()
})

const getList = async()=>{
  const res = await axios.get('/adminapi/classes')
  tableData.value = res.data
}
const addForm = reactive({
  title: '',
  list: [],
  fileList: []
})

const handleChange = (file) => {
  // console.log(file);
  addForm.title = file.name.split('.')[0]
  importExcel(file.raw, (data) => {
    // console.log(data);
    addForm.list = data
  })
  // setTimeout(() => {
  //   addForm.fileList = []
  // }, 1000)
}
 const handleAddConfirm = async () => {
   dialogVisible.value = false
   var classobj = await axios.post('/adminapi/classes', {
    title: addForm.title,
    number: addForm.list.length,
  })
   await axios.post('/adminapi/students',{
    list: addForm.list,
    class: classobj.data._id
   })

   getList()

   addForm.title = ''
   addForm.list = []
   addForm.fileList = []
 }
 const handleDelete = async (item) => {
   await axios.delete(`/adminapi/classes/${item._id}`)
   await axios.delete(`/adminapi/students/${item._id}`)
   getList()
 }
</script>