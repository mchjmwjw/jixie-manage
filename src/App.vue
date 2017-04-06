<template>
    <div>
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" @click="handleManage">              
              <router-link to="/product">处理中心</router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            <el-menu-item index="4">              
              <router-link to="/">首页</router-link>
            </el-menu-item>
        </el-menu>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
  export default {
    data: function() {
        return {
          activeIndex: '4'
        };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleManage() {
        //alert("What?");
      }
    }
  }
</script>
<style>
  .el-menu-item > a {
    text-decoration:none;
  }
</style>