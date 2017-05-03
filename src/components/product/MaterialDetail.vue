<template>
<div class="materialdetail">			
    <el-row :gutter="20">
		
        <el-col :span="10">
			<div class="grid-content">				
				<el-table :data="filtermaterials" border style="width: 100%" max-height="1000">					
					<el-table-column prop="m_no" label="编号"></el-table-column>
					<el-table-column prop="m_name" label="名称" ></el-table-column>					
					<el-table-column prop="m_amount" label="数量"></el-table-column>											
					<el-table-column fixed="right" label="操作" width="120">				
						<template scope="scope">
							<el-button
								@click.native.prevent="deleteRow(scope.$index, tableData4)"
								type="text"
								size="small">
								移除
							</el-button>
						</template>
					</el-table-column>
				</el-table>	
			</div>
		</el-col>
        <el-col :span="14">
			<div class="grid-content">
				<el-collapse v-model="activeNames" @change="handleChange">					
					<el-collapse-item title="物品名称" name="1">
						<div class=mdetail-form>
							<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">								
								<el-row :gutter="20">
								<el-col :span="11">
									<el-form-item label="编号" prop="no">
										<el-input v-model="ruleForm.no"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="11">	
									<el-form-item label="名称" prop="name">
										<el-input v-model="ruleForm.name"></el-input>
									</el-form-item>
								</el-col>
								</el-row>
								<el-row :gutter="20">
								<el-col :span="11">
									<el-form-item label="单位" prop="unit">
										<el-input v-model="ruleForm.unit"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="11" class="amount">
									<el-form-item label="数量" prop="amount">
										<el-input-number v-model="ruleForm.amount" :min="0"></el-input-number>
									</el-form-item>
								</el-col>
								</el-row>
								<el-row :gutter="20">
								<el-col :span="11">
									<el-form-item label="类别" prop="kind">
										<el-select v-model="ruleForm.kind" placeholder="请选择物品类别">
											<el-option label="原材料" value="原材料"></el-option>
											<el-option label="易损件" value="易损件"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="11">
									<el-form-item label="种类" prop="kindid">
										<el-input v-model="ruleForm.kindid"></el-input>
									</el-form-item>
								</el-col>
								</el-row>
								<el-form-item label="备注" prop="remark">
									<el-input v-model="ruleForm.remark" type="textarea" :row="5"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
									<el-button @click="resetForm('ruleForm')">重置</el-button>
								</el-form-item>
							</el-form>
						</div>
					</el-collapse-item>
					<el-collapse-item title="反馈 Feedback" name="2">
						<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
						<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
					</el-collapse-item>
					<el-collapse-item title="可控 Controllability" name="3">
						<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
						<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</el-col>		
    </el-row>
	
</div>
</template>

<script>
import {mapGetters} from 'vuex';

var par = new RegExp(/^\d{4,6}$/, 'g');

export default {
	mounted () {
		this.$http.get('http://127.0.0.1:5000/api/v1.0/materials/get/').then(
			response => {                    
				//this.$data.tableData = response.data;
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
			},
			response => {
				alert('false');
				console.log(response);
			}
		);
	},
	data: function() {
		return {
			activeNames: [],
			ruleForm: {
				no: '',
				name: '',
				unit: '',
				amount: '',
				kind: '',				
				remark: '',
				kindid: ''
			},
			rules: {
				no: [
					{ required: true, message: '请输入物品编号', trigger: 'blur' },
					{ min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' },
					{ pattern: /^\d{4,6}$/, message: '请按规范操作', trigger:'blur' }
				],
				name: [
					{ required: true, message: '请输入物品名称', trigger: 'blur' }
				],
				unit: [
					{ required: true, message: '请输入计量单位', trigger: 'blur' }
				],
				amount: [
					{ type: 'integer', required: true, message: '请按规则输入数量', trigger: 'change' }
				],
				kind: [
					{ required: true, message: '请至少选择一个类别', trigger: 'change' }
				],
				remark: [
					
				],
				kindid: [
					
				]
			},
			filtermaterials: []		
		};
	},
	props:['curNodePhid'],
	computed: mapGetters({
		materials: 'allMaterials', // 过滤后的原材料数据
		infos: 'allInfos'
	}),
	methods: {
		handleChange: function() {},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		deleteRow(index, rows) {
			rows.splice(index, 1);
		}
	}	
};
</script>

<style>
	div.materialdetail {
		height: auto!important;
		min-height: 800px;
	}
	div.materialdetail > .el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	div.materialdetail .el-col {
		border-radius: 4px;
	}
	div.materialdetail .bg-purple-dark {
		background: #99a9bf;
	}
	div.materialdetail .bg-purple {
		background: #d3dce6;
	}
	div.materialdetail .bg-purple-light {
		background: #e5e9f2;
	}
	div.materialdetail .grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	div.materialdetail .row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	div.materialdetail .el-collapse {
		border: 1px solid #bfcbd9;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}	
	div.materialdetail .el-collapse-item__header {
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		border-bottom: 1px solid #bfcbd9;
	}
	div.materialdetail .el-collapse-item__wrap {
		border-bottom: 1px solid #bfcbd9;
	}
	div.materialdetail .el-collapse-item__header__arrow {
		transition: transform 0.6s;
	}
	div.materialdetail div.amount div.el-form-item__content {
		line-height: 13px;
	}
</style>