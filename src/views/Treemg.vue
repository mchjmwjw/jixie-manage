<template>
    <div class="treemg">
		<your-input></your-input>
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>
        <el-button-group>
            <el-button type="primary" class="el-icon-plus" @click="insertNewNode"></el-button>
            <el-button type="primary" class="el-icon-minus"></el-button>
        </el-button-group>

        <el-tree
            class="filter-tree" 
            :data="kinds"
            :props="defaultProps"
            show-checkbox
            node-key="phid"        
            :expand-on-click-node="true"
            :render-content="renderContent"
            :filter-node-method="filterNode"
            ref="kindtree">
        </el-tree>
        <el-button type="primary" @click="uploadData">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</template>

<script>
let id = -1;
import { mapGetters, mapActions } from 'vuex';
import manage from '../../api/manage.js';
import Vue from 'vue';
function Kind(phid=1, pid=null, k_name='', children=[]) {
	this.phid = phid;
	this.pid = pid;
	this.k_name = k_name;
	this.children = children;
}

var Child = {
	render: function(createElement) {
		return createElement(
			'div',
			{
				style: {
					display: 'inline-block'					
				},
			},
			[
				createElement('p', {
					style: {
						color: 'pink',						
						display: 'inline-block',
						margin: '0 10px 0 0'
					},
					domProps: {						
						innerHTML:'树维护'
					}
				}, this.$slots.default)
			]
		);
	}
};

var Child2 = {
	render: function(createElement) {
		var self = this;
		return createElement('el-input',{
			domProps: {
				value: self.value
			},
			on: {
				input: function (event) {
					self.value = event.target.value;
				}
			},
			props:{
				labelContent: 'labelContent'
			}
		});
	}	
};

Vue.component('my-input2', Child2);

Vue.component('my-input', {
	render: function(createElement) {
		return createElement(
			'div',
			{
				style: {
					display: 'inline-block'					
				},
			},
			[
				createElement('p', {
					style: {
						color: 'red',			
						display: 'inline-block',
						margin: '0 10px 0 0'
					},
					domProps: {						
						innerHTML:'hello'
					}
				}, this.$slots.default)
			]
		);
	}
});

export default {
	watch: {
		filterText(val) {
			this.$refs.kindtree.filter(val);
		}
	},

	data() {
		return {			
			filterText: '',
			defaultProps: {
				children: 'children',
				label: 'k_name'
			},
			name: 'lala',
			removeIds: []
		};
	},

	created: function() {
		//this.$store.dispatch('getAllKinds', {kinds: [new Kind()]});
		this.$http.get('http://127.0.0.1:5000/api/v1.0/kindtree/get/').then(
			response => {                    
				// this.$store.dispatch('getAllMaterials', {
				// 	material: response.data
				// });
				console.log(response);
				this.$store.dispatch('loadKindData', {kinds: response.data});
			},
			response => {
				alert('false');
				console.log(response);
			}
		);
	},

	computed: mapGetters({
		kinds: 'allkinds'
	}),

	components: {
		'your-input': Child
	},

	methods: {
		append(store, data) {
			let obj = { phid: id--, pid: data.phid, k_name: 'testtest', children: [] };
			store.append(obj, data);
		},
		// 删除节点
		remove(store, data) {
			store.remove(data);
			// 保存删除节点的phid
			function saveRemoveId(obj, me) {
				if(obj.phid > 0) {
					me.$data.removeIds.push(obj.phid);
				}
				if(obj.children.length > 0) {
					obj.children.forEach(function(element) {
						saveRemoveId(element, me);
					}, this);					
				}
			}
			saveRemoveId(data, this);			
		},
		/*
			<el-input value={node.label} v-model='name' on-blur={ (a) => {
				console.log('xxx');
				var xx = 'xx';
			} }>
			</el-input>
		*/
		renderContent(h, { node, store, data }) {
			return (
			<span>
				<span>
					<span>
						<el-input value={node.label} on-input={ (a) => {
							data.k_name = a;
						}}></el-input>
					</span>
				</span>
				<span style="float: right; margin-right: 20px">					
					<el-button size="mini" value="number" on-click={ () => {
						//node.expand(); 
						node.expanded = false;
						this.append(store, data);
					} }>添加
					</el-button>
					<el-button size="mini" on-click={ () => this.remove(store, data) }>删除</el-button>
					
				</span>
			</span>);
		},

		filterNode(value, data) {
			if (!value) return true;
			return data.k_name.indexOf(value) !== -1;
		},

		insertNewNode() {
			this.$refs.kindtree.store.append(new Kind(id--, null ,'试一试'), this.$refs.kindtree.root.parent);            
		},

		uploadData() {
			//this.$store.dispatch('getAllKinds', {kinds: this.$refs.kindtree.store.data});
			let arr = [], brr = [];
			this.convertNodeToData(arr, this.$refs.kindtree.root.childNodes, this, brr);	
			//this.$store.dispatch('getAllKinds', {kinds: arr});
			this.$store.dispatch('saveKindData', { kind: brr});
			this.$http.post('http://127.0.0.1:5000/api/v1.0/kindtree/save/',{
				mdata: this.$store.getters.kinddata, removeIds: this.$data.removeIds
			}).then(
			response => {                    

				this.$store.dispatch('loadKindData', {kinds: response.data});
				console.log(response);
			},
			response => {
				alert('false');
				console.log(response);
			});
		},
		
		convertNodeToData(pnodechildren, childnodes, me, dataArr) {                       
			childnodes.forEach(function(element) {
				pnodechildren.push(element.data);
				dataArr.push(element.data);
				if(element.childNodes.length > 0) {
					me.convertNodeToData(pnodechildren, element.childNodes, me, dataArr);
				}
			});
		},
		
		doSomething() {
			alert('xxx');
		}
	}
};
</script>

<style>
div.treemg .el-button-group {
    right: 47%;
    position: relative;
}
div.treemg .el-tree {
    margin: 5px auto;
}
div.treemg .el-tree .el-input {
    width: 30%;
    vertical-align: middle;
}
div.treemg .el-tree .el-input input {
    height: 25px;    
}
div.treemg > div.el-input {
    margin: 0 auto 5px auto;
}
div.treemg > .el-button {
    margin: 10px auto;
}
.treemg {
    text-align: center;
}
</style>