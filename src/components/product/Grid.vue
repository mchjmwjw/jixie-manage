<template>
    <div>
        <div class="panel-content">
            <el-table :data="filtermaterials" border style="width: 100%">
            <el-table-column prop="phid" label="主键"></el-table-column>
            <el-table-column prop="m_no" label="编号"></el-table-column>
            <el-table-column prop="m_name" label="名称" ></el-table-column>
            <el-table-column prop="m_kind" label="类别"></el-table-column>
            <el-table-column prop="m_amount" label="数量"></el-table-column>
            <el-table-column prop="m_unit" label="计量单位"></el-table-column>
            <el-table-column prop="m_remark" label="备注"></el-table-column>
			<el-table-column prop="kind_name" label="种类"></el-table-column>
        </el-table>
        </div>
        		
		<div hidden>
			<el-button type="primary" @click="doSomeThing">+1 按钮</el-button>
        	<el-input v-model="input" placeholder="请输入内容">            
        	</el-input>
		</div>        

        <div class='panel-form'>            
            <el-form ref="ruleForm" :model="infos" :rules="rules" label-width="80px">
				<span hidden v-model="infos.phid"></span>
				<el-form-item label="编号" prop="m_no">
					<el-input v-model="infos.m_no"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="m_name">
					<el-input v-model="infos.m_name"></el-input>
				</el-form-item>
				<el-form-item label="类别" prop="m_kind">
					<el-select v-model="infos.m_kind" placeholder="请选择种类">
					<el-option label="易损件" value="易损件"></el-option>
					<el-option label="原材料" value="原材料"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数量" prop="m_amount">
					<el-input-number v-model="infos.m_amount" :min="0"></el-input-number>
				</el-form-item> 
				<span hidden v-model="infos.kind_id"></span>
				<!-- <el-col :span="11"> -->
				<el-form-item label="种类">
					<el-input :disabled="true" v-model="infos.kind_name"></el-input>
				</el-form-item>
				<!-- </el-col>           -->
				<el-form-item label="计量单位" prop="m_unit">
					<el-input v-model="infos.m_unit"></el-input>
					<!-- <el-radio-group v-model="infos.m_unit">
					<el-radio label="吨"></el-radio>
					<el-radio label="打"></el-radio>
					</el-radio-group> -->
				</el-form-item>
				<el-form-item label="备注" prop="m_remark">
					<el-input type="textarea" v-model="infos.m_remark"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
					<el-button>取消</el-button>
				</el-form-item>
            </el-form>
        </div>
        
    </div>
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue';
function Form(kind_id='', kind_name='', phid=null, m_no='', m_name='', m_kind='', m_amount='', m_unit='', m_remark='') {
	this.phid = phid;
	this.m_no = m_no;   
	this.m_name = m_name;
	this.m_kind = m_kind;
	this.m_amount = m_amount;
	this.m_unit = m_unit;
	this.m_remark = m_remark;
	this.kind_id = kind_id;
	this.kind_name = kind_name;
	if(typeof Form._initialized == 'undefined') {
		Form.prototype.show = function() {
			alert('什么都不想展示');
		};
	}
}

export default {
	data() {            
		return {
			input: '',
			filtermaterials: [],
			rules: {
				m_no: [
					{ required: true, message: '请输入物品编号', trigger: 'blur' },
					{ min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' },
					{ pattern: /^\d{4,6}$/, message: '请按规范操作', trigger:'blur' }
				],
				m_name: [
					{ required: true, message: '请输入物品名称', trigger: 'blur' }
				],
				m_unit: [
					{ required: true, message: '请输入计量单位', trigger: 'blur' }
				],
				m_amount: [
					{ type: 'integer', required: true, message: '请按规则输入数量', trigger: 'change' }
				],
				m_kind: [
					{ required: true, message: '请至少选择一个类别', trigger: 'change' }
				],
				m_remark: [
					
				],
				kind_id: [
					
				]
			}	
			/*tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}]*/
			//tableData: []             
		};
	},
	props:['curNodePhid', 'curNodeName'],
	beforeCreate: function() {
		if(Vue.http.interceptors != undefined && Vue.http.interceptors.length > 0) {
			Vue.http.interceptors.pop();
		}
		Vue.http.interceptors.push(function(request, next) {
			if(request.url === 'http://127.0.0.1:5000/api/v1.0/materials/get/') {
				this.$store.dispatch('setMaterials', {infos: new Form(this.curNodePhid, this.curNodeName)});
			}                                  
			next();
		});
	},
	mounted: function() {
		//this.$store.dispatch('getAllMaterials');
		//this.$data.tableData = this.$store.getters.allMaterials; //,{emulateJSON: true}

		/*this.$http.jsonp('http://127.0.0.1:5000/api/v1.0/jsonp').then(
			response => {
				//var tmp = eval('(' + response.data + ')');
				var obj = JSON.parse(response.data);
				obj = JSON.parse(obj);
				this.$data.tableData = obj;
				//this.$set('tableData', obj);
			}, 
			response => {
				let xx =response;
				alert('false');
			});
		*/                

		this.$http.get('http://127.0.0.1:5000/api/v1.0/materials/get/').then(
			response => {                    
				//this.$data.tableData = response.data;
				// this.$store.dispatch('c', {
				// 	material: response.data
				// });

				this.$store.dispatch('getAllMaterials', {
					material: response.data,
					me: this
				}).then((me) => {
					let arr = [];
					me.materials.forEach(function(element) {
						if(element.kind_id == me.curNodePhid) {
							arr.push(element);
						}
					}, this);
					me.$data.filtermaterials = arr;					
				});	
				console.log(this);
			},
			response => {
				alert('grid xxx');
				console.log(response);
			});
							
	},
	computed: mapGetters({
		materials: 'allMaterials',
		infos: 'allInfos'
	}),
	methods: {
		doSomeThing() {
			//alert(this.$store.state.materials.count);
			this.$store.commit('increment');
			this.$data.input = this.$store.state.materials.count;                
		},
		onSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$http.post('http://127.0.0.1:5000/api/v1.0/materials/save/',{
						mdata: this.$store.getters.allInfos
					}).then(
						response => {                    
							this.$store.dispatch('getAllMaterials', {
								material: response.data,
								me: this
							}).then((me) => {
								let arr = [];
								me.materials.forEach(function(element) {
									if(element.kind_id == me.curNodePhid) {
										arr.push(element);
									}
								}, this);
								me.$data.filtermaterials = arr;					
							});	
							this.$store.dispatch('setMaterials', {
								infos: new Form(this.curNodePhid, this.curNodeName)
							});
							alert('插入成功')
						},
						response => {
							alert('false');
							console.log(response);
						}
					);  
				} else {
					console.log('error submit!!');
					console.log(this.$store)
					return false;
				}
			});	      
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style>
    .panel-content {
        margin: 20px auto;
    }

    .panel-form {
        border: 1px solid #8bc7ff;
        margin: 20px auto;
        padding: 10px 10px;
        border-radius: 5px;
    }
</style>