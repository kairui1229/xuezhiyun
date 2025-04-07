<!--
 * @作者: kerwin
-->
<template>
  <el-table :data="tableData" style="width: 100%;height: 90%;margin-top:5%" class="table">
      <el-table-column label="风险学生">
          <template #default="scope">
              <el-link style="color:white" @click="handleClick(scope.row.studentname)">
                {{scope.row.studentname}}
              </el-link>
          </template>
      </el-table-column>
      <el-table-column label="班级">
          <template #default="scope">
              <div>{{scope.row.class.title}}</div>
          </template>
      </el-table-column>
      <el-table-column label="低Tag值技术">
          <template #default="scope">
              <div>{{scope.row.lowTag.join(" | ")}}</div>
          </template>
      </el-table-column>
  </el-table>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import {useRouter} from 'vue-router'
const props = defineProps(["data"])
const tableData = ref([])

onMounted(()=>{
tableData.value = handleData(props.data)
})

const handleData = ({studentsData,tagsData})=>{
  const averageStudent = []
  studentsData.forEach((item,index)=>{
      // {html5:4,css3:3}
      let values = Object.values(item.score)
      let averageValue = values.reduce((total,item)=>total+item,0)/values.length

      // console.log(averageValue)
      if(!isNaN(averageValue)){
          averageStudent.push({
              ...item,
              averageValue
          })
      }
  })

  // console.log(averageStudent)
  averageStudent.sort((item1,item2)=>item1.averageValue-item2.averageValue) 

  let students = averageStudent.slice(0,5)

  let finalStudents = []


  students.forEach((item,index)=>{
      let lowTag = Object.entries(item.score)
      .sort((item1,item2)=>item1[1]-item2[1])
      .slice(0,5)
      .map(item=>item[0])
      // console.log(lowTag)

      finalStudents.push({
          ...item,
          lowTag
      })
  })
  // console.log(finalStudents);
  
  return finalStudents
}
const router = useRouter()
const handleClick = (name) =>{
  router.push(`/student-manage/studentList?name=${name}`)
}
</script>

<style scoped lang="scss">
.table{
  background: url("../../assets/t_bg.png") no-repeat center;
  background-size: 100% 100%;
  height: 100%;
  :deep(tr){
        background: rgba($color: #fff, $alpha: 0)!important;
        color:white;
    }
    :deep(tr):hover td{
        background: rgba($color: #fff, $alpha: 0)!important;
    }

    :deep(th){
        background: rgba($color: #fff, $alpha: 0)!important;
        color:white;
    }
}
</style>