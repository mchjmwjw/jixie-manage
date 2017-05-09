<template>
    <div>
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" @click="handleManage">              
              	<router-link to="/product">产品中心</router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1" @click="handleManage">
					<router-link to="/treemg">产品种类(树)维护</router-link>
				</el-menu-item>
                <el-menu-item index="2-2">
					<router-link to="/mobile">产品分类管理</router-link>
				</el-menu-item>
                <el-menu-item index="2-3">
					<router-link to="/matchart">产品展示图表</router-link>
				</el-menu-item>
            </el-submenu>
            <el-menu-item index="3" @click="handleManage"><a href="http://element.eleme.io/#/zh-CN/component/form" target="_blank">组件</a></el-menu-item>
            <el-menu-item index="4" @click="handleManage">              
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
		var idx = '4';
		if(this.$route.path == '/product') {
			idx = '1';
		}
		return {
			activeIndex: idx
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		handleManage(e) {
			var path = '/';
			switch(e.index) {
			case '1':
				path = '/product';
				break;
			case '3':
				//window.location.href='http://element.eleme.io/#/zh-CN/component/form'; // 原窗体打开
				window.open('http://element.eleme.io/#/zh-CN/component/form'); // 新窗体打开
				path = '';
				break;
			case '4':
				path = '/';
				break;
			case '2-1':
				path = '/treemg';
				break;
			case '2-3':
				path = '/matchart';
			}
			path == '' ? path : this.$router.push(path);
		}
	}
};
</script>

<style>
.el-menu-item > a {
    text-decoration:none;
}
.content {
	margin: 10px auto;
}
</style>