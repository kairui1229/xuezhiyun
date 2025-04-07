<template>
  <div demo-bg>
    <dv-scroll-board 
    :config="computedConfig" 
    style="width:100%;height:600px;box-sizing: border-box;padding: 20px;" 
    />
  </div>
</template>
<script setup>
import { computed} from 'vue';

const props = defineProps(["dataList"])
const computedConfig = computed(() => {
  let {dataList} = props
  let data = dataList.sort((a, b) =>Date.parse(b.employ_data) - Date.parse(a.employ_data))
  // console.log(data);
  let configObj = {}
  data.forEach(item => {
    configObj[item.studentname] = item.company
  });
  // console.log(Object.entries(configObj));
  
  return {
  header: ['学生', '公司'],
  data: Object.entries(configObj),
  headerBGC: 	'rgba(0, 0, 0, 0)',
  oddRowBGC: 	'rgba(0, 0, 0, 0)',
  evenRowBGC: 	'rgba(0, 0, 0, 0)',
  carousel: 'page',
  index: true,
  columnWidth: [50],
  align: ['center'],
  }
})
</script>