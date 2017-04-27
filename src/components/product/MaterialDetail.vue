<template>
<div class="materialdetail">
    <el-row :gutter="20">
        <el-col :span="12">
			<div class="grid-content">
				<el-collapse v-model="activeNames" @change="handleChange">
					<el-collapse-item title="物品名称" name="1">
						<div class=mdetail-form>
							<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="活动名称" prop="name">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item label="活动区域" prop="region">
								<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="活动时间" required>
								<el-col :span="11">
								<el-form-item prop="date1">
									<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
								</el-form-item>
								</el-col>
								<el-col class="line" :span="2">-</el-col>
								<el-col :span="11">
								<el-form-item prop="date2">
									<el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
								</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="即时配送" prop="delivery">
								<el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
							</el-form-item>
							<el-form-item label="活动性质" prop="type">
								<el-checkbox-group v-model="ruleForm.type">
								<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
								<el-checkbox label="地推活动" name="type"></el-checkbox>
								<el-checkbox label="线下主题活动" name="type"></el-checkbox>
								<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item label="特殊资源" prop="resource">
								<el-radio-group v-model="ruleForm.resource">
								<el-radio label="线上品牌商赞助"></el-radio>
								<el-radio label="线下场地免费"></el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="活动形式" prop="desc">
								<el-input type="textarea" v-model="ruleForm.desc"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
								<el-button @click="resetForm('ruleForm')">重置</el-button>
							</el-form-item>
							</el-form>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</div>
</template>

<script>
export default {
	data: function() {
		return {
			activeNames: ['1'],
			ruleForm: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			rules: {
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				region: [
					{ required: true, message: '请选择活动区域', trigger: 'change' }
				],
				date1: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				],
				date2: [
					{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				],
				type: [
					{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				],
				resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				],
				desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				]
			}
		};
	},
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
		}
	}
};
</script>

<style>
	div.materialdetail {
		height: auto!important;
		min-height: 500px;
	}
	div.materialdetail .el-row {
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
</style>