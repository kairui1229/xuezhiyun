<template>
  <div>
    <el-container style="height: 100vh">
      <Sidemenu></Sidemenu>
    <el-container direction="vertical">
      <TopHeader></TopHeader>
        <el-main>
          <el-scrollbar>
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Sidemenu from '../components/mainbox/Sidemenu.vue';
import TopHeader from '../components/mainbox/TopHeader.vue';
</script>