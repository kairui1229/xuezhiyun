<template>
  <div w50rem h25rem flex="~ col" justify-center items-center bg-dark>
    <div>
      <dv-capsule-chart :config="computedConfig" 
      style="width:100%;height:600px;box-sizing: border-box;padding: 20px;" 
      />
    </div>
  </div>
</template>
<script setup>
import {computed} from 'vue'
import _ from 'lodash'

const props = defineProps(["dataList"])
const computedConfig = computed(() => {
  let {dataList} = props
  let groundObj = _.groupBy(dataList, item => item.company) 
  let configData = []
  for (let item in groundObj) {
    configData.push({
      name: item,
      value: groundObj[item].length,
    })
    // console.log(dataList);
    // console.log(groundObj,item, groundObj[item].length);
    
  }
  const data = configData.sort((a, b) => b.value - a.value).slice(0, 5)
  // console.log(configData);
 return {
  data: data,
  colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
  unit: '人数',
  labelNum: 6,
}
})

</script>