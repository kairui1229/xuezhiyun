<template>
  <div id="classAverageEchart"></div>
</template>
<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue';

const props = defineProps(["data"])
const handleData = ({studentsData,tagsData,classData}) => {
  const source = []
  const series = []

  source.push([
    "tags",
    ...tagsData.map(item => item.title)
  ])
     classData.forEach(item => {
       var arr = [item.title, ...getAverage(studentsData,tagsData,item._id)]
       source.push(arr)
       series.push({
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
       })    
     })
       series.push({
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}班: {@html5}分',
          color: "#fff"
        },
        encode: {
          itemName: 'tags',
          value: 'html5',
          tooltip: 'html5'
      }
    })
    return {source,series}
}

const getAverage = (studentsData,tagsData,classId) => {
  const currentClass = studentsData.filter(item => item.class._id === classId)
  const avarage = []
  tagsData.forEach(({title},index) => {
    var filterArr = currentClass.filter(item => item.score[title])
    avarage[index] = (filterArr.map(item => item.score[title])
    .reduce((pre,cur) => pre + cur,0)/ (filterArr.length || 1)).toFixed(2)
  })
  return avarage
}

onMounted(() => {
  var myChart = echarts.init(document.getElementById('classAverageEchart'))
  let {source,series} = handleData(props.data)
  var option = {
    title:[{
      text:'各班级技术Tag平均值',
      textStyle:{
        color:'white',
        fontSize:20
      },
      top:"15px",
      left:"15px"
    }],
    legend: {
      textStyle:{
        color:'white',
        fontSize:16
      },
      right:"140px",
      top:"15px",
    },
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: source
    },
    xAxis: { type: 'category',
     axisLabel:{
        interval:0,
        rotate:50,
      },
     axisLine:{
        lineStyle:{
          color:'white'
        }
      }
     },
    yAxis: { gridIndex: 0 ,
      axisLine:{
        lineStyle:{
          color:'white'
        }
      }
    },
    grid: { top: '55%' },
    series: series,
    color: ['#FCCE10', '#E87C25', 
            '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'],
  };
  myChart.on('updateAxisPointer', function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myChart.setOption({
        series: {
          id: 'pie',
          label: {
            formatter: '{b}班: {@[' + dimension + ']}分'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  });
  myChart.setOption(option);
})
</script>
<style lang="scss" scoped>
#classAverageEchart {
  background: url(../../assets/t_bg.png) no-repeat center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}
</style>