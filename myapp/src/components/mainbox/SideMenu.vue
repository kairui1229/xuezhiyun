<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-menu 
      class="el-menu-vertical-demo" 
      style="height: 100vh" 
      :router="true" 
      :default-active="route.fullPath"
      >
        <template v-for="data in rightsList" :key="data.path">
          <el-sub-menu 
          :index="data.path" 
          v-if="data.children.length && checkAuth(data.path) "
          >
            <template #title>
              <el-icon>
                <component :is="mapIcon[data.icon]"></component>
              </el-icon>
              {{ data.title }}
            </template>
            <el-menu-item :index="item.path" v-for="item in data.children" :key="item.path">
              <el-icon>
                <component :is="mapIcon[item.icon]"></component>
              </el-icon>
              {{ item.title }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item :index="data.path" v-else-if="checkAuth(data.path)">
            <el-icon>
              <component :is="mapIcon[data.icon]"></component>
            </el-icon>
            <span>{{ data.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import {
  List,
  School,
  PieChart,
  OfficeBuilding,
  Grid,
  Key,
  User,
  TrendCharts,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../store/useUserStore";
const rightsList = ref([]);
const mapIcon = {
  List,
  School,
  PieChart,
  OfficeBuilding,
  Grid,
  Key,
  User,
  TrendCharts,
};
onMounted(async () => {
  const res = await axios.get("/adminapi/rights");
  //console.log(res.data)
  rightsList.value = res.data;
});
const route = useRoute();
const {user:{role:{rights}}} = useUserStore()
const checkAuth  = (path) => {
  return rights.includes(path)
}
</script>
