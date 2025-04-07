<template>
  <div>
    <el-upload 
          :auto-upload="false" 
          :on-change="handleChange" 
          style="width: 100%;"
          v-model:file-list="fileList"
          >
            <el-button class="ml-3" type="primary">
              选择就业Excel数据
            </el-button>
          </el-upload>

          <el-table :data="computedTableData" style="width: 100">
    <el-table-column label="学生名" width="430">
      <template #header>
        <el-input v-model="search" size="small" placeholder="请输入公司名字" width="700"/>
      </template>
      <template #default="scope">
        {{ scope.row.title }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
        <template #default="scope">
          <div style="display: flex; align-items: center;">  
            <el-button round type="primary" @click="handlePreview(scope.row)">面试题</el-button>
            <el-button round type="warning" @click="handleUpdate(scope.row)">更新题库</el-button>
          </div>
        </template>
      </el-table-column>
  </el-table>

  <!-- 更新面试题组件 -->
  <el-dialog v-model="dialogUpdateVisible" title="更新题库" width="80%">
      <Editor 
      @event="handleUpdateEditorEvent" 
      :content="currentItem['interview']"
      v-if="dialogUpdateVisible"
      />

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateConfirm()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 预览题库 -->
    <el-dialog v-model="dialogPreviewVisible" title="预览题库" width="80%">
      <el-card shadow="hover">
        <div v-html="currentItem.interview"></div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref,onMounted, computed } from 'vue'
import importExcel from '../../util/importExcel'
import axios from 'axios';
import Editor from '../../components/editor/Editor.vue';

const dialogUpdateVisible = ref(false)
const dialogPreviewVisible = ref(false)
const search = ref("")
const tableData = ref([])
const getList = async() => {
  const res = await axios.get('/adminapi/companys')
  tableData.value = res.data
}

onMounted(() => {
  getList()
})

const fileList = ref([])
const handleChange = (ev) => {
  importExcel(ev.raw, async(data) => {
    // console.log(data);
    const list = data.map((item) => ({title:item.company}))
    // console.log(list);
    //存储公司数据
    await axios.post('/adminapi/companys',list)
    //存储就业学生数据
    await axios.post('/adminapi/companystudents',data)


    setTimeout(() => {
      fileList.value = []
    }, 1000)
    getList()
  })
}
const computedTableData = computed(()=>tableData.value.filter(
  data =>data.title.toLowerCase().includes(search.value.toLowerCase())
))

//更新回调函数
const currentItem = ref({})
const handleUpdate = (item) => {
  currentItem.value = item
  dialogUpdateVisible.value = true
  // console.log(currentItem.value);
}

const handleUpdateEditorEvent = (data) => {
  currentItem.value["interview"] = data
  // console.log(currentItem.value["interview"]);
}

const handleUpdateConfirm = async() => {
  await axios.put(`/adminapi/companys/${currentItem.value._id}`,currentItem.value)
  dialogUpdateVisible.value = false
}

const handlePreview = (item) => {
  dialogPreviewVisible.value = true
  currentItem.value = item
}
</script>