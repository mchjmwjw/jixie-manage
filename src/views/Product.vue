<template>
    <div>
        <el-row :gutter="20">   <!-- gutter 来指定每行之间的间隔 -->
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                    <el-tree class="filter-tree" :data="kinds" :props="defaultProps" highlight-current
                        default-expand-all :filter-node-method="filterNode" ref="tree2" @node-click="doo">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="18">                
                <div class="grid-content bg-purple">
                    <tabpanel></tabpanel>
                </div>
            </el-col>
        </el-row>
    </div>    
</template>

<script>
import Tabpanel from '../components/product/Info.vue';
import { mapGetters } from 'vuex';
import EventBus from '../static/js/eventBus.js';
export default {
	components: {
		'tabpanel': Tabpanel
	},

	watch: {
		filterText(val) {
			this.$refs.tree2.filter(val); // $refs 包含了所有拥有ref注册的子组件
		}
	},

	created: function() {
		this.$http.get('http://127.0.0.1:5000/api/v1.0/kindtree/get/').then(
			response => {				
				this.$store.dispatch('loadKindData', {kinds: response.data});
			},
			response => {
				alert('false');
				console.log(response);
			}
		);
	},

	methods: {
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		doo(obj, node, com) {
			EventBus.$emit('id-selected', node);
		}
	},

	data() {        
		return {
			filterText: '', 
			data2: [],
			defaultProps: {
				children: 'children',
				label: 'k_name'
			}
		};
	},

	computed: mapGetters({
		kinds: 'allkinds'
	})
};
</script>

<style>
    /*选中节点背景色 */
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
            background-color: #fac285;
    }
</style>