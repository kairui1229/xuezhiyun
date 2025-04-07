<template>
  <div id="home">
    <el-row :gutter="20" v-if="isCreated">
    <el-col :span="12" class="parent">
    <ClassAverageEchart :data="{studentsData,tagsData,classData}"/>
    </el-col>
    <el-col :span="12" class="parent">
      <el-row :gutter="20">
    <el-col :span="24" class="item">
    <AverageEchart :data="{studentsData,tagsData,classData}"/>
    </el-col>
    <el-col :span="24" class="item">
    <DangerStudent :data="{studentsData,tagsData,classData}"/>
    </el-col>
      </el-row>
    </el-col>
  </el-row>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import ClassAverageEchart from "../../components/home/ClassAverageEchart.vue";
import AverageEchart from "../../components/home/AverageEchart.vue";
import DangerStudent from "../../components/home/DangerStudent.vue";

const studentsData = ref([]);
const tagsData = ref([]);
const classData = ref([]);
const isCreated = ref(false);

onMounted(async()=>{
  await Promise.all([getStudentList(),getTagList(),getClassList()]);
  isCreated.value = true;
})

const getStudentList =async () => {
  var res =await axios.get('/adminapi/students')
  studentsData.value = res.data
}
const getClassList =async () => {
  var res =await axios.get('/adminapi/classes')
  classData.value = res.data
}

const getTagList =async () => {
  var res =await axios.get('/adminapi/tags')
  tagsData.value = res.data
}

</script>
<style lang="scss" scoped>
.parent{
  height: 800px;
  .item{
    height: 400px;
  }
}
#home{
  background: url("../../assets/bg.png") no-repeat center;
  background-size: 100% 100%;
  padding: 10px;
}
</style>