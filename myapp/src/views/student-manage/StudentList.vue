<template>
  <div>
    <el-table :data="computedTableData" style="width: 100">
    <el-table-column label="学生名" width="230">
      <template #header>
        <el-input v-model="search" size="small" placeholder="请输入学生名字" />
      </template>
      <template #default="scope">
        {{ scope.row.studentname }}
      </template>
    </el-table-column>
    <el-table-column label="班级" width="200"
    :filters="computedClass"
      :filter-method="filterClass"
      filter-placement="bottom-end">
      <template #default="scope">
         {{ scope.row.class.title }}
      </template>
    </el-table-column>
    <el-table-column label="综合评分" width="200">
      <template #default="scope">
        <el-rate :model-value="getRate(scope.row)" :colors="colors" disabled allow-half/>
      </template>
    </el-table-column>
    <el-table-column label="评分进度" >
      <template #default="scope">
        <el-progress :percentage="getProgress(scope.row)" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
        <template #default="scope">
          <div style="display: flex; align-items: center;height: 55px;">
            <el-badge :value="getBadge(scope.row)" class="item" :hidden="getBadge(scope.row) === 0">
            <el-button round type="primary" 
            @click="handleRate(scope.row)">
            评分
          </el-button>
        </el-badge>
          </div>
        </template>
      </el-table-column>
  </el-table>
  <el-drawer
    v-model="outerDrawer"
    direction="rtl"
    :size="size"
  >
  <template #header=>
    <h4>学生战力评分</h4>
    </template>
    <div>
      <el-button type="primary" :icon="PieChart" round @click="handlePie"></el-button>
      <el-divider />
      <el-alert type="info" show-icon>
        请为<b style="font-size: 20px;">{{currentItem.studentname}}</b>点亮成功之路的每一颗星星
      </el-alert>
      <el-divider />
      <div v-for="item in tagData" :key="item._id">
        <div class="tag-item">
          <div>{{ item.title }}</div>
          <el-rate 
          :model-value="getItemRate(item.title)"
          :colors="colors" 
          allow-half
          @change="handleRateEvent($event, item.title)"
          tabindex="-1"
          />
        </div>
        <el-divider />
      </div>
    </div>
    <el-drawer
        v-model="innerDrawer"
        title="可视化分析"
        :append-to-body="true"
        :before-close="handleClose"
        size="50%"
      >
        <StudentChart :data="{tableData,currentItem,tagData}" v-if="innerDrawer" />
      </el-drawer>
  </el-drawer>
  </div>
</template>
<script setup>
import { onMounted,ref,computed } from 'vue'
import { ElMessage } from 'element-plus'
import {PieChart} from '@element-plus/icons-vue'
import axios from 'axios'
import StudentChart from '../../components/students-mangage/StudentChart.vue'
import { useRoute } from 'vue-router'

const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
const tableData = ref([])
const route = useRoute()
const search = ref(route.query.name || '')
const classData = ref([])
const tagData = ref([])
const outerDrawer = ref(false)
const innerDrawer = ref(false)
const size = ref('30%')

onMounted(()=>{
  getList()
  getClassList()
  getTags()
})

//记录当前item
const currentItem = ref({})
const getList = async()=>{
  const res = await axios.get('/adminapi/students')
  tableData.value = res.data
}
const getClassList = async()=>{
  const res = await axios.get('/adminapi/classes')
  classData.value = res.data
}
const getTags = async()=>{
  const res = await axios.get('/adminapi/tags')
  tagData.value = res.data
}
const computedTableData = computed(()=>tableData.value.filter(
  data =>data.studentname.toLowerCase().includes(search.value.toLowerCase())
))

//筛选
const computedClass = computed(()=>{
  return classData.value.map(item => ({
    text: item.title,
    value: item._id
  }))
})
const filterClass = (value, item) => {
  return value === item.class._id
}

const handleRate = (item) => {
  outerDrawer.value = true
  currentItem.value = item
}

//每一个评分项
const handleRateEvent = async(value, title) => {
  await axios.put(`/adminapi/students/${currentItem.value._id}`, {
    key: title,
    value: value
  })
  
  ElMessage({
    message: `${currentItem.value.studentname}的${title}评分已经更新`,
    type: 'success',
  })

  await getList()
}

const getItemRate = (title) => {
  return tableData.value.filter(item => item._id === currentItem.value._id)[0].score[title]
}
const getBadge = ({score}) => {
  let keys = Object.keys(score)
  return tagData.value.length - keys.length
}
const getProgress = ({score}) => {
  if(tagData.value.length === 0) return 0
  let keys = Object.keys(score)
  return Math.floor(keys.length / tagData.value.length * 100)
}
const getRate = ({score}) => {
  let values = Object.values(score)
  let total = values.reduce((prev, curr) => prev + curr, 0)
  return total / values.length
}

const handlePie = ()  => {
  innerDrawer.value = true
  size.value = "70%"
}
const handleClose = () => {
  innerDrawer.value = false
  size.value = "30%"
}
</script>
<style scoped>
.tag-item{
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
}
</style>