<template>
  <div id="studentchart" style="height:100%;"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, nextTick} from 'vue';

const props = defineProps(["data"])
const handleData = ({tableData,currentItem,tagData}) => {
  const legendData = [currentItem.class.title+"班平均值",currentItem.studentname]
  const indicatordata = tagData.map(item => ({name:item.title,max:5}))

  const currentClass = tableData.filter(item => item.class._id === currentItem.class._id)
  const avarage = []
  tagData.forEach(({title},index) => {
    var filterArr = currentClass.filter(item => item.score[title])
    avarage[index] = (filterArr.map(item => item.score[title])
    .reduce((pre,cur) => pre + cur,0)/ (filterArr.length || 1)).toFixed(2)
  })
  const avarageObj = {
    name:legendData[0],
    value:avarage
  }
  const currentObj = {
    name:legendData[1],
    value:tagData.map(({title}) => currentItem.score[title]?
    currentItem.score[title]:0
  )}
  const seriesData = [avarageObj,currentObj]

  return {legendData,indicatordata,seriesData}
}

onMounted(() => {
  nextTick(() => {
    var myChart = echarts.init(document.getElementById('studentchart'));

    const {legendData,indicatordata,seriesData} = handleData(props.data)
// 绘制图表
myChart.setOption({
  title: {
    text: ''
  },
  tooltip: {
                trigger: 'item',
                //鼠标跟随
                position: function (point, params, dom, rect, size) {
                    // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                    // 提示框位置
                    var x = 0; // x坐标位置
                    var y = 0; // y坐标位置

                    // 当前鼠标位置
                    var pointX = point[0];
                    var pointY = point[1];

                    // 外层div大小
                    // var viewWidth = size.viewSize[0];
                    // var viewHeight = size.viewSize[1];

                    // 提示框大小
                    var boxWidth = size.contentSize[0];
                    var boxHeight = size.contentSize[1];

                    // boxWidth > pointX 说明鼠标左边放不下提示框
                    if (boxWidth > pointX) {
                        x = 5;
                    } else { // 左边放的下
                        x = pointX - boxWidth;
                    }

                    // boxHeight > pointY 说明鼠标上边放不下提示框
                    if (boxHeight > pointY) {
                        y = 5;
                    } else { // 上边放得下
                        y = pointY - boxHeight;
                    }

                    return [x, y];
                }

            },
  legend: {
    data: legendData
  },
  radar: {
    // shape: 'circle',
    indicator: indicatordata
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: seriesData
    }
  ]
});
})
  })
</script>