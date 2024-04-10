<template>
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
        <el-tab-pane v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
            <h1 v-if="item.content.length > 0">
                {{ item.content }}
            </h1>
            <p v-else>
                <component :is="item.componentId" :cur-node-phid="item.nodephid" :cur-node-name="item.k_name"></component>
            </p>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import grid from './Grid.vue';
import mdetail from './MaterialDetail.vue';
import EventBus from '../../static/js/eventBus';
Array.prototype.contains = function (obj, prop) {  
	var i = this.length;  
	while (i--) {  
		if (this[i][prop] === obj) {  
			return true;  
		}  
	}  
	return false;  
};
export default {
	mounted() {
		var me = this;
		EventBus.$on('id-selected', function (node) {
			var i = me.$data.editableTabs.length;  
			while (i--) {  
				if (me.$data.editableTabs[i].nodephid === node.data.phid) {  
					me.$data.editableTabsValue = me.$data.editableTabs[i].name;					
					return;  
				}  
			}  
			if(node.isLeaf) {			/*叶子节点*/
				console.log(node)
				if(node.data.flag != 'manage') {
					me.$data.editableTabs.push({
						title: node.label,
						name: ++me.$data.tabIndex + '',
						content: '',
						componentId: grid,
						nodephid: node.data.phid,
						k_name: node.data.k_name
					});
				} else {
					me.$data.editableTabs.push({
						title: node.label,
						name: ++me.$data.tabIndex + '',
						content: '',
						componentId: mdetail,
						nodephid: node.data.phid,
						k_name: node.data.k_name
					});
				}				
				me.$data.editableTabsValue = me.$data.tabIndex + '';
			}                
		});
	},
	data() {
		return {
			editableTabsValue: '1',
			editableTabs: [{
				title: 'Tab 1',
				name: '1',
				content: 'Tab 1 content',
				nodephid: -1
			}],
			tabIndex: 1
		};
	},
	methods: {
		handleTabsEdit(targetName, action) {
			if (action === 'add') {
				let newTabName = ++this.tabIndex + '';
				this.editableTabs.push({
					title: 'New Tab',
					name: newTabName,
					content: 'New Tab content'
				});
				this.editableTabsValue = newTabName;
			}
			if (action === 'remove') {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}                
				this.editableTabsValue = activeName;
				this.editableTabs = tabs.filter(tab => tab.name !== targetName);
			}
		},
		len(val) {
			return true;
		}
	}
};
</script>

<style>
    div.el-tabs__content {
        border: 1px solid #d1dbe5;
        border-top: 0;
        border-bottom: 0;
        padding: 0 5px;
    }
    div.el-tabs__header {
        margin: 0;
    }
</style>