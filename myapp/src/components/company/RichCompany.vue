<template>
   <dv-scroll-ranking-board 
   :config="computedConfig" 
   style="width:100%;height:600px;box-sizing: border-box;padding: 20px;" 
   />
</template>
<script setup>
import { computed } from 'vue'
import _ from 'lodash'

const props = defineProps(["dataList"])
const computedConfig = computed(()=>{
  let {dataList} = props
  let groundObj = _.groupBy(dataList, item => item.company)
  let configData = []
  for(let item in groundObj){
    configData.push({
      name: item,
      value: groundObj[item]
      .reduce((pre, cur) => pre + Number(cur.salary), 0) / groundObj[item].length
    })
  }
  // console.log(configData);
  
  return {
    data: configData,
    color:'rgb(29, 193, 245)',
    unit: '元',
  }
})
</script>