<template>
    <div>
        <div class="panel-content">
            <el-table :data="materials" border style="width: 100%">
            <el-table-column prop="phid" label="主键"></el-table-column>
            <el-table-column prop="m_no" label="编号"></el-table-column>
            <el-table-column prop="m_name" label="名称" ></el-table-column>
            <el-table-column prop="m_kind" label="种类"></el-table-column>
            <el-table-column prop="m_amount" label="数量"></el-table-column>
            <el-table-column prop="m_unit" label="计量单位"></el-table-column>
            <el-table-column prop="m_remark" label="备注"></el-table-column>
        </el-table>
        </div>
        
        <el-button type="primary" @click="doSomeThing">+1 按钮</el-button>
        <el-input v-model="input" placeholder="请输入内容">            
        </el-input>

        <div class='panel-form'>
            <el-form ref="form" :model="infos" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="infos.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="infos.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>                        
            <el-form-item label="特殊资源">
                <el-radio-group v-model="infos.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="infos.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
        </div>
        
    </div>
    
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Vue from 'vue'
    function Form(name='', region='', resource='', desc='') {
        this.name = name;
        this.region = region;
        this.resource = resource;
        this.desc = desc;
        if(typeof Form._initialized == 'undefined') {
            Form.prototype.show = function() {
                alert(this.name + ',' + this.region + ',' + this.resource + ',' + this.desc);
            }
        }
    }

    export default {
        data() {            
            return {
                input: ''
                /*tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]*/
                //tableData: []             
            }
        },
        beforeCreate: function() {
            if(Vue.http.interceptors != undefined && Vue.http.interceptors.length > 0) {
                Vue.http.interceptors.pop();
            }
            Vue.http.interceptors.push(function(request, next) {
                if(request.url === 'http://127.0.0.1:5000/api/v1.0/cors/') {
                    this.$store.dispatch('setMaterials', {infos: new Form()});
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

            this.$http.get('http://127.0.0.1:5000/api/v1.0/cors/').then(
                response => {                    
                    //this.$data.tableData = response.data;
                    this.$store.dispatch('getAllMaterials', {
                        material: response.data
                    });
                },
                response => {
                    alert('false');
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
            onSubmit() {
                this.$http.post('http://127.0.0.1:5000/api/v1.0/materials/save/',{
                    mdata: this.$store.getters.allInfos
                }).then(
                response => {                    
                    //this.$data.tableData = response.data;
                    // this.$store.dispatch('getAllMaterials', {
                    //     material: response.data
                    // });
                    alert('success');
                },
                response => {
                    alert('false');
                    console.log(response);
                });                
            }
        }
    }
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