<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="phid" label="主键"></el-table-column>
            <el-table-column prop="m_no" label="编号"></el-table-column>
            <el-table-column prop="m_name" label="名称" ></el-table-column>
            <el-table-column prop="m_kind" label="种类"></el-table-column>
            <el-table-column prop="m_amount" label="数量"></el-table-column>
            <el-table-column prop="m_unit" label="计量单位"></el-table-column>
            <el-table-column prop="m_remark" label="备注"></el-table-column>
        </el-table>
        <el-button type="primary" @click="doSomeThing">主要按钮</el-button>
        <el-input v-model="input" placeholder="请输入内容">            
        </el-input>
    </div>
    
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
            return {
                input: '',
                /*tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]*/
                tableData: []
                
            }
        },    
        mounted: function() {
            //this.$store.dispatch('getAllMaterials');
            //this.$data.tableData = this.$store.getters.allMaterials; //,{emulateJSON: true}

            // this.$http.jsonp('http://127.0.0.1:5000/api/v1.0/jsonp').then(
            //     response => {
            //         //var tmp = eval('(' + response.data + ')');
            //         var obj = JSON.parse(response.data);
            //         obj = JSON.parse(obj);
            //         this.$data.tableData = obj;
            //         //this.$set('tableData', obj);
            //     }, 
            //     response => {
            //         let xx =response;
            //         alert('false');
            //     });

            this.$http.get('http://127.0.0.1:5000/api/v1.0/cors/').then(
                response => {                    
                    this.$data.tableData = response.data;
                    this.$store.dispatch('getAllMaterials', {
                        material: response.data
                    });
                },
                response => {
                    alert('false');
                    console.log(response);
                }
            );

        },
        computed: mapGetters({
            materials: 'allMaterials'
        }),
        methods: {
            doSomeThing() {
                //alert(this.$store.state.materials.count);
                this.$store.commit('increment');
                this.$data.input = this.$store.state.materials.count;                
            }
        }
    }
</script>