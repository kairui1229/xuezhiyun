<template>
  <div id="companyData">
    <dv-border-box10>
    <el-row :gutter="20">
      <el-col :span="8">
        <dv-border-box11 
        title="最受欢迎的公司" 
        :title-width="400" 
        :animate="true"
        >
        <welcomepany :dataList="dataList" class="companydata"/>
        </dv-border-box11>
      </el-col>
      <el-col :span="8">
        <dv-border-box8 :dur="5">
          <dv-decoration7 style="width:100%;height:50px;">
      <div style="font-size: 20px; color:#fff">最不差钱的公司</div>
    </dv-decoration7>
        <RichCompany :dataList="dataList" class="companydata"/>
    </dv-border-box8>
      </el-col>
      <el-col :span="8">
        <dv-border-box11 
        title="最近入职的公司" 
        :title-width="400" 
        :animate="true">
        <EntryCompany :dataList="dataList" class="companydata"/>
        </dv-border-box11>
      </el-col>
    </el-row>
  </dv-border-box10>
  </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Welcomepany from '../../components/company/Welcomepany.vue';
import RichCompany from '../../components/company/RichCompany.vue';
import EntryCompany from '../../components/company/EntryCompany.vue';

const dataList = ref([])

onMounted(() => {
  getList()
})

const getList = async () => {
  const res = await axios.get('/adminapi/companystudents')
  dataList.value = res.data
}
</script>
<style lang="scss" scoped>
#companyData {
  background: url(../../assets/bg.png) no-repeat center;
  background-size: 100% 100%;
  height: 800px;
  padding: 10px;
}
.el-row {
  height: 800px;
  padding: 30px;
}
.companydata{
  position: absolute;
  width: 100%;
  top: 80px;
  color: white;
  text-align: center;
}
</style>